import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (image, onProgress) => {
    try {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            onProgress(progress);
        });

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL;
    } catch (error) {
        throw new Error(error.message);
    }
};
