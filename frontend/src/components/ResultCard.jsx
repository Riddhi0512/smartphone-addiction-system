import React from 'react'
import { motion } from 'framer-motion'

const LEVEL_STYLES = {
  Low: {
    label: 'Low',
    tagline: 'Healthy digital habits detected',
    gradient: 'linear-gradient(135deg, #86d9b0 0%, #4dc48a 100%)',
    softBg: 'rgba(134, 217, 176, 0.1)',
    border: 'rgba(134, 217, 176, 0.35)',
    text: '#27a86c',
    bar: 33,
    ring: 'rgba(77, 196, 138, 0.2)',
  },
  Moderate: {
    label: 'Moderate',
    tagline: 'Some usage patterns worth monitoring',
    gradient: 'linear-gradient(135deg, #ffe09a 0%, #ffcc5c 100%)',
    softBg: 'rgba(255, 204, 92, 0.1)',
    border: 'rgba(255, 204, 92, 0.4)',
    text: '#d4920a',
    bar: 66,
    ring: 'rgba(255, 184, 28, 0.2)',
  },
  High: {
    label: 'High',
    tagline: 'Significant dependency indicators present',
    gradient: 'linear-gradient(135deg, #ffa3b8 0%, #ff6b8a 100%)',
    softBg: 'rgba(255, 107, 138, 0.08)',
    border: 'rgba(255, 107, 138, 0.3)',
    text: '#e03a6a',
    bar: 100,
    ring: 'rgba(255, 107, 138, 0.15)',
  },
}

export default function ResultCard({ prediction }) {
  const config = LEVEL_STYLES[prediction] ?? LEVEL_STYLES['Moderate']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: config.softBg,
        border: `1.5px solid ${config.border}`,
        boxShadow: `0 8px 32px ${config.ring}`,
      }}
    >
      {/* Decorative arc */}
      <div
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-20"
        style={{ background: config.gradient }}
      />

      <div className="relative flex items-start gap-5">
        {/* Score circle */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-2xl h-16 w-16"
          style={{
            background: config.gradient,
            boxShadow: `0 6px 20px ${config.ring}`,
          }}
        >
          <span className="font-display text-white text-2xl font-semibold leading-none">
            {config.bar}
            <span className="text-sm">%</span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: '#8b7ca8' }}
          >
            Addiction Level
          </p>
          <p
            className="mt-0.5 font-display text-3xl font-medium leading-tight"
            style={{ color: config.text }}
          >
            {config.label}
          </p>
          <p className="mt-1 text-sm" style={{ color: '#6b5f80' }}>
            {config.tagline}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: config.gradient }}
          initial={{ width: 0 }}
          animate={{ width: `${config.bar}%` }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}
