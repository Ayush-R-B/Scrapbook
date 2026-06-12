import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Heart, Users, Compass, Home, Sparkles, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Button from '../components/ui/Button'
import ThemeCard from '../components/ThemeCard'
import { features, themes, previewBooks } from '../data/mockData'

const floatingPhotos = [
  { src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=160&h=160&fit=crop', x: '8%', y: '22%', delay: 0, rotate: -10 },
  { src: 'https://images.unsplash.com/photo-1522673605300-519db4893ebf?w=140&h=140&fit=crop', x: '84%', y: '16%', delay: 0.4, rotate: 8 },
  { src: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=150&h=150&fit=crop', x: '78%', y: '68%', delay: 0.8, rotate: -6 },
  { src: 'https://images.unsplash.com/photo-1516589178581-6ec78340e8b0?w=140&h=140&fit=crop', x: '6%', y: '62%', delay: 1.2, rotate: 12 },
]

const stickers = ['💕', '✨', '📸', '🌸', '⭐']

const iconMap = {
  personal: BookOpen,
  couple: Heart,
  friendship: Users,
  travel: Compass,
  family: Home,
  custom: Sparkles
}

export default function Landing() {
  const navigate = useNavigate()
  const [selectedPreviewTheme, setSelectedPreviewTheme] = useState(themes[2]) // Floral theme default

  return (
    <div className="min-h-screen paper-texture overflow-hidden">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-soft-pink/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lavender/20 rounded-full blur-3xl"
          />

          {/* Floating Polaroid Photos */}
          {floatingPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: photo.rotate }}
              animate={{ opacity: 0.95, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: photo.delay, duration: 0.8 },
                scale: { delay: photo.delay, duration: 0.8 },
                y: { delay: photo.delay + 0.8, duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute hidden lg:block"
              style={{ left: photo.x, top: photo.y }}
            >
              <div
                className="w-28 h-34 p-2 pb-6 paper-sheet shadow-polaroid border border-beige/40 rounded-sm"
                style={{ transform: `rotate(${photo.rotate}deg)` }}
              >
                <img src={photo.src} alt="" className="w-full h-full object-cover rounded-sm border border-beige/25" />
              </div>
            </motion.div>
          ))}

          {/* Animated Scrapbook Emojis */}
          {stickers.map((s, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              className="absolute text-2xl sm:text-3xl select-none opacity-85 hidden sm:block"
              style={{ left: `${12 + i * 20}%`, top: `${28 + (i % 3) * 22}%` }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-soft-pink/15 border border-pink-accent/20 text-pink-accent text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3 h-3" /> These are memories worth keeping forever
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.12] mb-6 tracking-tight italic">
              Every shared laugh, every quiet evening... preserved in a handmade digital journal.
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-sans">
              Your beautiful moments don't belong in a generic cloud folder. Stitch together polaroids, thoughts, cozy vibes, and shared stories in a handcrafted bookshelf experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Open Your First Volume
              </Button>
              <Button size="lg" variant="secondary" onClick={() => document.getElementById('bookshelf')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Bookshelf
              </Button>
            </div>
          </motion.div>

          {/* Interactive 3D Book Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center perspective-[1200px]"
          >
            <motion.div
              animate={{ rotateY: [-5, 6, -5], y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ rotateY: -15, scale: 1.02 }}
            >
              {/* Outer Hardcover Binder Spine representation */}
              <div
                className={`w-60 sm:w-72 h-84 sm:h-98 rounded-r-2xl rounded-l shadow-[12px_18px_32px_rgba(50,38,31,0.25),-2px_0px_6px_rgba(50,38,31,0.06)] group-hover:shadow-[20px_28px_48px_rgba(50,38,31,0.32)] transition-all duration-300 border-l-[10px] border-warm-brown relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedPreviewTheme.gradient}`} />
                <div className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: selectedPreviewTheme.pattern === 'floral'
                      ? 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.45) 0%, transparent 50%)'
                      : selectedPreviewTheme.pattern === 'stars'
                      ? 'radial-gradient(2px 2px at 20% 30%, white 50%, transparent 50%)'
                      : 'none'
                  }}
                />
                
                {/* Washi tape mockup inside page */}
                <div className="absolute top-10 left-12 w-24 h-6 washi-tape pointer-events-none opacity-80" />

                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <span className="text-[9px] tracking-widest font-bold uppercase text-ink/75 bg-paper/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-beige/45">
                    {selectedPreviewTheme.name}
                  </span>
                  <h3 className="font-display font-bold text-ink text-2xl sm:text-3xl leading-tight mt-2.5 italic drop-shadow-sm">
                    Our Story
                  </h3>
                  <span className="text-[10px] font-handwritten text-ink/80 bg-paper/85 px-2 py-0.5 border border-beige/35 rounded shadow-sm rotate-[2deg] inline-block mt-2 font-bold">
                    est. 2026
                  </span>
                </div>
              </div>

              {/* Gold corners (All four) */}
              <div className="absolute -left-1.5 top-0 w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl-sm" />
              <div className="absolute -left-1.5 bottom-0 w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl-sm" />
              <div className="absolute -right-1.5 top-0 w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr-sm" />
              <div className="absolute -right-1.5 bottom-0 w-3 h-3 border-b-2 border-r-2 border-gold rounded-br-sm" />

              {/* Floated polaroids stacked behind */}
              <motion.div
                animate={{ rotate: [-3, 1, -3] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-28 p-1.5 pb-5 polaroid-frame -z-10 overflow-hidden"
              >
                <img src="https://images.unsplash.com/photo-1522673605300-519db4893ebf?w=120&h=120&fit=crop" alt="" className="w-full h-full object-cover rounded-sm border border-beige/10" />
              </motion.div>
              <motion.div
                animate={{ rotate: [4, -2, 4] }}
                transition={{ duration: 5.5, repeat: Infinity }}
                className="absolute -bottom-8 -left-6 w-22 h-26 p-1.5 pb-5 polaroid-frame -z-10 overflow-hidden"
              >
                <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=100&h=100&fit=crop" alt="" className="w-full h-full object-cover rounded-sm border border-beige/10" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 bg-cream-dark/20 border-y border-beige/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4 italic">
              Journals for Every Chapter of Life
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
              Stitch together travel keepsakes, relationship milestones, family stories, or private late-night thoughts. Build together in real time, or create a quiet personal sanctuary.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {features.map((f, i) => {
              const Icon = iconMap[f.id] || Sparkles
              const rotation = (i % 2 === 0 ? -0.8 : 0.8)
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.01, rotate: rotation * 0.5 }}
                  className="paper-sheet rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-beige/40 flex flex-col items-start relative overflow-hidden"
                  style={{ rotate: `${rotation}deg` }}
                >
                  {/* Subtle tape marker at top-right */}
                  <div className="absolute top-0 right-8 w-10 h-4 bg-paper/60 border-l border-r border-dashed border-black/8 rotate-[-12deg]" />
                  
                  <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center mb-6 text-pink-accent shadow-[inset_0_1px_3px_rgba(50,38,31,0.05)] border border-beige/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-2.5 italic">{f.title}</h3>
                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-sans">{f.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Bookshelf Preview */}
      <section id="bookshelf" className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4 italic">
              Your Handcrafted Bookshelf
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-sans">
              Hover on volumes to slide them out. Each cover opens a chapter of your favorite days.
            </p>
          </motion.div>

          {/* Wooden Shelf representation */}
          <div className="bookshelf-wood rounded-[32px] p-6 sm:p-12 pt-12 sm:pt-16 relative overflow-hidden">
            {/* Spotlight reflection shadow */}
            <div className="absolute inset-0 bookshelf-highlight pointer-events-none" />
            
            <div className="flex items-end justify-center gap-4 sm:gap-8 flex-wrap relative z-10">
              {previewBooks.map((book, i) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -24, scale: 1.05, rotate: 0, zIndex: 20 }}
                  className="relative cursor-pointer perspective-[800px]"
                  style={{ rotate: `${book.rotation}deg` }}
                >
                  <div className="w-24 sm:w-34 aspect-[3/4.2] rounded-r-xl rounded-l overflow-hidden shadow-book hover:shadow-book-hover transition-all duration-300 border-l-4 border-black/20">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />
                    
                    {/* Book spine text */}
                    <div className="absolute bottom-2 left-2 right-2 z-10 text-center">
                      <p className="text-[10px] text-white/95 font-bold truncate font-sans">{book.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Shelf bottom panel extrusion */}
            <div className="h-4 mt-6 bg-gradient-to-b from-black/25 via-black/10 to-transparent rounded-b-xl" />
          </div>
        </div>
      </section>

      {/* Themes Custom Vibe Previewer */}
      <section id="themes" className="py-28 px-4 sm:px-6 lg:px-8 bg-lavender-light/15 border-t border-beige/35">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4 italic">
              Themes That Mirror Your Vibe
            </h2>
            <p className="text-ink-muted text-sm sm:text-base max-w-md mx-auto font-sans">
              Dress your memories. Select any custom aesthetic palette below to preview it on the journal cover above.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {themes.map((theme, i) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ThemeCard
                  theme={theme}
                  selected={selectedPreviewTheme.id === theme.id}
                  onClick={() => {
                    setSelectedPreviewTheme(theme)
                    // Scroll up to Hero for immediate viewing
                    document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center paper-sheet rounded-[36px] p-12 sm:p-20 border border-beige/40 shadow-polaroid relative overflow-hidden"
        >
          {/* Subtle decorations */}
          <div className="absolute top-0 left-0 w-20 h-1 bg-pink-accent" />
          <div className="absolute top-4 left-6 washi-tape w-20 h-5 opacity-80" />

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-5 italic">
            Begin Your Scrapbook Journey
          </h2>
          <p className="text-ink-muted text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed font-sans">
            Invite loved ones, pin polaroid sheets, write heartfelt stories, and watch your bookshelf populate with beautiful memories.
          </p>
          <Button size="lg" onClick={() => navigate('/signup')} className="group">
            <span>Open Your First Volume</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>


      <footer className="py-10 text-center text-ink-muted text-xs sm:text-sm border-t border-beige/35">
        <p>© 2026 ScrapBook. Built with 💖 for digital memory curators.</p>
      </footer>
    </div>
  )
}
