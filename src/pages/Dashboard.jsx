import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Activity, Plus, Flame, FolderOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import SearchBar from '../components/ui/SearchBar'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import CreateBookModal from '../components/CreateBookModal'
import { useApp } from '../context/AppContext'
import { activityFeed, getUserById } from '../data/mockData'

const filters = [
  { id: 'all', label: 'Every Volume' },
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

  const personalCount = books.filter((b) => !b.isShared).length
  const sharedCount = books.filter((b) => b.isShared).length
  const totalMemories = books.reduce((acc, curr) => acc + (curr.memoryCount || 0), 0)

  return (
    <div className="min-h-screen paper-texture">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-beige/40 pb-8"
        >
          <div className="page-marker pl-4">
            <p className="font-handwritten text-xl text-pink-accent/70 mb-2">welcome home</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-none">
              Hello, {user?.name?.split(' ')[0] || 'Memory Keeper'}
            </h1>
            <p className="text-ink-muted text-sm sm:text-base mt-3 font-sans max-w-md">
              Your bookshelf is waiting. Which chapter will you open today?
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="sm:self-end">
            <Plus className="w-4 h-4" /> New Volume
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-4 space-y-7"
          >
            <div className="scrapbook-card rounded-2xl p-7 border border-beige/40 relative overflow-hidden paper-clip" style={{ rotate: '-0.4deg' }}>
              <div className="absolute top-0 right-0 w-28 h-28 bg-soft-pink/8 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-7">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-pink-accent/25 shadow-sm"
                />
                <div>
                  <h3 className="font-display font-semibold text-ink text-lg leading-tight">{user?.name}</h3>
                  <p className="text-xs text-ink-muted font-sans mt-1">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-beige/30 pt-6">
                <div className="text-center p-3 rounded-xl bg-cream-dark/30 border border-beige/25">
                  <span className="block text-2xl font-display font-semibold text-ink">{books.length}</span>
                  <span className="text-[9px] uppercase font-semibold text-ink-muted tracking-[0.15em] font-sans">Volumes</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-cream-dark/30 border border-beige/25">
                  <span className="block text-2xl font-display font-semibold text-ink">{totalMemories}</span>
                  <span className="text-[9px] uppercase font-semibold text-ink-muted tracking-[0.15em] font-sans">Moments</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-cream-dark/30 border border-beige/25">
                  <span className="block text-2xl font-display font-semibold text-ink">{sharedCount}</span>
                  <span className="text-[9px] uppercase font-semibold text-ink-muted tracking-[0.15em] font-sans">Shared</span>
                </div>
              </div>
            </div>

            <div className="scrapbook-card rounded-2xl p-7 border border-beige/40 space-y-5" style={{ rotate: '0.3deg' }}>
              <h3 className="font-display font-semibold text-ink text-base flex items-center gap-2">
                <Flame className="w-4 h-4 text-pink-accent" /> Your Story So Far
              </h3>

              <div className="space-y-4 font-sans">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted font-medium">Personal volumes</span>
                  <span className="font-semibold text-ink">{personalCount}</span>
                </div>
                <div className="w-full bg-cream rounded-full h-2 overflow-hidden border border-beige/20 shadow-inner-sm">
                  <div
                    className="bg-brown-light h-2 rounded-full transition-all duration-700"
                    style={{ width: `${(personalCount / Math.max(books.length, 1)) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-ink-muted font-medium">Shared stories</span>
                  <span className="font-semibold text-ink">{sharedCount}</span>
                </div>
                <div className="w-full bg-cream rounded-full h-2 overflow-hidden border border-beige/20 shadow-inner-sm">
                  <div
                    className="bg-pink-accent h-2 rounded-full transition-all duration-700"
                    style={{ width: `${(sharedCount / Math.max(books.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="scrapbook-card rounded-2xl p-7 border border-beige/40" style={{ rotate: '-0.2deg' }}>
              <h3 className="font-display font-semibold text-ink text-base flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-pink-accent" /> Latest from Your Pages
              </h3>

              <div className="space-y-5 relative pl-4 border-l border-beige/45 font-sans">
                {activityFeed.map((item) => {
                  const activityUser = getUserById(item.userId)
                  return (
                    <div key={item.id} className="relative text-xs">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-pink-accent/75 border-2 border-paper shadow-sm" />

                      <div className="flex items-start gap-3">
                        <img
                          src={activityUser?.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover shadow-sm border border-beige/35"
                        />
                        <div className="flex-1">
                          <p className="text-ink-muted leading-relaxed">
                            <span className="font-semibold text-ink">{activityUser?.name.split(' ')[0]}</span>{' '}
                            {item.action}{' '}
                            <span className="font-medium text-ink italic">"{item.target}"</span>
                          </p>
                          <span className="font-handwritten text-sm text-brown-light/80 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-8 space-y-7"
          >
            <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center justify-between font-sans">
              <SearchBar value={search} onChange={setSearch} className="flex-1 max-w-sm" />

              <div className="flex bg-cream-dark/40 p-1.5 rounded-xl border border-beige/70 self-start sm:self-auto gap-1 relative">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`
                      px-5 py-2.5 rounded-lg text-[10px] font-semibold tracking-[0.15em] uppercase transition-all cursor-pointer relative z-10
                      ${filter === f.id ? 'text-ink' : 'text-ink-muted hover:text-ink'}
                    `}
                  >
                    {filter === f.id && (
                      <motion.div
                        layoutId="activeFilterTab"
                        className="absolute inset-0 bg-paper-warm border border-beige/60 rounded-lg shadow-sm -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

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
                    title="No volumes found"
                    description={search ? "We couldn't find a volume matching your search. Try a different title — every story has a name." : "Your bookshelf is ready for its first volume. Open a new scrapbook and begin preserving the moments that matter."}
                    actionLabel="Create New Volume"
                    onAction={() => setShowCreate(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="shelf-dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="bookshelf-wood rounded-[36px] p-8 sm:p-12 pt-14 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bookshelf-highlight pointer-events-none rounded-[36px]" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-7 sm:gap-10 items-end relative z-10">
                    {filtered.map((book, i) => (
                      <BookCard key={book.id} book={book} index={i} shelf />
                    ))}
                  </div>

                  <div className="h-5 mt-8 bg-gradient-to-b from-black/30 via-black/12 to-transparent rounded-b-2xl" />
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
