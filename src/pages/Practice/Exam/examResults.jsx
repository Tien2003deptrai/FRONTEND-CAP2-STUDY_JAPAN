import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExamResult } from '@/hooks/useExam';

const ExamResultPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { data: result, isLoading } = useExamResult(attemptId);

  if (isLoading) return <div>Đang tải kết quả...</div>;
  if (!result) return <div>Không tìm thấy kết quả bài thi</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Kết quả bài thi</h1>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Điểm số</h3>
            <p className="text-3xl font-bold text-blue-600">{result.totalScore}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Thời gian nộp</h3>
            <p className="text-gray-700">
              {new Date(result.submittedAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {result.questions?.map((question, index) => (
            <div key={question._id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Câu {index + 1}: {question.content}</p>
                  <p className={`mt-2 ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {question.isCorrect ? 'Đúng' : 'Sai'}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {question.isCorrect ? '+1 điểm' : '0 điểm'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/practice/exam')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Quay lại danh sách
          </button>
          <button
            onClick={() => navigate(`/practice/exam/${result.examId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Xem chi tiết bài thi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;