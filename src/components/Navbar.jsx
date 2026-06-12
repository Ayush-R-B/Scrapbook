import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, LogOut, Menu, X, Compass, Layers, Heart, User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Button from './ui/Button'

export default function Navbar({ transparent = false }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${transparent && isLanding && !scrolled
          ? 'bg-transparent py-5 sm:py-6 border-b border-transparent'
          : 'bg-paper/92 backdrop-blur-md border-b border-beige/45 shadow-[0_2px_12px_rgba(50,38,31,0.03)] py-3 sm:py-4'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <BookOpen className="w-5.5 h-5.5 text-pink-accent group-hover:scale-110 group-hover:rotate-6 transition-transform duration-350" />
            <span className="font-display text-2xl font-bold tracking-tight text-ink italic">
              ScrapBook
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isLanding && (
              <>
                <a href="#features" className="text-[11px] uppercase tracking-wider font-bold text-ink-muted hover:text-pink-accent transition-colors duration-200 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Features
                </a>
                <a href="#bookshelf" className="text-[11px] uppercase tracking-wider font-bold text-ink-muted hover:text-pink-accent transition-colors duration-200 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Bookshelf
                </a>
                <a href="#themes" className="text-[11px] uppercase tracking-wider font-bold text-ink-muted hover:text-pink-accent transition-colors duration-200 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Themes
                </a>
              </>
            )}
            {user ? (
              <>
                <Link to="/dashboard" className="text-[11px] uppercase tracking-wider font-bold text-ink-muted hover:text-ink transition-colors duration-200">
                  My Bookshelf
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-beige/60">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <img src={user.avatar} alt={user.name} className="w-7.5 h-7.5 rounded-full object-cover ring-2 ring-pink-accent/40 group-hover:ring-pink-accent/80 transition-all duration-200 shadow-sm" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-ink-muted group-hover:text-ink transition-colors">{user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleLogout} title="Log out" className="text-ink-muted hover:text-pink-accent cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-cream-dark/40">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[11px] uppercase tracking-wider font-bold text-ink-muted hover:text-ink transition-colors duration-200">Log in</Link>
                <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
              </>
            )}
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-cream-dark/30 hover:bg-cream-dark/60 cursor-pointer text-ink transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper/95 backdrop-blur-md border-b border-beige/30 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {isLanding && (
                <>
                  <a href="#features" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-ink-muted hover:text-pink-accent transition-colors flex items-center gap-2">
                    <Compass className="w-4.5 h-4.5" /> Features
                  </a>
                  <a href="#bookshelf" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-ink-muted hover:text-pink-accent transition-colors flex items-center gap-2">
                    <Layers className="w-4.5 h-4.5" /> Bookshelf
                  </a>
                  <a href="#themes" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-ink-muted hover:text-pink-accent transition-colors flex items-center gap-2">
                    <Heart className="w-4.5 h-4.5" /> Themes
                  </a>
                </>
              )}
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-ink hover:text-pink-accent transition-colors">
                    My Bookshelf
                  </Link>
                  <div className="h-px bg-beige/40 my-1" />
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-accent/30" />
                      <span className="text-sm font-medium text-ink">{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-sm font-semibold text-pink-accent flex items-center gap-1.5 cursor-pointer">
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-ink hover:text-pink-accent transition-colors">Log in</Link>
                  <Button size="sm" onClick={() => { navigate('/signup'); setMenuOpen(false) }} className="w-full">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
