import GrammarItem from '@/components/edit-course/grammar/GrammarItem'
import Video from '@/components/edit-course/video/Video'
import VocabularyItem from '@/components/edit-course/vocabulary/VocabularyItem'
import useFetchGrammar from '@/hooks/useFetchGrammar'
import useFetchLessonList from '@/hooks/useFetchLessonList'
import useFetchVocabulary from '@/hooks/useFetchVocabulary'
import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'

function EditCourse() {
    const { selectedLesson } = useOutletContext()
    console.log(selectedLesson)

    const { courseId } = useParams()
    const { data: lessonList } = useFetchLessonList(courseId)

    const [videoUrl, setVideoUrl] = useState('')
    const lesson = lessonList?.data?.lessons.find(
        (l) => l._id === selectedLesson
    )

    useEffect(() => {
        setVideoUrl(lesson?.video_url || '')
    }, [lesson])

    const { data: vocabularies = [] } = useFetchVocabulary(lesson?._id)
    const { data: grammars = [] } = useFetchGrammar(lesson?._id)
    console.log(lesson)

    const onSaveLessonContent = async () => {
        const payload = {}
        payload.lesson_id = lesson?._id
        payload.video_url = videoUrl
        console.log(payload)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex-1 w-full p-6 overflow-auto flex flex-col justify-center">
                <div className="max-w-[900px] w-full flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-primary">
                        {lesson?.lesson_title}
                    </h1>
                    <hr className="w-full" />

                    <div className="w-full flex gap-3 flex-col">
                        <label className="block font-bold">Mô tả bài học</label>
                        <textarea
                            className="border p-2 w-full rounded py-4 px-4"
                            placeholder="Nhập mô tả bài học"
                            rows={4}
                            defaultValue={lesson?.description || ''}
                        />
                    </div>

                    <Video url={videoUrl} setUrl={setVideoUrl} />

                    {/* Danh sách từ vựng */}
                    <div className="w-full flex gap-3 flex-col mt-4">
                        <div className="w-full flex justify-between items-center">
                            <label className="block font-bold">
                                Danh sách từ vựng ({vocabularies.length})
                            </label>
                            <Link
                                to={'vocabulary'}
                                className="primary-btn"
                                state={{ lessonId: lesson?._id }}
                            >
                                Chỉnh sửa từ vựng
                            </Link>
                        </div>
                        <hr />
                        <div className="w-full">
                            {vocabularies.length > 0 ? (
                                vocabularies.map((vocab, index) => (
                                    <VocabularyItem
                                        key={index}
                                        vocab={vocab}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    Không có từ vựng nào.
                                </p>
                            )}
                        </div>
                    </div>
                    <hr className="w-full" />

                    {/* Danh sách ngữ pháp */}
                    <div className="w-full flex gap-3 flex-col mt-4">
                        <div className="w-full flex justify-between items-center">
                            <label className="block font-bold">
                                Danh sách ngữ pháp ({grammars.length})
                            </label>
                            <Link
                                to={'grammar'}
                                className="primary-btn"
                                state={{ lessonId: lesson?._id }}
                            >
                                Chỉnh sửa ngữ pháp
                            </Link>
                        </div>
                        <hr className="w-full h-[1px]" />
                        <div className="w-full">
                            {grammars.length > 0 ? (
                                grammars.map((grammar, index) => (
                                    <GrammarItem
                                        key={index}
                                        grammar={grammar}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    Không có từ ngữ pháp.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="my-8" />
                <button className="primary-btn" onClick={onSaveLessonContent}>
                    Lưu thay đổi
                </button>
            </div>
        </div>
    )
}

export default EditCourse
