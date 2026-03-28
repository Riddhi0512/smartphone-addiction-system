import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/analyse', label: 'Analyse' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        paddingTop: scrolled ? '0' : '8px',
      }}
    >
      <nav
        className="mx-auto transition-all duration-500"
        style={{
          maxWidth: scrolled ? '100%' : '900px',
          margin: scrolled ? '0' : '12px auto 0',
          borderRadius: scrolled ? '0' : '20px',
          background: scrolled
            ? 'rgba(250, 248, 255, 0.88)'
            : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(212, 179, 255, 0.2)'
            : '1px solid rgba(212, 179, 255, 0.25)',
          boxShadow: scrolled
            ? '0 2px 24px rgba(155, 77, 255, 0.06)'
            : '0 4px 32px rgba(155, 77, 255, 0.08)',
          padding: '0 32px',
        }}
      >
        <div className="flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #b880ff 0%, #ff6b8a 100%)',
                boxShadow: '0 4px 12px rgba(155, 77, 255, 0.3)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="white" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3.05 3.05l1.42 1.42M11.54 11.54l1.41 1.41M11.54 4.47l1.41-1.42M3.05 12.95l1.42-1.41" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>
            <span
              className="font-display text-lg font-medium tracking-tight"
              style={{ color: '#3d3450' }}
            >
              Addiction Lens
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label }) => {
              const active = pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-xl"
                  style={{
                    color: active ? '#7c3aed' : '#6b5f80',
                    background: active ? 'rgba(155, 77, 255, 0.08)' : 'transparent',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = 'rgba(155, 77, 255, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #b880ff, #ff6b8a)' }}
                    />
                  )}
                </Link>
              )
            })}

            <Link
              to="/analyse"
              className="ml-3 px-5 py-2 text-sm font-medium text-white rounded-xl btn-shimmer transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
              style={{
                background: 'linear-gradient(135deg, #b880ff 0%, #9b4dff 100%)',
                boxShadow: '0 4px 14px rgba(155, 77, 255, 0.3)',
                textDecoration: 'none',
              }}
            >
              Start Analysis
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-0.5 w-6 rounded-full transition-all duration-300"
              style={{
                background: '#6b5f80',
                transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none',
              }}
            />
            <span
              className="block h-0.5 w-6 rounded-full transition-all duration-300"
              style={{
                background: '#6b5f80',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-6 rounded-full transition-all duration-300"
              style={{
                background: '#6b5f80',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-petal-100 mt-1 pt-3 space-y-1">
            {LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: pathname === to ? '#7c3aed' : '#6b5f80',
                  background: pathname === to ? 'rgba(155, 77, 255, 0.08)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
