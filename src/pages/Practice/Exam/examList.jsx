import { useExamList } from '@/hooks/useExam'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

const ExamListPage = () => {
    const { data: exams, isLoading: isExamLoading } = useExamList()
    const navigate = useNavigate()

    if (isExamLoading)
        return (
            <Box textAlign="center" py={10}>
                <Typography variant="h6" color="text.secondary">
                    Đang tải danh sách bài thi...
                </Typography>
            </Box>
        )

    if (!exams || exams.length === 0)
        return (
            <Box textAlign="center" py={10}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Chưa có bài thi nào
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Vui lòng quay lại sau hoặc liên hệ quản trị viên.
                </Typography>
            </Box>
        )

    return (
        <Box
            px={{ xs: 2, md: 6 }}
            py={{ xs: 4, md: 8 }}
            maxWidth="1200px"
            mx="auto"
            sx={{ userSelect: 'none' }}
        >
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                }}
                gap={4}
            >
                {exams.map((exam) => (
                    <Box
                        key={exam._id}
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 3,
                            boxShadow: 3,
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition:
                                'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 8,
                                transform: 'translateY(-6px)',
                            },
                        }}
                        onClick={() => navigate(`/practice/exam/${exam._id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                navigate(`/practice/exam/${exam._id}`)
                            }
                        }}
                        aria-label={`Xem chi tiết bài thi ${exam.title}`}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="error.main"
                                gutterBottom
                            >
                                {exam.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3, minHeight: 60 }}
                            >
                                {exam.description}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    color: 'text.secondary',
                                    fontSize: 14,
                                    fontWeight: 'medium',
                                }}
                            >
                                <span>
                                    🕒 Thời gian: {exam.time_limit} phút
                                </span>
                                <span>🏁 Level: {exam.level}</span>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                mt: 3,
                                px: 3,
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: 16,
                                boxShadow: 4,
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'error.dark',
                                    boxShadow: 6,
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/practice/exam/${exam._id}`)
                            }}
                            aria-label={`Xem chi tiết bài thi ${exam.title}`}
                        >
                            Xem chi tiết
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ExamListPage
