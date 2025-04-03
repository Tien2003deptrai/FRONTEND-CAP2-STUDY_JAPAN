import React, { useState } from 'react'
import { MenuBook, Quiz } from '@mui/icons-material'

const DocumentSidebar = () => {
    const [activeItem, setActiveItem] = useState('flashcard')

    const menuItems = [
        {
            id: 'flashcard',
            label: 'Flashcard',
            icon: <MenuBook />,
            path: '/flashcard',
        },
        {
            id: 'exam',
            label: 'Exam',
            icon: <Quiz />,
            path: '/exam',
        },
    ]

    const handleItemClick = (itemId) => {
        setActiveItem(itemId)
    }

    return (
        <div className="bg-red-50 h-screen fixed left-0 w-64">
            {/* Brand header */}

            {/* Navigation menu */}
            <nav className="flex flex-col">
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.path}
                        className={`flex items-center px-6 py-3 text-gray-700 hover:bg-red-100 transition-colors duration-200 ${
                            activeItem === item.id
                                ? 'bg-red-100 border-l-4 border-red-600'
                                : ''
                        }`}
                        onClick={(e) => {
                            e.preventDefault()
                            handleItemClick(item.id)
                        }}
                    >
                        <span
                            className={`${
                                activeItem === item.id
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                            } mr-3`}
                        >
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                    </a>
                ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto fixed bottom-0 w-64 p-4 text-xs text-gray-500 border-t border-gray-200">
                <p>© 2025 Study Japan</p>
            </div>
        </div>
    )
}

export default DocumentSidebar
