import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  delay = 0,
  duration = 0.45,
  yOffset = 20,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Subtle natural ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
