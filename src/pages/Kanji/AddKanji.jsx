import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, Search } from '@mui/icons-material'
import Swal from 'sweetalert2'

function Kanji() {
    const [kanjis, setKanjis] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [jlptLevel, setJlptLevel] = useState('N5')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setKanjis([])
        setPage(1)
        setHasMore(true)
    }, [jlptLevel])

    useEffect(() => {
        fetchKanjis(jlptLevel, page)
    }, [jlptLevel, page])

    const fetchKanjis = async (jlpt, page) => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get(`/kanji/${jlpt}/${page}`)
            const newKanjis = res.data?.data?.kanji || []
            if (newKanjis.length === 0) {
                setHasMore(false)
            } else {
                setKanjis((prev) => [...prev, ...newKanjis])
            }
        } catch (err) {
            console.error('Error fetching kanji:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteKanji = async (id, kanjiChar) => {
        const confirm = await Swal.fire({
            title: `Xóa Kanji "${kanjiChar}"?`,
            text: 'Hành động này sẽ không thể hoàn tác.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
        })

        if (confirm.isConfirmed) {
            try {
                const res = await axiosInstance.delete(`/kanji/${id}`)
                Swal.fire('Đã xóa!', res.data?.message || '', 'success')
                setKanjis((prev) => prev.filter((k) => k._id !== id))
            } catch (err) {
                Swal.fire(
                    'Lỗi!',
                    err.response?.data?.message || 'Không thể xóa Kanji',
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
        <div className="p-6 mx-auto max-w-5xl">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Danh sách Kanji - JLPT {jlptLevel}
                </h1>

                <select
                    value={jlptLevel}
                    onChange={(e) => setJlptLevel(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    {['N1', 'N2', 'N3', 'N4', 'N5'].map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>

                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm Kanji hoặc nghĩa..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <Link
                    to="/kanji/create"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                >
                    <Add /> Thêm Kanji
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {filteredKanjis.map((kanji) => (
                    <div
                        key={kanji._id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <Book />
                            </div>
                            <div>
                                <p className="text-xl font-bold">
                                    {kanji.kanji}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {kanji.mean}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                handleDeleteKanji(kanji._id, kanji.kanji)
                            }
                            className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                            <Delete />
                        </button>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="mt-6 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                    Xem thêm
                </button>
            )}

            {!filteredKanjis.length && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                    Không tìm thấy Kanji nào với từ khóa "{searchTerm}"
                </div>
            )}
        </div>
    )
}

export default Kanji
