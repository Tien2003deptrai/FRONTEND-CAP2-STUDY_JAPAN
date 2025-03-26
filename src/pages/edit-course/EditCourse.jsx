import Video from '@/components/edit-course/Video'
import useFetchLessonList from '@/hook/useFetchLessonList'
import useFetchVocabulary from '@/hook/useFetchVocabulary'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditCourse() {
    const { courseId, lessonId } = useParams()
    const { data: lessonList } = useFetchLessonList(courseId)
    const navigate = useNavigate()

    // State to store the selected lesson
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [videoUrl, setVideoUrl] = useState('')

    // Set the first lesson if no lessonId is provided
    useEffect(() => {
        if (lessonList) {
            const lessonToSelect = lessonId
                ? lessonList.data.lessons.find((l) => l._id === lessonId)
                : lessonList.data.lessons[0]

            setSelectedLesson(lessonToSelect)

            if (!lessonId && lessonToSelect?._id) {
                navigate(`/teacher/edit/${courseId}/${lessonToSelect._id}`, {
                    replace: true,
                })
            }
        }
    }, [courseId, lessonId, lessonList, navigate])

    // Set video URL when lesson changes
    useEffect(() => {
        if (selectedLesson?.video_url) {
            setVideoUrl(selectedLesson.video_url)
        }
    }, [selectedLesson])

    console.log(selectedLesson)
    const { data: vocabularies = [] } = useFetchVocabulary(selectedLesson?._id)

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-[900px] w-full flex flex-col items-center gap-6">
                <div className="w-full flex gap-3 flex-col mt-4">
                    <label className="block font-bold">Mô tả bài học</label>
                    <textarea
                        className="border p-2 w-full rounded py-4 px-4"
                        placeholder="Nhập mô tả bài học"
                        rows={4}
                        defaultValue={selectedLesson?.description || ''}
                    />
                </div>

                <Video url={videoUrl} setUrl={setVideoUrl} />

                <div className="w-full flex gap-3 flex-col mt-4">
                    <div className="w-full flex justify-between items-center">
                        <label className="block font-bold">
                            Danh sách từ vựng ({vocabularies.length})
                        </label>
                        <Link
                            to={'vocabulary'}
                            className="primary-btn"
                            state={lessonId}
                        >
                            Chỉnh sửa từ vựng
                        </Link>
                    </div>
                    <hr />
                    <div className="w-full">
                        {vocabularies.length > 0 ? (
                            vocabularies.map((vocab, index) => (
                                <div
                                    key={vocab._id}
                                    className="border border-gray-200 p-4 rounded-md flex flex-col gap-2"
                                >
                                    <h3 className="w-fit text-lg font-semibold text-blue-500">
                                        {index + 1}. {vocab.word}
                                    </h3>
                                    <div className="flex flex-col gap-2 px-5">
                                        <p>
                                            <strong>Phiên âm:</strong>{' '}
                                            {vocab.word}
                                        </p>
                                        <p>
                                            <strong>Kana:</strong> {vocab.kana}
                                        </p>
                                        <p>
                                            <strong>Kanji:</strong>{' '}
                                            {vocab.kanji}
                                        </p>
                                        <p>
                                            <strong>Ý nghĩa:</strong>{' '}
                                            {vocab.meaning}
                                        </p>
                                        <p>
                                            <strong>Ghi chú:</strong>{' '}
                                            {vocab.notes}
                                        </p>
                                        <p>
                                            <strong>Ví dụ:</strong>{' '}
                                            {vocab.example}
                                        </p>

                                        {/* Hiển thị audio nếu có */}
                                        {vocab.audio && (
                                            <div className="flex items-center gap-2">
                                                <strong>Phát âm:</strong>
                                                <audio controls>
                                                    <source
                                                        src={vocab.audio}
                                                        type="audio/mpeg"
                                                    />
                                                    Trình duyệt của bạn không hỗ
                                                    trợ phát âm thanh.
                                                </audio>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Không có từ vựng nào.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse
