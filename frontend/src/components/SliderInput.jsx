import React, { useId } from 'react'

export default function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.5,
  unit = '',
  accentColor = '#b880ff',
  trackColor = '#ead9ff',
}) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: '#8b7ca8' }}
        >
          {label}
        </label>
        <div
          className="flex items-baseline gap-1 rounded-lg px-3 py-1 font-mono text-sm font-medium"
          style={{
            background: 'rgba(155, 77, 255, 0.07)',
            color: accentColor,
            minWidth: '64px',
            justifyContent: 'center',
          }}
        >
          <span>{typeof value === 'number' ? value.toFixed(step < 1 ? 1 : 0) : value}</span>
          {unit && <span className="text-xs opacity-70">{unit}</span>}
        </div>
      </div>

      <div className="relative pt-1 pb-1">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="custom-range"
          style={{
            background: `linear-gradient(to right, ${accentColor} ${pct}%, ${trackColor} ${pct}%)`,
          }}
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px]" style={{ color: '#c4b5d8' }}>{min}{unit}</span>
          <span className="text-[10px]" style={{ color: '#c4b5d8' }}>{max}{unit}</span>
        </div>
      </div>
    </div>
  )
}
