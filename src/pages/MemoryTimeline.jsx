import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Calendar, Smile } from 'lucide-react'
import Navbar from '../components/Navbar'
import MemoryCard from '../components/MemoryCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import AddMemoryModal from '../components/AddMemoryModal'
import { useApp } from '../context/AppContext'
import { moods } from '../data/mockData'

export default function MemoryTimeline() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { books, addMemory, getBookMemories } = useApp()
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [selectedMood, setSelectedMood] = useState('all')

  const book = books.find((b) => b.id === bookId)
  const bookMemories = getBookMemories(bookId)

  if (!book) {
    return (
      <div className="min-h-screen paper-texture flex items-center justify-center">
        <div className="text-center paper-sheet p-8 rounded-3xl border border-beige/40 max-w-sm">
          <p className="text-ink-muted mb-4">Scrapbook volume could not be found.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Bookshelf</Button>
        </div>
      </div>
    )
  }

  // Filter memories in real time by mood selection
  const filteredMemories = bookMemories.filter((m) => {
    return selectedMood === 'all' || m.mood === selectedMood
  })

  return (
    <div className="min-h-screen paper-texture">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link
            to={`/books/${bookId}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-accent hover:underline mb-4 font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {book.title}
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink italic leading-tight mb-2.5">
            Memory Timeline
          </h1>
          <p className="text-ink-muted text-sm sm:text-base font-sans">
            {bookMemories.length} captured moments inside this volume.
          </p>
          
          <Button onClick={() => setShowAddMemory(true)} size="sm" className="mt-6">
            <Plus className="w-4 h-4" /> Add Moment
          </Button>
        </motion.div>

        {/* Real-time Mood Filter Tabs */}
        {bookMemories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 mb-12 font-sans"
          >
            <span className="text-[9px] uppercase font-bold tracking-widest text-ink-muted flex items-center gap-1 mb-1">
              <Smile className="w-3 h-3" /> Filter by Mood
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-cream-dark/25 p-1.5 rounded-xl border border-beige/85">
              <button
                onClick={() => setSelectedMood('all')}
                className={`
                  px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200
                  ${selectedMood === 'all'
                    ? 'bg-paper text-ink shadow-sm border border-beige/65'
                    : 'text-ink-muted hover:text-ink'
                  }
                `}
              >
                ✨ All Vibes
              </button>
              {moods.map((m) => {
                const count = bookMemories.filter((mem) => mem.mood === m.id).length
                if (count === 0) return null // Hide moods that have no memories in this book
                
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 flex items-center gap-1.5
                      ${selectedMood === m.id
                        ? 'bg-paper text-ink shadow-sm border border-beige/65'
                        : 'text-ink-muted hover:text-ink'
                      }
                    `}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                    <span className="text-[9px] px-1.5 py-0.25 rounded-md bg-cream-dark/65 opacity-70 font-sans">{count}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Timeline Grid render */}
        {bookMemories.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Timeline is empty"
            description="Preserve your thoughts, images, and milestones. Add your first memory page."
            actionLabel="Add Memory"
            onAction={() => setShowAddMemory(true)}
          />
        ) : filteredMemories.length === 0 ? (
          <div className="text-center py-16 paper-sheet rounded-3xl border border-beige/40 flex flex-col items-center">
            <span className="text-4xl mb-4 select-none">🔍</span>
            <p className="text-ink-muted text-sm sm:text-base font-semibold">No memories match this mood filter.</p>
            <Button onClick={() => setSelectedMood('all')} variant="secondary" size="sm" className="mt-4">Reset Filter</Button>
          </div>
        ) : (
          <div className="relative">
            {/* Elegant vertical trace line with dashed stitch background */}
            <div className="absolute left-1/2 top-4 bottom-8 w-[2px] stitch-line hidden sm:block -translate-x-1/2 opacity-60" />

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredMemories.map((memory, i) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    layout
                  >
                    <MemoryCard memory={memory} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-10"
            >
              <span className="text-2.5xl select-none">✨</span>
              <p className="font-handwritten text-2xl font-bold text-ink-muted/80 mt-2 select-none">The scrapbook chapter continues...</p>
            </motion.div>
          </div>
        )}
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
