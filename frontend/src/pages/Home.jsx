import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const STATS = [
  { value: '4.8h', label: 'Average daily screen time globally' },
  { value: '96×', label: 'Times the average user checks their phone per day' },
  { value: '26%', label: 'Of users classified as smartphone-dependent' },
]

const FEATURES = [
  {
    title: 'Behavioural Analysis',
    desc: 'Input five key usage metrics and receive a scientifically-grounded assessment of your dependency level.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: '#b880ff',
    bg: 'rgba(184, 128, 255, 0.1)',
  },
  {
    title: 'AI Recommendations',
    desc: 'Receive a tailored action plan based on your predicted addiction level — not generic advice.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    color: '#ff6b8a',
    bg: 'rgba(255, 107, 138, 0.1)',
  },
  {
    title: 'Downloadable Report',
    desc: 'Export a clean PDF summary of your inputs, result, and recommendations — no account required.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    color: '#4dc48a',
    bg: 'rgba(77, 196, 138, 0.1)',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  return (
    <main className="pt-24 pb-24 px-4">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto text-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-8"
          style={{
            background: 'rgba(155, 77, 255, 0.08)',
            color: '#9b4dff',
            border: '1px solid rgba(155, 77, 255, 0.18)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: '#9b4dff' }}
          />
          AI-Powered Behavioural Analysis
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-tight"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)', color: '#3d3450', letterSpacing: '-0.02em' }}
        >
          Understand your{' '}
          <span className="gradient-text">relationship</span>
          <br />
          with your phone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base leading-relaxed max-w-xl mx-auto"
          style={{ color: '#7a6e8f' }}
        >
          Addiction Lens uses a trained machine learning model to analyse your
          daily usage patterns and predict your smartphone dependency level —
          with personalised recommendations to restore balance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/analyse"
            className="btn-shimmer relative inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #b880ff 0%, #9b4dff 100%)',
              boxShadow: '0 6px 24px rgba(155, 77, 255, 0.3)',
              textDecoration: 'none',
            }}
          >
            Start Analysis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-medium transition-all duration-200"
            style={{
              color: '#6b5f80',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(212, 179, 255, 0.3)',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}
          >
            Learn more
          </Link>
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-2xl mx-auto mt-24 grid grid-cols-3 gap-4"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            className="glass-card-sm text-center py-6 px-4"
          >
            <p className="font-display text-2xl font-medium" style={{ color: '#9b4dff' }}>
              {s.value}
            </p>
            <p className="mt-1 text-[11px] leading-tight" style={{ color: '#8b7ca8' }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── Features ──────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-3xl mx-auto mt-24"
      >
        <motion.h2
          variants={item}
          className="font-display text-center text-3xl font-medium mb-12"
          style={{ color: '#3d3450' }}
        >
          Everything you need to understand your habits
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold" style={{ color: '#3d3450' }}>
                {f.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: '#7a6e8f' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA banner ────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto mt-24 text-center rounded-3xl p-12 overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(184,128,255,0.15) 0%, rgba(255,107,138,0.1) 100%)',
          border: '1px solid rgba(184,128,255,0.25)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(255,163,184,0.15) 0%, transparent 60%)',
        }} />
        <p className="font-display text-2xl font-medium" style={{ color: '#3d3450' }}>
          Ready to gain clarity?
        </p>
        <p className="mt-3 text-sm" style={{ color: '#7a6e8f' }}>
          The analysis takes less than 60 seconds and requires no account.
        </p>
        <Link
          to="/analyse"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #b880ff 0%, #ff6b8a 100%)',
            boxShadow: '0 6px 20px rgba(155, 77, 255, 0.25)',
            textDecoration: 'none',
          }}
        >
          Analyse My Usage
        </Link>
      </motion.section>
    </main>
  )
}
