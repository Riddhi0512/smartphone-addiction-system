import React, { useState } from 'react'

const FIELDS = [
  {
    key: 'screen_time',
    label: 'Daily Screen Time',
    unit: 'hours',
    type: 'number',
    step: '0.1',
    min: '0',
    max: '24',
    placeholder: 'e.g. 6.5',
    hint: '0 – 24 hours',
  },
  {
    key: 'unlocks',
    label: 'Phone Unlocks per Day',
    unit: 'times',
    type: 'number',
    step: '1',
    min: '0',
    placeholder: 'e.g. 80',
    hint: 'Average daily unlocks',
  },
  {
    key: 'social_media',
    label: 'Social Media Usage',
    unit: 'hours',
    type: 'number',
    step: '0.1',
    min: '0',
    max: '24',
    placeholder: 'e.g. 3.0',
    hint: '0 – 24 hours',
  },
  {
    key: 'night_usage',
    label: 'Night-time Usage',
    unit: '',
    type: 'select',
    options: [
      { value: '', label: 'Select an option' },
      { value: '0', label: 'No — I do not use my phone at night' },
      { value: '1', label: 'Yes — I use my phone at night' },
    ],
    hint: 'Device use after midnight',
  },
  {
    key: 'sleep_hours',
    label: 'Sleep Hours',
    unit: 'hours',
    type: 'number',
    step: '0.5',
    min: '0',
    max: '24',
    placeholder: 'e.g. 7.0',
    hint: '0 – 24 hours',
  },
]

const initialValues = {
  screen_time: '',
  unlocks: '',
  social_media: '',
  night_usage: '',
  sleep_hours: '',
}

export default function Form({ onResult, onLoading }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    FIELDS.forEach(({ key, label }) => {
      if (values[key] === '' || values[key] === null || values[key] === undefined) {
        next[key] = `${label} is required.`
      }
    })
    return next
  }

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    onLoading(true)
    onResult(null)

    try {
      const payload = {
        screen_time: parseFloat(values.screen_time),
        unlocks: parseInt(values.unlocks, 10),
        social_media: parseFloat(values.social_media),
        night_usage: parseInt(values.night_usage, 10),
        sleep_hours: parseFloat(values.sleep_hours),
      }

      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `Server error: ${res.status}`)
      }

      const data = await res.json()
      onResult({ prediction: data.prediction, error: null })
    } catch (err) {
      onResult({ prediction: null, error: err.message })
    } finally {
      onLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {FIELDS.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {field.label}
            </label>
            <span className="text-[10px] text-slate-400">{field.hint}</span>
          </div>

          {field.type === 'select' ? (
            <select
              className="input-field"
              value={values[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="relative">
              <input
                type={field.type}
                step={field.step}
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="input-field pr-14"
              />
              {field.unit && (
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {field.unit}
                </span>
              )}
            </div>
          )}

          {errors[field.key] && (
            <p className="text-[11px] text-blush-400">{errors[field.key]}</p>
          )}
        </div>
      ))}

      <button type="submit" className="btn-primary mt-2">
        Analyse Usage Pattern
      </button>
    </form>
  )
}
