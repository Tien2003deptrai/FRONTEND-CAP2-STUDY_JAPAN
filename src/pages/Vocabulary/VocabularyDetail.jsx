import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography, Box, IconButton, Paper } from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import axiosInstance from '@/network/httpRequest'

const VocabularyDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [vocab, setVocab] = useState(null)

    useEffect(() => {
        const fetchVocabulary = async () => {
            try {
                const response = await axiosInstance.get(`/vocabulary/${id}`)
                setVocab(response.data.data)
            } catch (error) {
                console.error('Error fetching vocabulary:', error)
            }
        }

        fetchVocabulary()
    }, [id])

    const speakJapanese = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        speechSynthesis.speak(utterance)
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (!vocab) return <Typography textAlign="center">Loading...</Typography>

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3, py: 5 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ mb: 4 }}>
                Quay lại danh sách từ vựng
            </Button>

            <Typography
                variant="h3"
                color="error.main"
                fontWeight="bold"
                gutterBottom
            >
                {vocab.word}
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                    Kana: {vocab.kana} | Kanji: {vocab.kanji || '—'}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Meaning:</strong> {vocab.meaning}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    <i>Example:</i> {vocab.example}
                </Typography>

                {vocab.audio && (
                    <Box sx={{ mt: 2 }}>
                        <IconButton
                            onClick={() => speakJapanese(vocab.word)}
                            size="small"
                        >
                            <VolumeUpIcon />
                        </IconButton>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default VocabularyDetail
