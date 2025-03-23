import { uploadImage } from '@/util/firebase/firebaseUtils'
import { Upload } from '@mui/icons-material'
import { useState } from 'react'

function ImageUpload({ onImageUpload }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file)) // Show instant preview
    setUploading(true)

    try {
      const uploadedUrl = await uploadImage(file, setProgress)
      setPreview(uploadedUrl) // Replace preview with uploaded image
      onImageUpload(uploadedUrl) // Pass URL to parent
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-start gap-3 mt-5">
      <label className="block font-bold">Thumbnail</label>

      {preview && (
        <img
          src={preview}
          alt="Thumbnail preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {uploading && (
        <p className="text-sm text-gray-500">Uploading... {progress}%</p>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="thumbnail-upload"
        onChange={handleImageChange}
      />

      <label
        htmlFor="thumbnail-upload"
        className="primary-btn flex justify-center items-center gap-2 cursor-pointer"
      >
        <Upload />
        {image ? 'Chọn ảnh khác' : 'Tải ảnh'}
      </label>
    </div>
  )
}

export default ImageUpload
