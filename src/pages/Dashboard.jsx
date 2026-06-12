import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Activity, Plus, Heart, User, Flame, FolderOpen, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import SearchBar from '../components/ui/SearchBar'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import CreateBookModal from '../components/CreateBookModal'
import { useApp } from '../context/AppContext'
import { activityFeed, getUserById } from '../data/mockData'

const filters = [
  { id: 'all', label: 'All Books' },
  { id: 'personal', label: 'Personal' },
  { id: 'shared', label: 'Shared' },
]

export default function Dashboard() {
  const { books, addBook, user } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'personal' && !book.isShared) ||
      (filter === 'shared' && book.isShared)
    return matchesSearch && matchesFilter
  })

  // Calculate stats dynamically based on actual state
  const personalCount = books.filter((b) => !b.isShared).length
  const sharedCount = books.filter((b) => b.isShared).length
  const totalMemories = books.reduce((acc, curr) => acc + (curr.memoryCount || 0), 0)

  return (
    <div className="min-h-screen paper-texture">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-beige/45 pb-6"
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink italic leading-none">
              Welcome back, {user?.name || 'Memory Keeper'}
            </h1>
            <p className="text-ink-muted text-sm sm:text-base mt-2 font-sans">
              Your personal bookshelf is waiting. What chapter will you write next?
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="sm:self-end">
            <Plus className="w-4.5 h-4.5" /> New Volume
          </Button>
        </motion.div>

        {/* Dashboard Panels Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Metrics & Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* User Profile Card */}
            <div className="paper-sheet rounded-2xl p-6 border border-beige/45 shadow-sm relative overflow-hidden paper-clip">
              <div className="absolute top-0 right-0 w-24 h-24 bg-soft-pink/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'}
                  alt=""
                  className="w-13 h-13 rounded-full object-cover ring-2 ring-pink-accent/30 shadow-sm"
                />
                <div>
                  <h3 className="font-display font-bold text-ink text-lg italic leading-tight">{user?.name}</h3>
                  <p className="text-xs text-ink-muted font-sans mt-0.5">{user?.email}</p>
                </div>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-3 gap-3.5 border-t border-beige/35 pt-5">
                <div className="text-center p-2 rounded-xl bg-cream-dark/20 border border-beige/30">
                  <span className="block text-xl font-display font-bold text-ink">{books.length}</span>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-widest font-sans">Volumes</span>
                </div>
                <div className="text-center p-2 rounded-xl bg-cream-dark/20 border border-beige/30">
                  <span className="block text-xl font-display font-bold text-ink">{totalMemories}</span>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-widest font-sans">Moments</span>
                </div>
                <div className="text-center p-2 rounded-xl bg-cream-dark/20 border border-beige/30">
                  <span className="block text-xl font-display font-bold text-ink">{sharedCount}</span>
                  <span className="text-[9px] uppercase font-bold text-ink-muted tracking-widest font-sans">Shared</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Widget */}
            <div className="paper-sheet rounded-2xl p-6 border border-beige/45 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-ink text-base flex items-center gap-2 italic">
                <Flame className="w-4.5 h-4.5 text-pink-accent" /> Memory Stats
              </h3>
              
              <div className="space-y-3 font-sans">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted font-medium">Personal volumes:</span>
                  <span className="font-bold text-ink">{personalCount}</span>
                </div>
                <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden border border-beige/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                  <div
                    className="bg-brown-light h-1.5 rounded-full"
                    style={{ width: `${(personalCount / Math.max(books.length, 1)) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-ink-muted font-medium">Shared albums:</span>
                  <span className="font-bold text-ink">{sharedCount}</span>
                </div>
                <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden border border-beige/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                  <div
                    className="bg-pink-accent h-1.5 rounded-full"
                    style={{ width: `${(sharedCount / Math.max(books.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Live Activity Feed */}
            <div className="paper-sheet rounded-2xl p-6 border border-beige/45 shadow-sm">
              <h3 className="font-display font-bold text-ink text-base flex items-center gap-2 mb-5 italic">
                <Activity className="w-4.5 h-4.5 text-pink-accent" /> Recent Activity
              </h3>
              
              <div className="space-y-4 relative pl-3.5 border-l border-beige/50 font-sans">
                {activityFeed.map((item) => {
                  const activityUser = getUserById(item.userId)
                  return (
                    <div key={item.id} className="relative text-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-pink-accent/80 border border-white shadow-sm" />
                      
                      <div className="flex items-start gap-2.5">
                        <img
                          src={activityUser?.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover shadow-sm border border-beige/40"
                        />
                        <div className="flex-1">
                          <p className="text-ink-muted leading-tight">
                            <span className="font-bold text-ink">{activityUser?.name.split(' ')[0]}</span>{' '}
                            {item.action}{' '}
                            <span className="font-semibold text-ink italic">"{item.target}"</span>
                          </p>
                          <span className="text-[10px] text-brown-light/80 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive Shelf & Filters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Search and Tab Filters row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between font-sans">
              <SearchBar value={search} onChange={setSearch} className="flex-1 max-w-sm" />
              
              <div className="flex bg-cream-dark/35 p-1 rounded-xl border border-beige/85 self-start sm:self-auto gap-1 relative">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`
                      px-4.5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative z-10
                      ${filter === f.id
                        ? 'text-ink'
                        : 'text-ink-muted hover:text-ink'
                      }
                    `}
                  >
                    {/* Sliding selection background */}
                    {filter === f.id && (
                      <motion.div
                        layoutId="activeFilterTab"
                        className="absolute inset-0 bg-paper border border-beige/65 rounded-lg shadow-sm -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wooden Shelf Render container */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty-dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState
                    icon={FolderOpen}
                    title="No scrapbooks found"
                    description={search ? "We couldn't find any volumes matching your query. Try searching for a different title." : "Let's begin writing your story. Open your first digital volume to begin the collection."}
                    actionLabel="Create New Book"
                    onAction={() => setShowCreate(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="shelf-dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bookshelf-wood rounded-[32px] p-6 sm:p-10 pt-12"
                >
                  {/* Spotlight shadow glow overlay */}
                  <div className="absolute inset-0 bookshelf-highlight pointer-events-none rounded-[32px]" />

                  {/* Responsive book grid placement */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 items-end relative z-10">
                    {filtered.map((book, i) => (
                      <BookCard key={book.id} book={book} index={i} shelf />
                    ))}
                  </div>

                  {/* Shelf reflection plank border */}
                  <div className="h-4 mt-6 bg-gradient-to-b from-black/25 via-black/10 to-transparent rounded-b-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <CreateBookModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={addBook}
      />
    </div>
  )
}
