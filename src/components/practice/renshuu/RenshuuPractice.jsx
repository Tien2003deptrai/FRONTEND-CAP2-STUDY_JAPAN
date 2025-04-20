import { Button, Typography, Paper } from '@mui/material'
import RenshuuQuestionCard from './RenshuuQuestionCard'

export default function RenshuuPractice({
    questions,
    lessonTitle,
    answers,
    onSelect,
    onBack,
    onSubmit,
}) {
    return (
        <Paper
            elevation={3}
            className="p-6 rounded-2xl bg-white shadow-xl border border-red-200"
        >
            <Button
                onClick={onBack}
                variant="outlined"
                color="error"
                className="mb-6"
            >
                ← Quay lại danh sách bài học
            </Button>

            <Typography variant="h5" className="text-[#d32f2f] font-bold mb-6">
                📚 Bài luyện: {lessonTitle}
            </Typography>

            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <RenshuuQuestionCard
                        key={q._id}
                        index={idx}
                        question={q}
                        selected={answers[q._id]}
                        onSelect={onSelect}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    className="px-10 py-3 rounded-xl shadow-md hover:shadow-lg text-base font-semibold"
                    onClick={onSubmit}
                >
                    ✅ Nộp bài
                </Button>
            </div>
        </Paper>
    )
}
