import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="mr-1.5">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email)
    navigate('/dashboard')
  }

  const handleGoogle = () => {
    login('priya@example.com')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-12 overflow-hidden paper-texture">
      
      {/* LEFT SPLIT PANEL: Polaroid collage graphic showcase */}
      <div className="hidden lg:flex lg:col-span-6 relative bg-cream-dark/20 border-r border-beige/45 flex-col justify-between p-12 overflow-hidden select-none">
        
        {/* Glow decorations */}
        <div className="absolute top-12 left-12 w-96 h-96 bg-soft-pink/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-96 h-96 bg-lavender/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 z-10 self-start group">
          <BookOpen className="w-5.5 h-5.5 text-pink-accent group-hover:scale-110 group-hover:rotate-6 transition-transform duration-350" />
          <span className="font-display text-2xl font-bold tracking-tight text-ink italic">ScrapBook</span>
        </Link>

        {/* Polaroid Collage */}
        <div className="relative w-full max-w-sm mx-auto h-[380px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -6, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-8 left-4 w-48 p-3 pb-8 polaroid-frame"
          >
            <div className="aspect-square overflow-hidden rounded-xs border border-beige/20">
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <p className="font-handwritten text-lg font-bold text-center mt-3 text-ink-muted">Loved 🥰</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, rotate: 10, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 8, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-6 right-4 w-48 p-3 pb-8 polaroid-frame"
          >
            <div className="aspect-square overflow-hidden rounded-xs border border-beige/20">
              <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <p className="font-handwritten text-lg font-bold text-center mt-3 text-ink-muted">Wanderlust ✈️</p>
          </motion.div>
        </div>

        {/* Inspiring quote */}
        <div className="z-10 max-w-sm self-center text-center">
          <h2 className="font-display text-3xl font-bold text-ink italic leading-[1.2] mb-3">
            "We do not remember days, we remember moments."
          </h2>
          <p className="text-[9px] uppercase tracking-widest font-bold font-sans text-brown-light">— Cesare Pavese</p>
        </div>

      </div>

      {/* RIGHT SPLIT PANEL: Form card */}
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center px-6 py-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo display for mobile */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex lg:hidden items-center gap-2 mb-6 group">
              <BookOpen className="w-5.5 h-5.5 text-pink-accent group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              <span className="font-display text-2xl font-bold text-ink italic">ScrapBook</span>
            </Link>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink italic leading-none">Welcome back</h2>
            <p className="text-sm text-ink-muted mt-2 font-sans">Relive and write your chapters today.</p>
          </div>

          <div className="paper-sheet rounded-[28px] p-8 sm:p-10 border border-beige/45 shadow-polaroid space-y-6 relative paper-clip">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full py-3">
                Log in
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-beige/65" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-paper text-ink-muted/80 font-bold uppercase tracking-widest text-[9px] font-sans border border-beige/35 rounded-md">or</span>
              </div>
            </div>

            {/* Social Oauth Mock */}
            <Button variant="secondary" className="w-full py-3" onClick={handleGoogle}>
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>

            <p className="text-center text-sm text-ink-muted font-medium pt-2 font-sans">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-accent font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
