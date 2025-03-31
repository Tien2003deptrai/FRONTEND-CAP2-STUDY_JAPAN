import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import GrammarItem from '@/components/edit-course/grammar/GrammarItem'
import Video from '@/components/edit-course/video/Video'
import VocabularyItem from '@/components/edit-course/vocabulary/VocabularyItem'
import useFetchGrammar from '@/hooks/useFetchGrammar'
import useFetchLessonList from '@/hooks/useFetchLessonList'
import useFetchVocabulary from '@/hooks/useFetchVocabulary'
import { ArrowBack } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
    Link,
    useNavigate,
    useOutletContext,
    useParams,
} from 'react-router-dom'

function EditCourse() {
    const { selectedLesson } = useOutletContext()
    console.log(selectedLesson)

    const { courseId } = useParams()
    const { data: lessonList } = useFetchLessonList(courseId)
    const [currentLessonIndex, setCurrentCourseIndex] = useState(0)
    const navigate = useNavigate()

    const [videoUrl, setVideoUrl] = useState('')
    const lesson = lessonList?.data?.lessons[currentLessonIndex]

    useEffect(() => {
        setVideoUrl(lesson?.video_url || '')
    }, [lesson])

    const { data: vocabularies = [] } = useFetchVocabulary(lesson?._id)
    const { data: grammars = [] } = useFetchGrammar(lesson?._id)
    console.log(lesson)

    return (
        <div className="w-full flex flex-col items-center">
            <header className="z-50 fixed flex h-16 bg-primary top-0 right-0 left-0 shadow-md">
                <button
                    onClick={() => navigate('/teacher')}
                    className="p-3 px-7 text-white duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <hr className="w-[1px] h-full bg-white" />
                <a
                    href="/"
                    className="font-mono text-2xl font-extrabold text-white flex items-center ml-8"
                >
                    {'Study Japan'}
                </a>
            </header>

            <div className="w-full flex">
                {/* Sidebar */}
                <div className="w-1/4 fixed top-16 left-0 bottom-0 p-4 border-r border-solid border-gray-300 overflow-y-auto bg-white">
                    <EditCourseSidebar
                        lessonId={lesson?._id}
                        onSelectLesson={setCurrentCourseIndex}
                    />
                </div>

                <div className="flex-1 p-6 overflow-auto flex justify-center">
                    <div className="max-w-[900px] w-full flex flex-col gap-6">
                        <h1 className="text-2xl font-bold text-primary">
                            {lesson?.lesson_title}
                        </h1>
                        <hr className="w-full" />

                        <div className="w-full flex gap-3 flex-col">
                            <label className="block font-bold">
                                Mô tả bài học
                            </label>
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
                </div>
            </div>
        </div>
    )
}

export default EditCourse
