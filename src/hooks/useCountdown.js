import { useState, useEffect } from 'react'
import { SITE_CONFIG } from '../config/site'

export function useCountdown(targetDateIso = SITE_CONFIG.startDateIso) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDateIso).getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isPast: true }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      isPast: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDateIso])

  return timeLeft
}
