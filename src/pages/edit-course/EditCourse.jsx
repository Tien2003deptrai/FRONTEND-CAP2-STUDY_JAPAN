import Video from '@/components/edit-course/Video'
import useFetchLessonList from '@/hook/useFetchLessonList'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditCourse() {
    const { courseId, lessonId } = useParams()
    const location = useLocation()
    const lesson = location.state
    const [videoUrl, setVideoUrl] = useState(lesson?.video_url)
    console.log(lesson)

    const navigate = useNavigate()
    console.log(courseId, lessonId)

    const { data } = useFetchLessonList(courseId)

    useEffect(() => {
        if (data && lessonId == undefined) {
            // Redirect to first lesson
            navigate(`/teacher/edit/${courseId}/${data.data.lessons[0]._id}`, {
                replace: true,
                state: { lesson: data?.data?.lessons[0] },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-[900px] w-full flex flex-col items-center gap-6">
                <div className="w-full flex gap-3 flex-col mt-4">
                    <label className="block font-bold">Mô tả bài học</label>
                    <textarea
                        className="border p-2 w-full rounded py-4 px-4"
                        placeholder="Nhập mô tả bài học"
                        rows={4}
                    />
                </div>
                <Video url={videoUrl} setUrl={setVideoUrl} />
            </div>
        </div>
    )
}

export default EditCourse
