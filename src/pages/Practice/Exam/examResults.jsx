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
                    Kết quả bài thi:{' '}
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
                            Điểm số
                        </Text>
                        <Text size="xl" fw={700} style={{ color: '#059669' }}>
                            {result.totalScore} điểm
                        </Text>
                    </div>

                    <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
                        <Text size="sm" color="gray.7" fw={500}>
                            Thời gian làm bài
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
                                            question?.isCorrect
                                                ? 'green'
                                                : 'red'
                                        }
                                        variant="filled"
                                        size="md"
                                    >
                                        {question?.isCorrect ? 'Đúng' : 'Sai'} -{' '}
                                        {question?.score ?? 0} điểm
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

            <Modal size={800} opened={opened} onClose={close}>
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    Chi tiết câu hỏi
                </h2>
                <hr />
                <div className="flex flex-col px-8 py-4 text-lg">
                    {selectedQuestion?.isCorrect ? (
                        <p className="text-white w-fit bg-green-500 rounded-3xl text-sm px-6 py-2 font-bold mb-4">
                            Đúng
                        </p>
                    ) : (
                        <p className="text-white w-fit bg-primary rounded-3xl text-sm px-6 py-2 font-bold mb-4">
                            Sai
                        </p>
                    )}
                    <p className="mb-4">{selectedQuestion?.content}</p>
                    <div className="flex flex-col gap-3">
                        {selectedQuestion?.options.map((option, index) => {
                            const isUserAnswer =
                                option.id === selectedQuestion?.userAnswer
                            const isCorrectAnswer =
                                option.id === selectedQuestion?.correctAnswer
                            const isWrongAnswer =
                                isUserAnswer && !selectedQuestion?.isCorrect

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            isCorrectAnswer
                                                ? 'border-green-500 bg-green-100'
                                                : isWrongAnswer
                                                  ? 'border-red-500 bg-red-100'
                                                  : 'border-gray-300'
                                        }`}
                                    >
                                        {isUserAnswer && (
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    isCorrectAnswer
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }`}
                                            ></div>
                                        )}
                                    </span>
                                    <span
                                        className={`${
                                            isCorrectAnswer
                                                ? 'text-green-500 font-bold'
                                                : isWrongAnswer
                                                  ? 'text-red-500 font-bold'
                                                  : ''
                                        }`}
                                    >
                                        {option.id.toUpperCase()}. {option.text}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    {!selectedQuestion?.isCorrect && (
                        <p className="text-green-500 font-bold mt-4">
                            Đáp án đúng là:{' '}
                            {selectedQuestion?.correctAnswer.toUpperCase()}
                        </p>
                    )}
                </div>
            </Modal>
        </Container>
    )
}

export default ExamResultPage
