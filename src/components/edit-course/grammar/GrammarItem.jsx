function GrammarItem({ grammar }) {
    return (
        <div
            key={grammar._id}
            className="border border-gray-200 p-4 rounded-md flex flex-col gap-2"
        >
            <h3 className="w-fit text-lg font-semibold text-green-500">
                {grammar.title} ({grammar.structure})
            </h3>
            <div className="flex flex-col gap-4 px-5">
                <p>
                    <strong>Cấu trúc:</strong> {grammar.structure}
                </p>
                <p>
                    <strong>Ý nghĩa:</strong> {grammar.mean}
                </p>
                <p>
                    <strong>Giải thích:</strong> {grammar.explain}
                </p>
                {/* <p>
                    <strong>Trình độ:</strong> {grammar.level}
                </p> */}
                {/* Hiển thị ví dụ nếu có */}
                {grammar.examples && grammar.examples.length > 0 && (
                    <div>
                        <strong>Ví dụ:</strong>
                        <ul className="list-disc pl-5">
                            {grammar.examples.map((example) => (
                                <li
                                    key={example._id}
                                    className="mt-4 space-y-2"
                                >
                                    <p className="text-blue-600 font-medium">
                                        {example.ja}
                                    </p>
                                    <p className="text-gray-700">
                                        {example.vi}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GrammarItem
