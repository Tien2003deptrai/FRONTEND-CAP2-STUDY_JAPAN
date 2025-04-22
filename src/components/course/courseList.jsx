import CourseCard from './CourseCard'

const CourseList = ({ courses = [] }) => {
    if (!courses || courses.length === 0) {
        return (
            <p className="text-center text-gray-400 text-lg font-semibold mt-10">
                🚫 Không có khoá học nào.
            </p>
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </section>
    )
}

export default CourseList
