function VocabularyItem({ vocab, index }) {
    return (
        <div
            key={vocab._id}
            className="border border-gray-200 p-4 rounded-md flex flex-col gap-2"
        >
            <h3 className="w-fit text-lg font-semibold text-blue-500">
                {index + 1}. {vocab.word}
            </h3>
            <div className="flex flex-col gap-4 px-5">
                <p>
                    <strong>Phiên âm:</strong> {vocab.word}
                </p>
                <p>
                    <strong>Kana:</strong> {vocab.kana}
                </p>
                <p>
                    <strong>Kanji:</strong> {vocab.kanji}
                </p>
                <p>
                    <strong>Ý nghĩa:</strong> {vocab.meaning}
                </p>
                <p>
                    <strong>Ghi chú:</strong> {vocab.notes}
                </p>
                <p>
                    <strong>Ví dụ:</strong> {vocab.example}
                </p>

                {/* Hiển thị audio nếu có */}
                {vocab.audio && (
                    <div className="flex items-center gap-2">
                        <strong>Phát âm:</strong>
                        <audio controls>
                            <source src={vocab.audio} type="audio/mpeg" />
                            Trình duyệt của bạn không hỗ trợ phát âm thanh.
                        </audio>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VocabularyItem
