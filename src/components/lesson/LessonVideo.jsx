import { CircularProgress } from '@mui/material'

function isYouTubeLink(url) {
    return (
        url.includes('youtube.com') ||
        url.includes('youtu.be') ||
        url.includes('watch?v=') ||
        url.includes('shorts/')
    )
}

function getEmbedUrl(url) {
    if (!url) return ''
    if (url.includes('watch?v=')) {
        return url.replace('watch?v=', 'embed/')
    } else if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'youtube.com/embed/')
    } else if (url.includes('shorts/')) {
        return url.replace('shorts/', 'embed/')
    }
    return url
}

function VideoPlayer({ lesson, isLoading, isError, error }) {
    const videoUrl = lesson?.video_url

    return (
        <div className="w-full flex justify-center px-4 md:px-0 mt-2">
            <div className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden bg-red-500 shadow-xl">
                {isLoading ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                        <CircularProgress color="inherit" />
                    </div>
                ) : isError ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
                        <p className="text-red-500 text-center">
                            {error?.message || 'Đã xảy ra lỗi khi tải video.'}
                        </p>
                    </div>
                ) : lesson && videoUrl ? (
                    isYouTubeLink(videoUrl) ? (
                        <iframe
                            className="w-full h-full"
                            src={getEmbedUrl(videoUrl)}
                            title={lesson.lesson_title}
                            allowFullScreen
                            loading="lazy"
                        />
                    ) : (
                        <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                        >
                            Trình duyệt của bạn không hỗ trợ phát video.
                        </video>
                    )
                ) : (
                    <div className="absolute inset-0 flex justify-center items-center text-white z-10">
                        Không có bài học nào được phát hành.
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoPlayer
