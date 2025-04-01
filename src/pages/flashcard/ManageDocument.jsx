import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function ManageDocument() {
    return (
        <div className="p-4">
            <Link
                to={'create-flashcard'}
                className="primary-btn flex items-center gap-2"
            >
                <Add /> Tạo flashcards
            </Link>
        </div>
    )
}

export default ManageDocument
