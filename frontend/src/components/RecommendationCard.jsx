import React from 'react'
import { motion } from 'framer-motion'

const RECOMMENDATIONS = {
  High: [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Reduce daily screen time',
      body: 'Set a hard limit of 4 hours per day using your device\'s built-in screen time tools. Start with gradual 30-minute reductions each week.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ),
      title: 'Eliminate night-time usage',
      body: 'Put your phone in another room one hour before bed. Blue light suppresses melatonin and fragments sleep architecture significantly.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
      title: 'Disable non-essential notifications',
      body: 'Each notification is a trigger for an unlock. Audit your apps and allow only calls and calendar alerts to reach you.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Introduce phone-free rituals',
      body: 'Designate meals, morning routines, and the first 30 minutes after waking as phone-free zones. Build these boundaries incrementally.',
    },
  ],
  Moderate: [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      ),
      title: 'Audit your social media time',
      body: 'Cap social media to 90 minutes daily across all platforms. Use app timers and move social apps off your home screen to reduce impulsive checking.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: 'Create focused work blocks',
      body: 'Try the Pomodoro technique — 25 minutes of focused work with phone face-down, followed by a 5-minute break with intentional phone use.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: 'Track your baseline',
      body: 'Use Screen Time (iOS) or Digital Wellbeing (Android) to see exactly which apps consume the most time. Awareness is the first step.',
    },
  ],
  Low: [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Your habits are balanced',
      body: 'You\'re maintaining a healthy relationship with your smartphone. Continue setting intentional boundaries and being mindful of usage patterns.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      title: 'Re-evaluate every month',
      body: 'Life circumstances change. Run this analysis monthly to ensure your usage stays within healthy ranges, especially during stressful periods.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Share the awareness',
      body: 'Encourage friends and family to understand their own smartphone usage. Collective awareness makes digital wellness much more sustainable.',
    },
  ],
}

const ACCENT = {
  High: { color: '#e03a6a', bg: 'rgba(255, 107, 138, 0.07)', border: 'rgba(255, 107, 138, 0.18)' },
  Moderate: { color: '#d4920a', bg: 'rgba(255, 204, 92, 0.07)', border: 'rgba(255, 204, 92, 0.25)' },
  Low: { color: '#27a86c', bg: 'rgba(77, 196, 138, 0.07)', border: 'rgba(77, 196, 138, 0.2)' },
}

export default function RecommendationCard({ prediction }) {
  const recs = RECOMMENDATIONS[prediction] ?? RECOMMENDATIONS['Moderate']
  const accent = ACCENT[prediction] ?? ACCENT['Moderate']

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#8b7ca8' }}>
        Personalised Recommendations
      </p>
      {recs.map((rec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 rounded-xl p-4"
          style={{
            background: accent.bg,
            border: `1px solid ${accent.border}`,
          }}
        >
          <div
            className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: 'rgba(255,255,255,0.7)', color: accent.color }}
          >
            {rec.icon}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#3d3450' }}>
              {rec.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: '#7a6e8f' }}>
              {rec.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
