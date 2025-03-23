import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import { Outlet } from 'react-router-dom'

function SidebarLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-800 text-white p-4">
                <EditCourseSidebar />
            </div>

            <div className="flex-1 p-4">
                <Outlet context="content" />
            </div>
        </div>
    )
}

export default SidebarLayout
