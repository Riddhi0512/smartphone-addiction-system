import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SliderInput from '../components/SliderInput'
import ResultCard from '../components/ResultCard'
import RecommendationCard from '../components/RecommendationCard'
import { downloadReport } from '../utils/generateReport'

const DEFAULT_INPUTS = {
  screen_time: 4,
  unlocks: 50,
  social_media: 2,
  night_usage: 0,
  sleep_hours: 7,
}

const RECOMMENDATIONS_TEXT = {
  High: [
    { title: 'Reduce daily screen time', body: 'Set a hard limit of 4 hours per day using built-in screen time tools. Start with gradual 30-minute reductions each week.' },
    { title: 'Eliminate night-time usage', body: 'Put your phone in another room one hour before bed. Blue light suppresses melatonin and fragments sleep architecture.' },
    { title: 'Disable non-essential notifications', body: 'Each notification triggers an unlock. Allow only calls and calendar alerts.' },
    { title: 'Introduce phone-free rituals', body: 'Designate meals and morning routines as phone-free zones. Build these boundaries incrementally.' },
  ],
  Moderate: [
    { title: 'Audit your social media time', body: 'Cap social media to 90 minutes daily. Move social apps off your home screen to reduce impulsive checking.' },
    { title: 'Create focused work blocks', body: 'Try 25-minute focused work sessions with phone face-down, followed by intentional 5-minute breaks.' },
    { title: 'Track your baseline', body: 'Use Screen Time (iOS) or Digital Wellbeing (Android) to see which apps consume the most time.' },
  ],
  Low: [
    { title: 'Your habits are balanced', body: 'You\'re maintaining a healthy relationship with your smartphone. Continue setting intentional boundaries.' },
    { title: 'Re-evaluate every month', body: 'Life changes. Run this analysis monthly to ensure usage stays within healthy ranges.' },
    { title: 'Share the awareness', body: 'Encourage friends and family to understand their own smartphone usage patterns.' },
  ],
}

export default function Analyse() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [downloadingPdf, setDownloadingPdf] = useState(false)

  const setField = useCallback((key) => (value) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS)
    setResult(null)
    setError(null)
  }

  const handlePredict = async () => {
  setLoading(true)
  setResult(null)
  setError(null)

  try {
    const res = await fetch('https://smartphone-addiction-system.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        screen_time: inputs.screen_time,
        unlocks: Math.round(inputs.unlocks),
        social_media: inputs.social_media,
        night_usage: inputs.night_usage,
        sleep_hours: inputs.sleep_hours,
      }),
    })

    // Better error handling
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Server error: ${res.status}`)
    }

    const data = await res.json()

    // Safety check
    if (!data || !data.prediction) {
      throw new Error("Invalid response from server")
    }

    setResult(data.prediction)

  } catch (err) {
    console.error("Prediction error:", err)

    setError(
      "Server may be waking up (Render free tier). Wait 20–30 seconds and try again."
    )
  } finally {
    setLoading(false)
  }
}
  // const handlePredict = async () => {
  //   setLoading(true)
  //   setResult(null)
  //   setError(null)

  //   try {
  //     const res = await fetch('https://smartphone-addiction-system.onrender.com/predict', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         screen_time: inputs.screen_time,
  //         unlocks: Math.round(inputs.unlocks),
  //         social_media: inputs.social_media,
  //         night_usage: inputs.night_usage,
  //         sleep_hours: inputs.sleep_hours,
  //       }),
  //     })

  //     if (!res.ok) {
  //       const errBody = await res.json().catch(() => ({}))
  //       throw new Error(errBody.detail || `Server returned ${res.status}`)
  //     }

  //     const data = await res.json()
  //     setResult(data.prediction)
  //   } catch (err) {
  //     setError(err.message || 'Unable to connect to the prediction server. Please ensure the backend is running at http://localhost:8000.')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleDownload = async () => {
    if (!result) return
    setDownloadingPdf(true)
    try {
      await downloadReport({
        inputs,
        prediction: result,
        recommendations: RECOMMENDATIONS_TEXT[result] ?? [],
      })
    } catch (e) {
      console.error('PDF generation failed:', e)
    } finally {
      setDownloadingPdf(false)
    }
  }

  return (
    <main className="pt-24 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] mb-2" style={{ color: '#9b4dff' }}>
            Step 1 of 1
          </p>
          <h1 className="font-display text-4xl font-medium" style={{ color: '#3d3450' }}>
            Enter your usage data
          </h1>
          <p className="mt-3 text-sm" style={{ color: '#7a6e8f' }}>
            Adjust the sliders to match your typical daily smartphone habits.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* ── Input Panel ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-7 space-y-7"
          >
            <SliderInput
              label="Daily Screen Time"
              value={inputs.screen_time}
              onChange={setField('screen_time')}
              min={0}
              max={12}
              step={0.5}
              unit="h"
              accentColor="#b880ff"
              trackColor="#ead9ff"
            />

            <SliderInput
              label="Phone Unlocks per Day"
              value={inputs.unlocks}
              onChange={setField('unlocks')}
              min={0}
              max={200}
              step={5}
              unit="×"
              accentColor="#ff6b8a"
              trackColor="#ffccd8"
            />

            <SliderInput
              label="Social Media Usage"
              value={inputs.social_media}
              onChange={setField('social_media')}
              min={0}
              max={8}
              step={0.5}
              unit="h"
              accentColor="#3da3ff"
              trackColor="#b8dcff"
            />

            <SliderInput
              label="Sleep Hours"
              value={inputs.sleep_hours}
              onChange={setField('sleep_hours')}
              min={0}
              max={10}
              step={0.5}
              unit="h"
              accentColor="#4dc48a"
              trackColor="#bbebd3"
            />

            {/* Night Usage Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: '#8b7ca8' }}
                >
                  Night-time Usage
                </p>
                <p className="mt-0.5 text-xs" style={{ color: '#b0a5c4' }}>
                  Do you use your phone after midnight?
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={inputs.night_usage === 1}
                onClick={() => setField('night_usage')(inputs.night_usage === 1 ? 0 : 1)}
                className={`toggle-track ${inputs.night_usage === 1 ? 'on' : ''}`}
                style={{
                  background: inputs.night_usage === 1
                    ? 'linear-gradient(135deg, #b880ff, #9b4dff)'
                    : '#ddd6f3',
                }}
              >
                <span className="toggle-thumb" />
              </button>
            </div>

            {/* Summary strip */}
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-2"
              style={{ background: 'rgba(155, 77, 255, 0.05)', border: '1px dashed rgba(155,77,255,0.2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b4dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-[11px]" style={{ color: '#8b7ca8' }}>
                Values are used only for prediction — nothing is stored or transmitted beyond your local machine.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 hover:bg-white/80"
                style={{
                  border: '1.5px solid rgba(155, 77, 255, 0.2)',
                  color: '#8b7ca8',
                  background: 'rgba(255,255,255,0.5)',
                }}
              >
                Reset
              </button>

              <button
                onClick={handlePredict}
                disabled={loading}
                className="flex-[2] relative rounded-xl py-3 text-sm font-medium text-white btn-shimmer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #b880ff 0%, #9b4dff 100%)',
                  boxShadow: '0 4px 20px rgba(155, 77, 255, 0.28)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Analysing…
                  </span>
                ) : (
                  'Predict Addiction Level'
                )}
              </button>
            </div>
          </motion.div>

          {/* ── Results Panel ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Input summary card */}
            <div className="glass-card-sm p-5">
              <p className="text-[10px] font-medium uppercase tracking-widest mb-4" style={{ color: '#8b7ca8' }}>
                Current Inputs
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {[
                  { label: 'Screen Time', value: `${inputs.screen_time}h` },
                  { label: 'Unlocks', value: `${Math.round(inputs.unlocks)}×` },
                  { label: 'Social Media', value: `${inputs.social_media}h` },
                  { label: 'Night Usage', value: inputs.night_usage ? 'Yes' : 'No' },
                  { label: 'Sleep', value: `${inputs.sleep_hours}h` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px]" style={{ color: '#b0a5c4' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: '#3d3450' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Error state */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(255, 107, 138, 0.07)',
                    border: '1px solid rgba(255, 107, 138, 0.25)',
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: '#e03a6a' }}>
                    Prediction failed
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: '#7a6e8f' }}>
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result + recommendations */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <ResultCard prediction={result} />

                  <RecommendationCard prediction={result} />

                  {/* Download report button */}
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleDownload}
                    disabled={downloadingPdf}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: '1.5px solid rgba(155, 77, 255, 0.22)',
                      color: '#7c3aed',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {downloadingPdf ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/>
                          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                        </svg>
                        Generating PDF…
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download Report
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!result && !error && !loading && (
              <div
                className="rounded-2xl border p-10 text-center"
                style={{
                  border: '1.5px dashed rgba(184, 128, 255, 0.25)',
                  background: 'rgba(255,255,255,0.4)',
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(155, 77, 255, 0.08)', color: '#b880ff' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: '#6b5f80' }}>
                  Your result will appear here
                </p>
                <p className="mt-1.5 text-xs" style={{ color: '#b0a5c4' }}>
                  Adjust the sliders and click Predict Addiction Level
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
