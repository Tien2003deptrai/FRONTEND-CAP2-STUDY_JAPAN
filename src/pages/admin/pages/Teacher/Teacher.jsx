import TeacherCard from '@/components/TeacherCard'
import useTeachers from '@/hooks/useTeacher'
import AddIcon from '@mui/icons-material/Add'

const Teacher = () => {
    const { data: teachers, isLoading, error } = useTeachers()

    const handleViewTeacher = (teacher) => {
        // Implement view student logic
        console.log('View teacher:', teacher)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">
                    Error loading students: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium text-gray-800">
                            Giáo Viên
                        </h1>
                        <span className="ml-2 text-sm text-gray-500">
                            {teachers?.length || 0}
                        </span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <AddIcon fontSize="small" className="mr-1" />
                        Thêm Giáo Viên
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers?.map((teacher) => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            onView={handleViewTeacher}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Teacher
