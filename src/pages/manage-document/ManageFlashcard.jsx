import {
    Box,
    Button,
    Typography,
    IconButton,
    Avatar,
    TextField,
} from '@mui/material'
import { Add, Book, Delete, Edit, PlayArrow, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import useAuthStore from '@/store/useAuthStore'
import { useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { useQueryClient } from '@tanstack/react-query'
import { LoadingOverlay } from '@mantine/core'

function ManageFlashcard() {
    const { user } = useAuthStore()
    const [visibleItems, setVisibleItems] = useState(6)
    const [searchTerm, setSearchTerm] = useState('')
    const { data: decks, isLoading } = useFetchAllDecks()
    const queryClient = useQueryClient()

    const handleDeleteDeck = async (deckId) => {
        const confirm = await Swal.fire({
            title: 'Xóa bộ flashcard?',
            text: 'Hành động này sẽ xóa toàn bộ thẻ trong bộ này. Bạn chắc chứ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        })

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/deck/${deckId}`)
                await queryClient.invalidateQueries({ queryKey: ['all-decks'] })
                Swal.fire('Đã xóa!', 'Bộ flashcard đã được xóa.', 'success')
            } catch (error) {
                Swal.fire(
                    'Lỗi!',
                    error.response?.data?.message ||
                        'Không thể xóa bộ flashcard',
                    'error'
                )
            }
        }
    }

    const showMore = () => {
        setVisibleItems((prev) => prev + 6)
    }

    const filteredDecks = decks?.filter((deck) =>
        deck.deck_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const visibleDecks = filteredDecks?.slice(0, visibleItems)
    const hasMore = filteredDecks?.length > visibleItems

    return (
        <Box maxWidth="1200px" mx="auto" p={4} userSelect="none">
            <LoadingOverlay visible={isLoading} overlayBlur={3} />

            {/* Header */}
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={3}
                mb={5}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Tìm kiếm flashcards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Search color="action" sx={{ mr: 1 }} />
                        ),
                    }}
                    sx={{
                        maxWidth: 300,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '9999px',
                            '&.Mui-focused fieldset': {
                                borderColor: 'error.main',
                                boxShadow: '0 0 8px rgba(244, 67, 54, 0.3)',
                            },
                        },
                    }}
                    inputProps={{ 'aria-label': 'Tìm kiếm flashcards' }}
                />

                <Button
                    component={Link}
                    to="create-flashcard"
                    variant="contained"
                    color="error"
                    startIcon={<Add />}
                    size="medium"
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    Tạo flashcards
                </Button>
            </Box>

            {/* Grid Decks */}
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
                gap={4}
            >
                {visibleDecks?.length > 0 ? (
                    visibleDecks.map((deck) => (
                        <Box
                            key={deck._id}
                            sx={{
                                bgcolor: 'background.paper',
                                borderRadius: 3,
                                boxShadow: 3,
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition:
                                    'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-8px)',
                                    borderColor: 'error.main',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                },
                            }}
                        >
                            {/* Icon + Title */}
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                mb={2}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'error.light',
                                        color: 'error.main',
                                        p: 2,
                                        borderRadius: '50%',
                                        boxShadow: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Book fontSize="large" />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="text.primary"
                                    noWrap
                                >
                                    {deck.deck_title}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                {deck.flashcardCount} Thuật ngữ
                            </Typography>

                            {/* User Info */}
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                mb={3}
                                width="100%"
                            >
                                <Avatar
                                    src={deck.user.avatar}
                                    alt={deck.user.name}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    fontWeight="medium"
                                    color="text.primary"
                                    noWrap
                                >
                                    {deck.user.name} - Giáo viên
                                </Typography>
                            </Box>

                            {/* Actions */}
                            <Box
                                display="flex"
                                justifyContent="center"
                                gap={3}
                                width="100%"
                            >
                                <Link
                                    to={`study/${deck._id}`}
                                    title="Học ngay"
                                    className="text-red-600 hover:bg-red-50 rounded-lg p-2 transition-colors shadow-md hover:shadow-lg"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <PlayArrow />
                                </Link>

                                {deck?.user?._id === user?._id && (
                                    <>
                                        <Link
                                            to={`edit/${deck._id}`}
                                            title="Chỉnh sửa"
                                            className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-colors shadow-md hover:shadow-lg"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Edit />
                                        </Link>

                                        <IconButton
                                            aria-label="Xóa bộ flashcard"
                                            title="Xóa"
                                            onClick={() =>
                                                handleDeleteDeck(deck._id)
                                            }
                                            sx={{
                                                color: 'gray',
                                                '&:hover': {
                                                    color: 'error.main',
                                                    bgcolor: 'error.light',
                                                },
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        py={8}
                        gridColumn="1 / -1"
                    >
                        Không tìm thấy flashcard nào phù hợp với từ khóa &quot;
                        {searchTerm}&quot;.
                    </Typography>
                )}
            </Box>

            {/* Show More Button */}
            {hasMore && (
                <Box textAlign="center" mt={5}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={showMore}
                        sx={{ fontWeight: 'bold', px: 6, py: 1.5 }}
                    >
                        Xem thêm
                    </Button>
                </Box>
            )}

            {/* Empty State */}
            {!isLoading && decks?.length === 0 && (
                <Box textAlign="center" py={12}>
                    <Book sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Chưa có bộ flashcard nào
                    </Typography>
                    <Typography color="text.secondary" mb={4}>
                        Hãy tạo bộ flashcard đầu tiên của bạn để bắt đầu học!
                    </Typography>
                    <Button
                        component={Link}
                        to="create-flashcard"
                        variant="contained"
                        color="error"
                        size="large"
                        startIcon={<Add />}
                    >
                        Tạo flashcards
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default ManageFlashcard
