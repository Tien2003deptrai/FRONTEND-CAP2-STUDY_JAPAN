import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamById, useExamHistory } from '@/hooks/useExam';

const ExamDetailPage = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { data: exam, isLoading: isExamLoading } = useExamById(exam_id);
  const { data: history, isLoading: isHistoryLoading } = useExamHistory(exam_id);

  if (isExamLoading || isHistoryLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-lg text-gray-600">Đang tải chi tiết bài thi...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-600 font-semibold">Không tìm thấy thông tin bài thi</p>
      </div>
    );
  }

  const handleStartExam = () => {
    if (!exam_id) {
      setError('Không tìm thấy ID bài thi');
      return;
    }
    setError(null);
    navigate(`/practice/exam/doing/${exam_id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{exam.title}</h1>
        <p className="text-gray-600 text-base mb-3">{exam.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <p>🕒 Thời gian làm bài: <span className="font-medium">{exam.time_limit} phút</span></p>
          <p>🏁 Điểm đạt: <span className="font-medium">{exam.total_points} điểm</span></p>
          <p>📘 Trình độ: <span className="font-medium">{exam.level}</span></p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        <button
          onClick={handleStartExam}
          className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
        >
          Bắt đầu làm bài
        </button>
      </div>

      {history && history.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📝 Lịch sử làm bài</h2>
          <div className="space-y-4">
            {history.map((attempt) => (
              <div
                key={attempt._id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-700">Điểm số: <span className="text-blue-600">{attempt.score}</span></p>
                  <p className="text-sm text-gray-500">
                    Ngày nộp: {new Date(attempt.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/practice/exam/result/${attempt._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Xem kết quả
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamDetailPage;