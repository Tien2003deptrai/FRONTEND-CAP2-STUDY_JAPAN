import Sidebar from '@/components/admin/sidebart/Sidebart'
import Header from '@/components/header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayOut = () => {
    const [collapsed, setCollapsed] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState('dashboard')

    const toggleSidebar = () => setCollapsed(!collapsed)

    return (
        <div className="flex h-screen">
            <Sidebar
                collapsed={collapsed}
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="flex-1 flex flex-col">
                <Header />

                <div className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayOut
