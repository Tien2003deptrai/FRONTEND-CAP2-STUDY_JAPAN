import React from 'react'

const TimerDisplay = ({ timeLeft }) => {

    const formatTime = (s) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <span className="font-bold text-lg">{formatTime(timeLeft || 0)}</span>
    )
}

export default TimerDisplay
