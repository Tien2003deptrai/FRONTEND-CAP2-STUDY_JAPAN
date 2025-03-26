import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import { Outlet } from 'react-router-dom'

function SidebarLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/4 fixed top-0 left-0 bottom-0 p-4 border-r border-solid border-gray-300 overflow-y-auto">
                <EditCourseSidebar />
            </div>

            <div className="fixed left-1/4 top-0 right-0 bottom-0 overflow-auto flex-1 p-4 py-12">
                <Outlet context="content" />
            </div>
        </div>
    )
}

export default SidebarLayout
