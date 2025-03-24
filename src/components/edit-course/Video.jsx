import { uploadImage } from '@/util/firebase/firebaseUtils'
import { Progress } from '@mantine/core'
import { useRef, useState } from 'react'

function Video({ url, setUrl }) {
    const fileInputRef = useRef(null)
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [inputValue, setInputValue] = useState('')

    // Check if URL is a YouTube link
    const isYouTubeURL = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be')
    }

    // Convert YouTube URL to embeddable format
    const getYouTubeEmbedURL = (url) => {
        try {
            const videoId = new URL(url).searchParams.get('v') // Extract ID from standard URL
            if (videoId) return `https://www.youtube.com/embed/${videoId}`

            // Handle short URLs (youtu.be/xyz)
            const shortId = url.split('/').pop()
            return `https://www.youtube.com/embed/${shortId}`
        } catch {
            return null
        }
    }

    // Handle file selection & upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setUploading(true)

        try {
            const res = await uploadImage(file, setProgress)
            setUrl(res) // Update state with uploaded file URL
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    // Handle paste YouTube URL
    const handlePasteYouTubeURL = () => {
        if (inputValue.trim() && isYouTubeURL(inputValue.trim())) {
            setUrl(getYouTubeEmbedURL(inputValue.trim()))
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-md w-full max-w-[900px] overflow-auto">
            {/* Paste YouTube URL */}
            <label className="block w-full font-bold">Video bài học</label>
            <div className="w-full flex gap-2">
                <input
                    type="text"
                    placeholder="Paste YouTube URL here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 border rounded p-2"
                />
                <button onClick={handlePasteYouTubeURL} className="second-btn">
                    Add
                </button>
            </div>

            {/* Video Display (Only Using iframe) */}
            {url ? (
                <div className="relative w-full max-h-[500px]">
                    <iframe
                        className="w-full rounded-lg border h-[500px] object-contain"
                        src={isYouTubeURL(url) ? url : url} // Uploaded video also uses iframe
                        title="Video Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    {/* Remove Button */}
                    <button
                        onClick={() => setUrl(null)}
                        disabled={uploading}
                        className={`absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded ${
                            uploading && 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploading}
                    className={`primary-btn ${
                        uploading && 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div className="w-full">
                    <Progress
                        value={progress}
                        size="sm"
                        animated
                        className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">{progress}%</p>
                </div>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
        </div>
    )
}

export default Video
