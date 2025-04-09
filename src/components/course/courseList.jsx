import CourseCard from './CourseCard'

const CourseList = ({ courses = [] }) => {
  if (!courses || courses.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold">
        Không có khoá học nào.
      </p>
    )
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 my-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default CourseList