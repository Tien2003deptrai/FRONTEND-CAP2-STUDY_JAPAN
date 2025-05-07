import axiosInstance from '@/network/httpRequest'
import { Add, ArrowBack } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function AddVocabulary() {
    const navigate = useNavigate()

    // hihi
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            word: '',
            kana: '',
            kanji: '',
            meaning: '',
        },
    })

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post('/vocabulary/no-lesson', data)
            if (res.status === 200) {
                toast.success('🎉 Thêm từ vựng thành công!')
                setTimeout(() => navigate(-1), 1500)
            }
        } catch (error) {
            console.error('Lỗi thêm từ vựng:', error)
            toast.error('❌ Thêm từ vựng thất bại!')
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <ToastContainer hideProgressBar autoClose={3000} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full border p-2 shadow hover:bg-gray-100 transition"
                >
                    <ArrowBack />
                </button>
                <h1 className="text-xl font-bold text-gray-800">
                    Thêm từ vựng mới
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Từ vựng
                    </label>
                    <input
                        {...register('word', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-red-400"
                        placeholder="Ví dụ: こんにちは"
                    />
                    {errors.word && (
                        <p className="text-sm text-red-500 mt-1">
                            Vui lòng nhập từ vựng.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kana
                    </label>
                    <input
                        {...register('kana', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-red-400"
                        placeholder="Ví dụ: こんにちは"
                    />
                    {errors.kana && (
                        <p className="text-sm text-red-500 mt-1">
                            Vui lòng nhập kana.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kanji
                    </label>
                    <input
                        {...register('kanji', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-red-400"
                        placeholder="Ví dụ: 今日は"
                    />
                    {errors.kanji && (
                        <p className="text-sm text-red-500 mt-1">
                            Vui lòng nhập kanji.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ý nghĩa
                    </label>
                    <input
                        {...register('meaning', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-red-400"
                        placeholder="Ví dụ: Xin chào"
                    />
                    {errors.meaning && (
                        <p className="text-sm text-red-500 mt-1">
                            Vui lòng nhập ý nghĩa.
                        </p>
                    )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                    >
                        <Add className="mr-2" /> Lưu từ vựng
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddVocabulary
