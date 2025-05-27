import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { Add, Delete } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Box, Button, Typography, IconButton } from '@mui/material'

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
            if (newKanjis.length === 0) setHasMore(false)
            else setKanjis((prev) => [...prev, ...newKanjis])
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
        <Box maxWidth="1200px" mx="auto" p={4}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Header */}
            <Box
                mb={4}
                display="flex"
                gap={2}
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
            >
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

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm Kanji hoặc nghĩa..."
                    className="border border-gray-300 rounded-lg px-4 py-2 flex-grow max-w-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <Link
                    to="create-kanji"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                    <Add /> Thêm Kanji
                </Link>
            </Box>

            {/* Grid Kanji Cards */}
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
                gap={3}
            >
                {filteredKanjis.length > 0
                    ? filteredKanjis.map((kanji) => (
                          <Box
                              key={kanji._id}
                              sx={{
                                  position: 'relative',
                                  bgcolor: '#fff0f5',
                                  borderRadius: 3,
                                  boxShadow: 3,
                                  p: 4,
                                  textAlign: 'center',
                                  cursor: 'default',
                                  transition:
                                      'box-shadow 0.3s ease, transform 0.3s ease',
                                  '&:hover': {
                                      boxShadow: 8,
                                      transform: 'translateY(-6px)',
                                  },
                              }}
                          >
                              <IconButton
                                  aria-label={`Xóa Kanji ${kanji.kanji}`}
                                  onClick={() =>
                                      handleDeleteKanji(kanji._id, kanji.kanji)
                                  }
                                  sx={{
                                      position: 'absolute',
                                      top: 8,
                                      right: 8,
                                      bgcolor: 'error.light',
                                      color: 'error.main',
                                      '&:hover': {
                                          bgcolor: 'error.main',
                                          color: 'white',
                                      },
                                  }}
                                  size="small"
                              >
                                  <Delete fontSize="small" />
                              </IconButton>

                              <Typography
                                  variant="h3"
                                  fontWeight="bold"
                                  color="error.main"
                                  mb={1}
                                  userSelect="none"
                                  sx={{ lineHeight: 1 }}
                              >
                                  {kanji.kanji}
                              </Typography>
                              <Typography
                                  variant="body1"
                                  color="text.secondary"
                                  userSelect="none"
                                  sx={{ fontWeight: 600 }}
                              >
                                  {kanji.mean}
                              </Typography>
                          </Box>
                      ))
                    : !isLoading && (
                          <Typography
                              variant="h6"
                              color="text.secondary"
                              textAlign="center"
                              gridColumn="1 / -1"
                              py={8}
                              userSelect="none"
                          >
                              Không tìm thấy Kanji phù hợp với từ khóa "
                              {searchTerm}"
                          </Typography>
                      )}
            </Box>

            {/* Show More */}
            {hasMore && (
                <Box textAlign="center" mt={5}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleShowMore}
                        sx={{
                            px: 5,
                            py: 1.5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Xem thêm
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Kanji
