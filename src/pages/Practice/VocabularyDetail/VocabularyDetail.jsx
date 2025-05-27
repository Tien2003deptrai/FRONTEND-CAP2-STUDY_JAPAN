import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Button,
    Typography,
    Box,
    IconButton,
    Paper,
    CircularProgress,
} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import MicIcon from '@mui/icons-material/Mic'
import StopIcon from '@mui/icons-material/Stop'
import axios from 'axios'
import axiosInstance from '@/network/httpRequest'
import annyang from 'annyang'
import { CheckCircleOutline } from '@mui/icons-material'

const VocabularyDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [vocab, setVocab] = useState(null)
    const [transcript, setTranscript] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [accuracy, setAccuracy] = useState(null)

    // State to control Snackbar visibility and message
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

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

    const stopListening = () => {
        if (annyang) {
            annyang.abort()
        }
    }

    useEffect(() => {
        if (annyang && isRecording) {
            annyang.setLanguage('ja-JP')
            const commands = {
                'stop listening': stopListening,
            }

            annyang.addCommands(commands)
            annyang.start()

            annyang.addCallback('result', (userSaid) => {
                setTranscript(userSaid[0])
            })
        }

        return () => {
            if (annyang) {
                annyang.abort()
            }
        }
    }, [])

    const startRecording = () => {
        setSnackbarMessage('')
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const recorder = new MediaRecorder(stream)
                    const audioChunks = []

                    recorder.ondataavailable = (event) => {
                        audioChunks.push(event.data)
                    }

                    recorder.start()

                    setMediaRecorder(recorder)
                    setIsRecording(true)

                    recorder.onstop = () => {
                        const blob = new Blob(audioChunks, {
                            type: 'audio/wav',
                        })

                        analyzeWord(blob)
                    }
                })
                .catch((err) =>
                    console.error('Error accessing audio stream:', err)
                )
        }
    }

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            console.log('Stopping recording...')
            mediaRecorder.stop()
            setIsRecording(false)
        }
    }

    const analyzeWord = async (blob) => {
        if (!blob) {
            setSnackbarMessage('Vui lòng ghi âm trước!')
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
            return
        }

        setIsAnalyzing(true)
        const formData = new FormData()
        formData.append('target_word', vocab.word)
        formData.append('audio', blob, 'audio.wav')

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/analyze',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            const data = response.data
            setSnackbarMessage(data.feedback || 'Phân tích thành công!')
            setSnackbarSeverity('success')
            setAccuracy(data.accuracy)
        } catch (error) {
            console.error('Error analyzing word:', error)
            setSnackbarMessage(
                error.response?.data.error || 'Có lỗi khi phân tích'
            )
            setSnackbarSeverity('error')
        }
        setIsAnalyzing(false)
        setOpenSnackbar(true)
    }

    const speakJapanese = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        speechSynthesis.speak(utterance)
    }

    const handleBack = () => {
        navigate('/practice/vocabulary')
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

            <Box sx={{ mt: 3 }}>
                {/* Start and stop recording with icons only */}
                {isAnalyzing ? (
                    <div>
                        <CircularProgress
                            size={24}
                            sx={{ color: 'primary.main' }}
                        />
                        <p className="text-gray-600 mt-2">Đang phân tích...</p>
                    </div>
                ) : (
                    <div>
                        <Button
                            variant="contained"
                            onClick={startRecording}
                            disabled={isRecording}
                            sx={{ mr: 2 }}
                            aria-label="Bắt đầu ghi âm"
                        >
                            {isRecording ? <StopIcon /> : <MicIcon />}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={stopRecording}
                            disabled={!isRecording}
                            aria-label="Dừng ghi âm"
                        >
                            <StopIcon />
                        </Button>
                    </div>
                )}

                {/* Display transcript if available */}
                {transcript && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Đã nhận diện: <strong>{transcript}</strong>
                    </Typography>
                )}

                {accuracy !== null && (
                    <Typography
                        variant="body1"
                        sx={{ mt: 1, fontWeight: 'bold' }}
                    >
                        Độ chính xác phát âm: {accuracy}%
                    </Typography>
                )}
            </Box>
            {snackbarMessage && (
                <div className="mt-5 p-4 border rounded-lg bg-green-50 text-green-800">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">Kết quả phân tích</h3>
                        <CheckCircleOutline fontSize="small" />
                    </div>

                    <p className="leading-6">{snackbarMessage}</p>
                </div>
            )}
        </Box>
    )
}

export default VocabularyDetail
