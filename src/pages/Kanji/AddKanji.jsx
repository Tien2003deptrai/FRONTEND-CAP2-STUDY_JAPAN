import { useState } from 'react'
import {
    Box,
    Button,
    TextField,
    Typography,
    Chip,
    Stack,
    Paper,
} from '@mui/material'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const initialForm = {
    kanji: '',
    cn_vi_word: '',
    component: [''],
    examples: [{ ja: '', hira: '', vi: '' }],
    explain: '',
    jlpt: 'N5',
    kunyomi: [''],
    onyomi: [''],
    mean: '',
    stroke_num: '',
    unicode: '',
}

const JLPT_LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5']

function AddKanji() {
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Handle input change for simple fields
    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    // Handle array fields: component, kunyomi, onyomi
    const handleArrayChange = (field, index) => (e) => {
        const newArr = [...form[field]]
        newArr[index] = e.target.value
        setForm((prev) => ({ ...prev, [field]: newArr }))
    }
    const addArrayItem = (field) => {
        setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
    }
    const removeArrayItem = (field, index) => {
        const newArr = form[field].filter((_, i) => i !== index)
        setForm((prev) => ({ ...prev, [field]: newArr }))
    }

    // Handle examples (array of objects)
    const handleExampleChange = (index, key) => (e) => {
        const newExamples = [...form.examples]
        newExamples[index][key] = e.target.value
        setForm((prev) => ({ ...prev, examples: newExamples }))
    }
    const addExample = () => {
        setForm((prev) => ({
            ...prev,
            examples: [...prev.examples, { ja: '', hira: '', vi: '' }],
        }))
    }
    const removeExample = (index) => {
        const newExamples = form.examples.filter((_, i) => i !== index)
        setForm((prev) => ({ ...prev, examples: newExamples }))
    }

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!form.kanji.trim()) {
            Swal.fire('Lỗi', 'Chữ Kanji không được để trống', 'error')
            return
        }
        if (!form.mean.trim()) {
            Swal.fire('Lỗi', 'Ý nghĩa Kanji không được để trống', 'error')
            return
        }

        setLoading(true)
        try {
            // Prepare payload: remove empty strings from arrays
            const payload = {
                ...form,
                component: form.component.filter((c) => c.trim() !== ''),
                kunyomi: form.kunyomi.filter((k) => k.trim() !== ''),
                onyomi: form.onyomi.filter((o) => o.trim() !== ''),
                stroke_num: Number(form.stroke_num),
                examples: form.examples.filter(
                    (ex) => ex.ja.trim() && ex.hira.trim() && ex.vi.trim()
                ),
            }

            await axiosInstance.post('/kanji/add', payload)
            navigate(-1)
            Swal.fire('Thành công', 'Đã thêm Kanji mới', 'success')
            setForm(initialForm)
        } catch (error) {
            Swal.fire(
                'Lỗi',
                error.response?.data?.message || 'Thêm Kanji thất bại',
                'error'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box maxWidth={700} mx="auto" p={4}>
            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
                color="error"
                textAlign="center"
                sx={{
                    borderBottom: '4px solid',
                    borderColor: 'error.main',
                    display: 'inline-block',
                    pb: 1,
                    mx: 'auto',
                }}
            >
                Thêm Kanji mới
            </Typography>

            <form onSubmit={handleSubmit}>
                {/* Kanji & Mean */}
                <Stack spacing={3} mb={4}>
                    <TextField
                        label="Chữ Kanji"
                        value={form.kanji}
                        onChange={handleChange('kanji')}
                        required
                        inputProps={{
                            maxLength: 2,
                            style: { fontSize: 36, textAlign: 'center' },
                        }}
                        sx={{ fontWeight: 'bold' }}
                    />

                    <TextField
                        label="Ý nghĩa (mean)"
                        value={form.mean}
                        onChange={handleChange('mean')}
                        required
                    />

                    <TextField
                        label="Nghĩa chữ tiếng Trung (cn_vi_word)"
                        value={form.cn_vi_word}
                        onChange={handleChange('cn_vi_word')}
                        helperText="Ví dụ: Mặt trời, ngày"
                    />
                </Stack>

                {/* Components (bộ thủ) */}
                <Box mb={4}>
                    <Typography fontWeight="bold" mb={1}>
                        Bộ thủ (Components)
                    </Typography>
                    {form.component.map((c, i) => (
                        <Stack
                            key={i}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={1}
                        >
                            <TextField
                                label={`Bộ thủ #${i + 1}`}
                                value={c}
                                onChange={handleArrayChange('component', i)}
                                fullWidth
                            />
                            {form.component.length > 1 && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        removeArrayItem('component', i)
                                    }
                                >
                                    Xóa
                                </Button>
                            )}
                        </Stack>
                    ))}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => addArrayItem('component')}
                    >
                        Thêm bộ thủ
                    </Button>
                </Box>

                {/* Examples */}
                <Box mb={4}>
                    <Typography fontWeight="bold" mb={1}>
                        Ví dụ (Examples)
                    </Typography>
                    {form.examples.map((ex, i) => (
                        <Paper key={i} variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                mb={1}
                            >
                                <TextField
                                    label="Tiếng Nhật (ja)"
                                    value={ex.ja}
                                    onChange={handleExampleChange(i, 'ja')}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Kana (hira)"
                                    value={ex.hira}
                                    onChange={handleExampleChange(i, 'hira')}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Nghĩa tiếng Việt (vi)"
                                    value={ex.vi}
                                    onChange={handleExampleChange(i, 'vi')}
                                    fullWidth
                                    required
                                />
                                {form.examples.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeExample(i)}
                                    >
                                        Xóa
                                    </Button>
                                )}
                            </Stack>
                        </Paper>
                    ))}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={addExample}
                    >
                        Thêm ví dụ
                    </Button>
                </Box>

                {/* Kunyomi & Onyomi */}
                <Stack
                    spacing={4}
                    mb={4}
                    direction={{ xs: 'column', sm: 'row' }}
                >
                    {/* Kunyomi */}
                    <Box flex={1}>
                        <Typography fontWeight="bold" mb={1}>
                            Kunyomi (Âm thuần Nhật)
                        </Typography>
                        {form.kunyomi.map((k, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                mb={1}
                            >
                                <TextField
                                    label={`Kunyomi #${i + 1}`}
                                    value={k}
                                    onChange={handleArrayChange('kunyomi', i)}
                                    fullWidth
                                />
                                {form.kunyomi.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            removeArrayItem('kunyomi', i)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                )}
                            </Stack>
                        ))}
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => addArrayItem('kunyomi')}
                        >
                            Thêm Kunyomi
                        </Button>
                    </Box>

                    {/* Onyomi */}
                    <Box flex={1}>
                        <Typography fontWeight="bold" mb={1}>
                            Onyomi (Âm Hán Nhật)
                        </Typography>
                        {form.onyomi.map((o, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                mb={1}
                            >
                                <TextField
                                    label={`Onyomi #${i + 1}`}
                                    value={o}
                                    onChange={handleArrayChange('onyomi', i)}
                                    fullWidth
                                />
                                {form.onyomi.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            removeArrayItem('onyomi', i)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                )}
                            </Stack>
                        ))}
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => addArrayItem('onyomi')}
                        >
                            Thêm Onyomi
                        </Button>
                    </Box>
                </Stack>

                {/* Stroke Number & Unicode */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={4}
                    mb={4}
                >
                    <TextField
                        label="Số nét (stroke_num)"
                        type="number"
                        value={form.stroke_num}
                        onChange={handleChange('stroke_num')}
                        fullWidth
                    />
                    <TextField
                        label="Unicode"
                        value={form.unicode}
                        onChange={handleChange('unicode')}
                        fullWidth
                    />
                </Stack>

                {/* Explain */}
                <TextField
                    label="Giải thích (explain)"
                    value={form.explain}
                    onChange={handleChange('explain')}
                    multiline
                    rows={4}
                    fullWidth
                    mb={4}
                />

                {/* JLPT Level */}
                <TextField
                    select
                    label="JLPT"
                    value={form.jlpt}
                    onChange={handleChange('jlpt')}
                    fullWidth
                    SelectProps={{ native: true }}
                    mb={4}
                >
                    {JLPT_LEVELS.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </TextField>

                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    size="large"
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Đang lưu...' : 'Thêm Kanji'}
                </Button>
            </form>
        </Box>
    )
}

export default AddKanji
