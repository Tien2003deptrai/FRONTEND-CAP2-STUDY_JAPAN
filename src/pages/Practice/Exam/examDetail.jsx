import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamById, useStartExam, useExamHistory } from '@/hooks/useExam';

const ExamDetailPage = () => {
  const { exam_id } = useParams();
  const { data: exam, isLoading: isExamLoading } = useExamById(exam_id);
  const { data: history, isLoading: isHistoryLoading } = useExamHistory(exam_id);
  const { mutate: startExam, isLoading: isStarting } = useStartExam();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (isExamLoading || isHistoryLoading) return <div>Đang tải chi tiết...</div>;
  if (!exam) return <div>Không tìm thấy thông tin bài thi</div>;

  const handleStartExam = () => {
    if (!exam_id) {
      setError('Không tìm thấy ID bài thi');
      return;
    }

    console.log('Starting exam with ID:', exam_id);
    setError(null);
    startExam(exam_id, {
      onSuccess: (res) => {
        console.log('Start exam response:', res);
        if (res?.attemptId) {
          navigate(`/practice/exam/doing/${res.attemptId}`);
        } else {
          setError('Phản hồi từ server không chứa attemptId. Vui lòng thử lại.');
        }
      },
      onError: (error) => {
        console.error('Start exam error:', error);
        setError(error.message || 'Có lỗi xảy ra khi bắt đầu bài thi');
      },
    });
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
        <p className="text-gray-700 mb-2">{exam.description}</p>
        <p className="text-sm text-gray-500">Thời gian: {exam.time_limit} phút</p>
        <p className="text-sm text-gray-500">Điểm đạt: {exam.passingScore} điểm</p>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleStartExam}
          disabled={isStarting}
          className={`mt-4 px-4 py-2 rounded ${
            isStarting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {isStarting ? 'Đang xử lý...' : 'Bắt đầu làm bài'}
        </button>
      </div>

      {history?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Lịch sử làm bài</h2>
          <div className="space-y-4">
            {history.map((attempt) => (
              <div key={attempt._id} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Điểm số: {attempt.score}</p>
                    <p className="text-sm text-gray-500">
                      Thời gian nộp: {new Date(attempt.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/practice/exam/result/${attempt._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamDetailPage;