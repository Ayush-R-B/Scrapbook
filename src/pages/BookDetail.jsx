import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Users, Edit3, ArrowLeft, Eye, MessageSquare, Plus, Palette } from 'lucide-react'
import Navbar from '../components/Navbar'
import Button from '../components/ui/Button'
import ThemeCard from '../components/ThemeCard'
import AddMemoryModal from '../components/AddMemoryModal'
import { useApp } from '../context/AppContext'
import { getThemeById, getUserById, activityFeed } from '../data/mockData'

export default function BookDetail() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { books, addMemory, getBookMemories } = useApp()
  const [showAddMemory, setShowAddMemory] = useState(false)

  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="min-h-screen paper-texture flex items-center justify-center">
        <div className="text-center paper-sheet p-8 rounded-3xl border border-beige/40 max-w-sm">
          <p className="text-ink-muted mb-4 font-medium">This scrapbook volume could not be found.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Bookshelf</Button>
        </div>
      </div>
    )
  }

  const theme = getThemeById(book.themeId)
  const owner = getUserById(book.ownerId)
  const collaborators = book.collaboratorIds.map(getUserById).filter(Boolean)
  const bookMemories = getBookMemories(bookId)

  return (
    <div className="min-h-screen paper-texture">
      <Navbar />

      {/* Hero Banner Cover */}
      <section className="relative pt-16">
        <div className="h-56 sm:h-72 lg:h-80 overflow-hidden relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover blur-sm scale-105 opacity-80"
          />
          {/* Radial visual overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/35 to-black/20" />
        </div>

        {/* Detailed Info Card */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="paper-sheet rounded-[32px] p-6 sm:p-8 border border-beige/40 shadow-polaroid relative paper-clip"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Floating Book mockup */}
              <div className="w-28 h-40 sm:w-34 sm:h-48 rounded-r-xl rounded-l-sm overflow-hidden shadow-book flex-shrink-0 -mt-20 sm:-mt-24 border-4 border-white border-l-8 border-l-warm-brown mx-auto md:mx-0 z-20 relative">
                <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-black/25" />
                {/* Gold corners */}
                <div className="absolute left-0 top-0 w-2 h-2 border-t border-l border-gold/80 rounded-tl-xs" />
                <div className="absolute left-0 bottom-0 w-2 h-2 border-b border-l border-gold/80 rounded-bl-xs" />
                <div className="absolute right-0 top-0 w-2 h-2 border-t border-r border-gold/80 rounded-tr-xs" />
                <div className="absolute right-0 bottom-0 w-2 h-2 border-b border-r border-gold/80 rounded-br-xs" />
              </div>

              <div className="flex-1 text-center md:text-left space-y-4 font-sans">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-sm bg-cream-dark/40 text-[9px] font-bold uppercase tracking-widest text-ink border border-beige/65">
                    {book.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-sm bg-soft-pink/15 text-[9px] font-bold uppercase tracking-widest text-pink-accent border border-pink-accent/25 flex items-center gap-1">
                    <Palette className="w-3 h-3" /> {theme.name}
                  </span>
                </div>

                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink italic leading-none">
                    {book.title}
                  </h1>
                  <p className="text-ink-muted text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-sans">{book.description}</p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2.5 text-[10px] text-brown-light font-bold uppercase tracking-widest">
                  <span>{book.memoryCount} moments</span>
                  <span>·</span>
                  <span>Created {new Date(book.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-3 justify-center md:justify-start">
                  <Button onClick={() => setShowAddMemory(true)} size="sm">
                    <Plus className="w-4 h-4" /> Add Moment
                  </Button>
                  <Link to={`/books/${bookId}/timeline`}>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> View Timeline
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4" /> Edit Book
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Contents Grid */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Activity Feed & Theme */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Active Swatch */}
          <div className="paper-sheet rounded-2xl p-5 border border-beige/45 shadow-sm space-y-3 font-sans">
            <h3 className="font-display font-bold text-ink text-base italic pl-0.5">Selected Theme</h3>
            <ThemeCard theme={theme} selected compact onClick={() => {}} />
          </div>

          {/* Collaborator stacking and activities */}
          {book.isShared && (
            <div className="paper-sheet rounded-2xl p-5 border border-beige/45 shadow-sm space-y-5 font-sans">
              <div className="flex items-center justify-between border-b border-beige/35 pb-3">
                <div>
                  <h3 className="font-display font-bold text-ink text-base italic leading-tight">Shared Album</h3>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-ink-muted mt-1">Owned by {owner?.name.split(' ')[0]}</p>
                </div>
                <Button variant="outline" size="sm" className="h-6.5 text-[10px] px-2 rounded-lg">+ Invite</Button>
              </div>

              {/* Stacked Avatars */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted">Members:</span>
                <div className="flex -space-x-2 overflow-hidden">
                  {collaborators.map((c) => (
                    <img
                      key={c.id}
                      src={c.avatar}
                      alt={c.name}
                      title={c.name}
                      className="inline-block w-8 h-8 rounded-full ring-2 ring-white object-cover border border-beige/40 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Live activity log */}
              <div className="space-y-3 pt-1">
                <h4 className="font-display font-bold text-ink text-sm italic mb-2">Shared Activity</h4>
                <div className="space-y-3.5 relative pl-3.5 border-l border-beige/60">
                  {activityFeed.slice(0, 3).map((item) => {
                    const activityUser = getUserById(item.userId)
                    return (
                      <div key={item.id} className="text-xs relative">
                        <div className="absolute -left-[19px] top-1.5 w-1.5 h-1.5 rounded-full bg-pink-accent/80 border border-white" />
                        <p className="text-ink-muted leading-tight font-sans">
                          <span className="font-bold text-ink">{activityUser?.name.split(' ')[0]}</span>{' '}
                          {item.action}{' '}
                          <span className="font-semibold text-ink">"{item.target.split(' ').slice(0, 2).join(' ')}..."</span>
                        </p>
                        <span className="text-[9px] text-brown-light/85 mt-1 block">{item.time}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Recent Scrapbook Polaroid Pages */}
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-beige/40 pb-3.5">
            <h2 className="font-display text-2xl font-bold text-ink italic leading-tight">Recent Scrapbook Pages</h2>
            <Link to={`/books/${bookId}/timeline`} className="text-[10px] font-bold uppercase tracking-wider text-pink-accent hover:underline flex items-center gap-0.5 font-sans">
              Open Timeline →
            </Link>
          </div>

          {bookMemories.length === 0 ? (
            <div className="text-center py-20 paper-sheet rounded-[32px] border border-beige/45 flex flex-col items-center relative overflow-hidden">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none opacity-80" />
              <span className="text-4xl mb-4 select-none">📸</span>
              <p className="text-ink-muted text-sm sm:text-base mb-6 font-bold font-display italic">No moments captured in this volume yet.</p>
              <Button onClick={() => setShowAddMemory(true)} size="sm">Add First Memory</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {bookMemories.slice(0, 4).map((memory, index) => {
                const rotation = index % 2 === 0 ? -1.2 : 1.2
                return (
                  <motion.div
                    key={memory.id}
                    whileHover={{ y: -6, rotate: rotation * 0.5, scale: 1.01 }}
                    className="polaroid-frame p-3 pb-8 rounded-sm shadow-polaroid relative overflow-hidden"
                    style={{ rotate: `${rotation}deg` }}
                  >
                    {/* Washi tape decoration */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4.5 washi-tape pointer-events-none opacity-80 z-20 rotate-[1.5deg]" />

                    {memory.images?.[0] && (
                      <div className="aspect-square overflow-hidden rounded-xs border border-beige/25">
                        <img src={memory.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="pt-4 font-sans">
                      <div className="flex items-center gap-1.5 text-[9px] text-brown-light/80 font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        <time>{new Date(memory.date).toLocaleDateString()}</time>
                      </div>
                      <h3 className="font-display font-bold text-ink text-lg line-clamp-1 italic leading-tight mt-1.5">
                        {memory.title}
                      </h3>
                      <p className="text-ink-muted text-xs line-clamp-2 mt-2 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

      </main>

      <AddMemoryModal
        isOpen={showAddMemory}
        onClose={() => setShowAddMemory(false)}
        onSave={addMemory}
        bookId={bookId}
      />
    </div>
  )
}
