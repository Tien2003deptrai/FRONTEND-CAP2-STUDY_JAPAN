import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import { ArrowBack } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'

function SidebarLayout() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen">
            <header className="z-50 fixed flex h-16 bg-primary top-0 right-0 left-0">
                <button
                    onClick={() => navigate('/teacher')}
                    className="p-3 px-7 text-white duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <hr className="w-[1px] h-full bg-white" />
                <a
                    href="/"
                    className="font-mono text-3xl font-extrabold text-white flex items-center ml-8"
                >
                    STUDY JAPAN
                </a>
            </header>
            <div className="w-1/4 fixed top-16 left-0 bottom-0 p-4 border-r border-solid border-gray-300 overflow-y-auto">
                <EditCourseSidebar />
            </div>

            <div className="fixed left-1/4 top-16 right-0 bottom-0 overflow-auto flex-1 p-4 py-12">
                <Outlet context="content" />
            </div>
        </div>
    )
}

export default SidebarLayout
