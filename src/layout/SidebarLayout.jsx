import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import { Outlet } from 'react-router-dom'

function SidebarLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4 border-r border-solid border-gray-300 overflow-y-scroll">
                <EditCourseSidebar />
            </div>

            <div className="flex-1 p-4">
                <Outlet context="content" />
            </div>
        </div>
    )
}

export default SidebarLayout
