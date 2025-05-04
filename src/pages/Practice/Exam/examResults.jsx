import { useExamResult } from '@/hooks/useExam'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Modal,
    Button,
    Paper,
    Text,
    Title,
    Badge,
    Group,
    Stack,
    Container,
    Divider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

const ExamResultPage = () => {
    const { attemptId } = useParams()
    const navigate = useNavigate()
    const { data: result, isLoading } = useExamResult(attemptId)

    const [opened, { open, close }] = useDisclosure(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)

    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Đang tải kết quả...
            </div>
        )
    }

    if (!result) {
        return (
            <div className="text-center py-10 text-red-600">
                Không tìm thấy kết quả bài thi
            </div>
        )
    }

    const openModal = (question) => {
        setSelectedQuestion(question)
        open()
    }

    return (
        <Container size="md" px="sm">
            <Paper shadow="md" radius="md" p="lg" withBorder>
                <Title order={2} align="center" mb="md" c="red">
                    🎓 Kết quả bài thi:{' '}
                    <span className="text-black">{result.examTitle}</span>
                </Title>

                <Group
                    position="center"
                    spacing="xl"
                    grow
                    style={{
                        backgroundColor: '#f9fafb',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}
                    mb="xl"
                    wrap="wrap"
                >
                    <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
                        <Text size="sm" color="gray.7" fw={500}>
                            📊 Điểm số
                        </Text>
                        <Text size="xl" fw={700} style={{ color: '#059669' }}>
                            {result.totalScore} điểm
                        </Text>
                    </div>

                    <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
                        <Text size="sm" color="gray.7" fw={500}>
                            🕒 Thời gian làm bài
                        </Text>
                        <Text size="xl" fw={700} style={{ color: '#dc2626' }}>
                            {result.time || 'Không xác định'}
                        </Text>
                    </div>
                </Group>

                {result.answers.map((group) => (
                    <div key={group._id} className="space-y-4 mt-6">
                        {group.paragraph && (
                            <Paper p="md" bg="red.1" radius="md" withBorder>
                                <Text>
                                    <strong>Đoạn văn:</strong> {group.paragraph}
                                </Text>
                            </Paper>
                        )}

                        {group.childAnswers.map((question, index) => (
                            <Paper
                                key={question._id}
                                p="md"
                                shadow="xs"
                                radius="md"
                                className="cursor-pointer hover:bg-gray-50 transition"
                                withBorder
                                onClick={() => openModal(question)}
                            >
                                <Group position="apart" wrap="wrap">
                                    <Text fw={500}>
                                        Câu {index + 1}: {question.content}
                                    </Text>
                                    <Badge
                                        color={
                                            question.isCorrect ? 'green' : 'red'
                                        }
                                        variant="filled"
                                        size="md"
                                    >
                                        {question.isCorrect ? 'Đúng' : 'Sai'} -{' '}
                                        {question.score} điểm
                                    </Badge>
                                </Group>
                            </Paper>
                        ))}
                    </div>
                ))}

                <Group mt="xl" position="center" grow>
                    <Button
                        color="gray"
                        onClick={() => navigate('/practice/exam')}
                    >
                        🔙 Quay lại danh sách
                    </Button>
                    <Button
                        color="red"
                        onClick={() =>
                            navigate(`/practice/exam/${result.examId}`)
                        }
                    >
                        📄 Xem chi tiết đề thi
                    </Button>
                </Group>
            </Paper>

            <Modal
                opened={opened}
                onClose={close}
                title="Chi tiết câu hỏi"
                centered
                size="lg"
            >
                {selectedQuestion && (
                    <Stack spacing="md">
                        <Text fw={600}>📝 {selectedQuestion.content}</Text>
                        <Text>
                            ✅ <strong>Đáp án đúng:</strong>{' '}
                            <span style={{ color: '#15803d' }}>
                                {
                                    selectedQuestion.options.find(
                                        (opt) =>
                                            opt.id ===
                                            selectedQuestion.correctAnswer
                                    )?.text
                                }
                            </span>
                        </Text>
                        <Text>
                            ❌ <strong>Đáp án bạn chọn:</strong>{' '}
                            <span style={{ color: '#b91c1c' }}>
                                {selectedQuestion.options.find(
                                    (opt) =>
                                        opt.id === selectedQuestion.userAnswer
                                )?.text || 'Không chọn'}
                            </span>
                        </Text>
                        <div>
                            <Text fw={500} mb={4}>
                                Tất cả lựa chọn:
                            </Text>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                {selectedQuestion.options.map((opt) => (
                                    <li key={opt._id}>
                                        {opt.id.toUpperCase()}. {opt.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Stack>
                )}
            </Modal>
        </Container>
    )
}

export default ExamResultPage
