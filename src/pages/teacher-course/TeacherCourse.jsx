import useFetchTeacherCourses from '@/hooks/useFetchTeacherCourses'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

function TeacherCourse() {
    const { data } = useFetchTeacherCourses()
    // const courses = data?.data || []
    const courses = data?.data || []

    return (
        <Box
            maxWidth="1200px"
            mx="auto"
            py={10}
            px={{ xs: 2, sm: 4 }}
            userSelect="none"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={5}
                flexWrap="wrap"
                gap={2}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                    color="error"
                    textAlign="center"
                    sx={{
                        borderBottom: '4px solid',
                        borderColor: 'error.main',
                        display: 'inline-block',
                        pb: 1,
                        mx: 'auto',
                    }}
                >
                    Danh sách khoá học
                </Typography>

                {/* Uncomment if you want the Create Course button */}
                {/* <Button
          component={Link}
          to={'new-course'}
          startIcon={<Add />}
          variant="contained"
          color="error"
          size="medium"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Tạo khóa học mới
        </Button> */}
            </Box>

            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={4}
            >
                {courses.length ? (
                    courses.map((course) => (
                        <Box
                            key={course._id}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                bgcolor: 'background.paper',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition:
                                    'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: 8,
                                    transform: 'translateY(-6px)',
                                    borderColor: 'error.main',
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            {course.thumb ? (
                                <img
                                    src={course.thumb}
                                    alt={course.name}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: 180,
                                        objectFit: 'cover',
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src =
                                            'https://media.istockphoto.com/id/1298277940/vector/learn-japanese-language-isometric-concept-with-open-laptop-books-headphones-and-tea.jpg?s=612x612&w=0&k=20&c=RchsXoccKQFLHf6bmJiSx1fXX1JvX1l-uRPhiBxum4E='
                                    }}
                                />
                            ) : (
                                <Box
                                    height={180}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bgcolor="grey.200"
                                    color="grey.500"
                                    fontSize={18}
                                >
                                    No Image
                                </Box>
                            )}

                            <Box
                                p={3}
                                flexGrow={1}
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                            >
                                <Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        noWrap
                                        title={course.name}
                                        mb={1}
                                        color="text.primary"
                                    >
                                        {course.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        noWrap
                                        title={`Giảng viên: ${course.author}`}
                                    >
                                        Giảng viên: {course.author}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        noWrap
                                        title={`Số học viên: ${course.stu_num}`}
                                    >
                                        Số học viên: {course.stu_num}
                                    </Typography>
                                </Box>

                                <Button
                                    component={Link}
                                    to={`/teacher/edit/${course._id}`}
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{ mt: 3, fontWeight: 'bold' }}
                                >
                                    Xem chi tiết
                                </Button>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        py={10}
                        fontSize={18}
                    >
                        Không có khóa học nào.
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default TeacherCourse
