import GrammarItem from '@/components/edit-course/grammar/GrammarItem'
import Video from '@/components/edit-course/video/Video'
import VocabularyItem from '@/components/edit-course/vocabulary/VocabularyItem'
import useFetchGrammar from '@/hook/useFetchGrammar'
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
    const { data: grammars = [] } = useFetchGrammar(selectedLesson?._id)
    console.log(grammars)

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
                                <VocabularyItem vocab={vocab} index={index} />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Không có từ vựng nào.
                            </p>
                        )}
                    </div>
                </div>
                <hr className="w-full" />
                <div className="w-full flex gap-3 flex-col mt-4">
                    <div className="w-full flex justify-between items-center">
                        <label className="block font-bold">
                            Danh sách ngữ pháp ({vocabularies.length})
                        </label>
                        <Link
                            to={'grammar'}
                            className="primary-btn"
                            state={lessonId}
                        >
                            Chỉnh sửa ngữ pháp
                        </Link>
                    </div>
                    <hr className="w-full h-[1px]" />
                    <div className="w-full">
                        {grammars.length > 0 ? (
                            grammars.map((grammar, index) => (
                                <GrammarItem grammar={grammar} index={index} />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Không có từ ngữ pháp.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse
