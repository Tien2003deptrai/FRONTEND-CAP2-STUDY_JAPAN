import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamTake, useSubmitExam } from '@/hooks/useExam';

const ExamDoingPage = () => {
  const { attemptId } = useParams();
  const { data, isLoading } = useExamTake(attemptId); // data = { exam, attemptId, startTime }
  const exam = data?.exam;
  const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Tính thời gian còn lại dựa trên startTime từ server
  useEffect(() => {
    if (data?.exam?.time_limit && data?.startTime) {
      const now = Date.now();
      const startTime = new Date(data.startTime).getTime();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      const totalTime = data.exam.time_limit * 60;
      const remaining = totalTime - elapsedSeconds;

      setTimeLeft(remaining > 0 ? remaining : 0);
    }
  }, [data]);

  // ⏳ Đồng hồ đếm lùi
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (Object.keys(answers).length > 0) {
            handleSubmit(); // ✅ Chỉ submit nếu có trả lời
          } else {
            setError('Bạn đã hết thời gian nhưng chưa trả lời câu nào.');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answers]); 

  // ⚠️ Cảnh báo sắp hết giờ
  useEffect(() => {
    if (timeLeft === 300) {
      alert('Chỉ còn 5 phút, hãy kiểm tra và nộp bài sớm!');
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(() => {
    if (!attemptId || Object.keys(answers).length === 0) {
      setError('Vui lòng chọn ít nhất một câu trả lời trước khi nộp bài');
      return;
    }
  
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer: String(answer).toUpperCase(), // "a" → "A"
    }));
  
    console.log('📝 Submit Payload:', {
      attemptId,
      answers: formattedAnswers,
    });
  
    submitExam(
      { attemptId, answers: formattedAnswers }, // 👈 TRUYỀN formattedAnswers
      {
        onSuccess: (res) => {
          if (res?.attemptId) {
            navigate(`/practice/exam/result/${res.attemptId}`);
          } else {
            setError('Không thể nộp bài thi. Vui lòng thử lại.');
          }
        },
        onError: (error) => {
          setError(error.message || 'Có lỗi xảy ra khi nộp bài thi');
        },
      }
    );
  }, [attemptId, answers, submitExam, navigate]);

  if (isLoading) return <div>Đang tải bài thi...</div>;
  if (!exam) return <div>Không tìm thấy thông tin bài thi</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <div className="text-xl font-semibold">
          Thời gian còn lại: {formatTime(timeLeft)}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {exam.sections?.map((section, sectionIndex) => (
          <div key={section._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">
              Phần {sectionIndex + 1}: {section.title}
            </h2>
            <div className="space-y-4">
              {exam.questions
                .filter((q) => q.type === section.type)
                .map((question, questionIndex) => (
                  <div key={question._id} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium mb-2">
                      Câu {questionIndex + 1}: {question.content}
                    </p>
                    {question.readingPassage && (
                      <div className="mb-2 text-sm italic bg-gray-100 p-2 rounded">
                        {question.readingPassage}
                      </div>
                    )}
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label key={option._id} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question_${question._id}`}
                            value={option.id} // ✅ A/B/C/D
                            checked={answers[question._id] === option.id}
                            onChange={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [question._id]: option.id,
                              }))
                            }
                            className="form-radio"
                          />
                          <span>{option.text || option.content}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
        </button>
      </div>
    </div>
  );
};

export default ExamDoingPage;