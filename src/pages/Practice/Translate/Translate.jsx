import axiosInstance from "@/network/httpRequest";
import { useState, useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function Translate() {
  const [text, setText] = useState("");
  const [translateResult, setTranslateResult] = useState(null);
  const [dictionaryResult, setDictionaryResult] = useState(null);

  useEffect(() => {
    if (!text.trim()) {
      setTranslateResult(null);
      setDictionaryResult(null);
      return;
    }

    const timeout = setTimeout(() => {
      handleTranslate();
    }, 500);

    return () => clearTimeout(timeout);
  }, [text]);

  const handleTranslate = async () => {
    try {
      const translateRes = await axiosInstance.post("language/translate/vi-to-ja", { text });
      setTranslateResult(translateRes.data.data);

      const dictRes = await axiosInstance.post("language/dictionary/lookup", { text });
      setDictionaryResult(dictRes.data.data.tratu[0]?.fields || null);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const speakJapanese = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">🌐 Dịch & Tra cứu tiếng Nhật</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6 border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-4">🔍 Nhập từ tiếng Việt</h2>
          <textarea
            placeholder="Nhập..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border border-red-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-4">📘 Kết quả</h2>

          {translateResult ? (
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2">
                <p>
                  <strong className="text-gray-600">Tiếng Nhật:</strong>{" "}
                  <span className="text-red-600 text-lg">{translateResult.sentences[0].trans}</span>
                </p>
                <VolumeUpIcon
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => speakJapanese(translateResult.sentences[0].trans)}
                />
              </div>

              <div className="flex items-center gap-2">
                <p>
                  <strong className="text-gray-600">Phiên âm:</strong>{" "}
                  <span className="text-red-500 italic">{translateResult.sentences[1]?.translit}</span>
                </p>
                <VolumeUpIcon
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={() => speakJapanese(translateResult.sentences[1]?.translit)}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Chưa có kết quả dịch...</p>
          )}

          {dictionaryResult && (
            <div>
              <h3 className="font-semibold text-red-700 mb-2">📚 Từ điển:</h3>
              <p className="text-base text-gray-800 mb-2"><strong>Từ:</strong> {dictionaryResult.word}</p>
              <div
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: dictionaryResult.fulltext }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}