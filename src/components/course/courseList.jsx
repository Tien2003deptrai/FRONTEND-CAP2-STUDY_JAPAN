import CourseCard from './CourseCard'

const CourseList = ({ courses = [] }) => {
  if (!courses || courses.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold mt-10">
        🚫 Không có khoá học nào.
      </p>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
     
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default CourseList