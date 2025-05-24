import useFetchGrammar from '@/hooks/useFetchGrammar'

const LessonGrammar = ({ lessonId }) => {
    const { data, isLoading, isError, error } = useFetchGrammar(lessonId)

    if (isLoading) return <p>Đang tải ngữ pháp...</p>
    if (isError) return <p className="text-red-500">Lỗi: {error.message}</p>
    if (!data || data.length === 0) return

    return (
        <div className="mt-8 bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">
                Ngữ pháp
            </h3>
            {data.map((item, index) => (
                <div key={item._id} className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800">
                        {index + 1}. {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 mb-2">
                        <strong>Cấu trúc:</strong> {item.structure}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Giải thích:</strong> {item.explain}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <strong>Ý nghĩa:</strong> {item.mean}
                    </p>
                    <div className="mt-2 space-y-2">
                        <strong>Ví dụ:</strong>
                        {item.examples?.map((ex, idx) => (
                            <div
                                key={idx}
                                className="ml-4 p-2 bg-gray-100 rounded text-sm"
                            >
                                <p>
                                    <strong>JP:</strong> {ex.ja}
                                </p>
                                <p>
                                    <strong>VI:</strong> {ex.vi}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LessonGrammar
