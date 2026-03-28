import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyse from './pages/Analyse'
import About from './pages/About'

export default function App() {
  return (
    <div className="relative min-h-screen noise-overlay">
      {/* Ambient background orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          top: -160,
          left: -160,
          background: 'radial-gradient(circle, rgba(212,179,255,0.22) 0%, transparent 70%)',
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          bottom: -100,
          right: -100,
          background: 'radial-gradient(circle, rgba(187,235,211,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          top: '40%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(255,163,184,0.12) 0%, transparent 70%)',
        }}
      />

      {/* App shell */}
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}
