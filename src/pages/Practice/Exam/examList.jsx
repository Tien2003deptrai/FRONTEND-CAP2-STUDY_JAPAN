import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamList } from '@/hooks/useExam';

const ExamListPage = () => {
  const { data: exams, isLoading } = useExamList();
  const navigate = useNavigate();

  if (isLoading) return <div>Đang tải danh sách bài thi...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách bài thi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams?.map((exam) => (
          <div
            key={exam._id}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-4">{exam.description}</p>

            <div className="space-y-2 text-sm text-gray-500">
              <p>Thời gian: {exam.time_limit} phút</p>
              <p>Điểm đạt: {exam.passingScore} điểm</p>
              <p>
                Số câu hỏi:{' '}
                {exam.sections.reduce((total, section) => total + (section.questions?.length || 0), 0)}
              </p>
            </div>

            <button
              onClick={() => navigate(`/practice/exam/${exam._id}`)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamListPage;