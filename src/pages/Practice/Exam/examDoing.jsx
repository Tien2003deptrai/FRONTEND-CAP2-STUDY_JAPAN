import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamTake, useSubmitExam } from '@/hooks/useExam';
import QuestionSection from '@/components/practice/question/QuestionSection';

const ExamDoingPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useExamTake(attemptId);
  const exam = data?.exam;
  const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [error, setError] = useState(null);

  const groupQuestionsEvenly = (questions, sections) => {
    const grouped = sections.map(() => []);
    questions.forEach((q, i) => {
      grouped[i % sections.length].push(q);
    });
    return grouped;
  };

  const clearTimerStorage = () => {
    if (attemptId) {
      localStorage.removeItem(`exam_timer_${attemptId}`);
    }
  };

  useEffect(() => {
    if (!exam?.time_limit || !attemptId) return;

    const saved = localStorage.getItem(`exam_timer_${attemptId}`);
    if (saved) {
      const { startTime } = JSON.parse(saved);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = exam.time_limit * 60 - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    } else {
      const now = Date.now();
      localStorage.setItem(`exam_timer_${attemptId}`, JSON.stringify({ startTime: now }));
      setTimeLeft(exam.time_limit * 60);
    }
  }, [exam, attemptId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearTimerStorage();
          if (Object.keys(answers).length > 0) {
            handleSubmit();
          } else {
            setError('⏰ Hết giờ nhưng bạn chưa trả lời câu nào.');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answers]);

  useEffect(() => {
    if (timeLeft === 180) {
      alert('⚠️ Còn 3 phút! Hãy kiểm tra và nộp bài.');
    }
  }, [timeLeft]);

  useEffect(() => {
    if (exam?.settings?.fullScreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(console.warn);
      }
    }
  }, [exam]);

  useEffect(() => {
    if (exam?.questions) {
      let qs = [...exam.questions];
      if (exam.settings?.shuffleQuestions) {
        qs.sort(() => Math.random() - 0.5);
      }
      setShuffledQuestions(qs);
    }
  }, [exam]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(() => {
    if (!attemptId || Object.keys(answers).length === 0) {
      setError('Vui lòng trả lời ít nhất một câu.');
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer: String(answer).toUpperCase(),
    }));

    clearTimerStorage();

    submitExam(
      { attemptId, answers: formattedAnswers },
      {
        onSuccess: (res) => {
          if (res?.attemptId) {
            navigate(`/practice/exam/result/${res.attemptId}`);
          } else {
            setError('Không thể nộp bài.');
          }
        },
        onError: (err) => {
          setError(err.message || 'Có lỗi xảy ra khi nộp bài.');
        },
      }
    );
  }, [attemptId, answers, submitExam, navigate]);

  if (isLoading) return <div className="text-center py-10 text-gray-500">Đang tải bài thi...</div>;
  if (!exam) return <div className="text-center py-10 text-red-600">Không tìm thấy bài thi</div>;

  const grouped = groupQuestionsEvenly(shuffledQuestions, exam.sections);

  return (
    <div
      className="max-w-5xl mx-auto"
      style={exam?.settings?.preventCopy ? { userSelect: 'none' } : {}}
    >
      <div className="flex justify-between items-center px-6 py-4 bg-red-600 text-white mb-6 rounded-b shadow">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <span className="text-lg font-semibold flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold">{formatTime(timeLeft || 0)}</span>
        </span>
      </div>

      {error && (
        <div className="mx-6 mb-4 p-4 bg-red-100 text-red-700 rounded border">{error}</div>
      )}

      <div className="px-6 space-y-8">
        {exam.sections.map((section, i) => {
          const sectionQuestions = grouped[i];
          if (!sectionQuestions || sectionQuestions.length === 0) return null;

          return (
            <QuestionSection
              key={section._id || i}
              section={section}
              sectionIndex={i}
              questions={sectionQuestions}
              answers={answers}
              onAnswerChange={(qid, val) =>
                setAnswers((prev) => ({ ...prev, [qid]: val }))
              }
            />
          );
        })}
      </div>

      <div className="px-6 mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded text-white font-semibold transition ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
        </button>
      </div>
    </div>
  );
};

export default ExamDoingPage;