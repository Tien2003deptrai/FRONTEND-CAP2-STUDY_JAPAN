import { useEffect, useRef, useState } from 'react'

const TimerDisplay = ({ initialTime, time_limit, onTimeEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime)
    const timerRef = useRef(null)

    useEffect(() => {
        const now = Date.now()
        const startTime = new Date(initialTime).getTime()
        const remaining = time_limit * 60 * 1000 - (now - startTime)

        setTimeLeft(remaining > 0 ? remaining : 0)
        if (remaining <= 0) {
            clearInterval(timerRef.current)
            onTimeEnd()
            return
        }
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1000) {
                    clearInterval(timerRef.current)
                    return 0
                }
                return prev - 1000
            })
        }, 1000)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTime, time_limit])

    const safeRemainingMs = Math.max(0, timeLeft)
    const minutes = Math.floor(safeRemainingMs / 60000)
    const seconds = Math.floor((safeRemainingMs % 60000) / 1000)

    return (
        <span className="font-bold text-lg">{`${minutes}:${seconds.toString().padStart(2, '0')}`}</span>
    )
}

export default TimerDisplay
