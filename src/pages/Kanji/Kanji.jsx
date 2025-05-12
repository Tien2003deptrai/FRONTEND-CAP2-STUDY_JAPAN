import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, Search } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const JLPT_LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5']

function Kanji() {
    const [kanjis, setKanjis] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [jlptLevel, setJlptLevel] = useState('N5')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setKanjis([])
        setPage(1)
        setHasMore(true)
    }, [jlptLevel])

    useEffect(() => {
        fetchKanjis(jlptLevel, page)
    }, [page, jlptLevel])

    const fetchKanjis = async (jlpt, currentPage) => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get(`/kanji/${jlpt}/${currentPage}`)
            const newKanjis = res.data?.data?.kanji || []
            if (newKanjis.length === 0) {
                setHasMore(false)
            } else {
                setKanjis((prev) => [...prev, ...newKanjis])
            }
        } catch (err) {
            console.error('Error fetching kanjis:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleShowMore = () => setPage((prev) => prev + 1)

    const handleDeleteKanji = async (id, kanjiChar) => {
        const confirm = await Swal.fire({
            title: `Xóa Kanji "${kanjiChar}"?`,
            text: 'Hành động này không thể hoàn tác.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
        })

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/kanji/${id}`)
                setKanjis((prev) => prev.filter((k) => k._id !== id))
                Swal.fire('Đã xóa!', `Đã xóa Kanji "${kanjiChar}"`, 'success')
            } catch (err) {
                Swal.fire(
                    'Lỗi!',
                    err.response?.data?.message || 'Không thể xóa kanji.',
                    'error'
                )
            }
        }
    }

    const filteredKanjis = kanjis.filter(
        (k) =>
            k.kanji.includes(searchTerm) ||
            k.mean?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6 mx-auto">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Header */}
            <div className="flex justify-between items-center w-full flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Danh sách Kanji
                </h1>

                <select
                    value={jlptLevel}
                    onChange={(e) => setJlptLevel(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    {JLPT_LEVELS.map((level) => (
                        <option key={level} value={level}>
                            JLPT {level}
                        </option>
                    ))}
                </select>

                <div className="relative flex-grow min-w-[220px] max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm Kanji hoặc nghĩa..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                </div>

                <Link
                    to={'create-kanji'}
                    className="primary-btn inline-flex items-center gap-2"
                >
                    <Add /> Thêm Kanji
                </Link>
            </div>

            <hr className="my-6" />

            {/* List */}
            <div className="flex flex-col gap-4">
                {filteredKanjis.map((kanji) => (
                    <div
                        key={kanji._id}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <Book />
                            </div>
                            <div className="text-gray-900 font-medium">
                                <span className="text-xl font-bold">
                                    {kanji.kanji}
                                </span>{' '}
                                – {kanji.mean}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                handleDeleteKanji(kanji._id, kanji.kanji)
                            }
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200"
                        >
                            <Delete />
                        </button>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={handleShowMore}
                    className="mt-6 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    Xem thêm
                </button>
            )}

            {!filteredKanjis.length && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                    Không tìm thấy Kanji nào phù hợp với từ khóa "{searchTerm}"
                </div>
            )}
        </div>
    )
}

export default Kanji
