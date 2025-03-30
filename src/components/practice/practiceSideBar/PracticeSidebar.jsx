import GTranslateIcon from '@mui/icons-material/GTranslate'
import QuizIcon from '@mui/icons-material/Quiz'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import SchoolIcon from '@mui/icons-material/School'
import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { NavLink } from 'react-router-dom'

const menuItems = [
    { label: 'Flashcard', path: 'flashcard', icon: <SchoolIcon /> },
    { label: 'Voice', path: 'voice', icon: <RecordVoiceOverIcon /> },
    { label: 'Translate', path: 'translate', icon: <GTranslateIcon /> },
    { label: 'Exam', path: 'exam', icon: <QuizIcon /> },
]

export default function PracticeSidebar() {
    return (
        <div className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6">
            <div className="text-red-500 font-extrabold mb-6 text-2xl">
                Luyện tập
            </div>
            <Divider />

            <List>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        {({ isActive }) => (
                            <ListItemButton
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    backgroundColor: isActive
                                        ? '#ffe4e6'
                                        : 'transparent',
                                    color: isActive ? '#d32f2f' : '#333',
                                    '&:hover': {
                                        backgroundColor: '#fce4ec',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? '#d32f2f' : '#888',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? '600' : '500',
                                    }}
                                />
                            </ListItemButton>
                        )}
                    </NavLink>
                ))}
            </List>
        </div>
    )
}
