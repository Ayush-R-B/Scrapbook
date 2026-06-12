import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Book } from 'lucide-react'
import { getThemeById } from '../data/mockData'

export default function BookCard({ book, index = 0, shelf = false }) {
  const theme = getThemeById(book.themeId)

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: shelf ? (index % 2 === 0 ? -0.5 : 0.5) : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -16,
        rotateY: -15,
        rotate: 0,
        z: 15,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className="group cursor-pointer perspective-[1000px] font-sans"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={`
          relative rounded-r-xl rounded-l shadow-book
          transition-all duration-300 overflow-hidden
          group-hover:shadow-[18px_24px_38px_rgba(50,38,31,0.3)]
          ${shelf ? 'w-full aspect-[3/4.2]' : 'w-full aspect-[3/4.2] max-w-[180px]'}
        `}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Book Spine Highlight Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-gradient-to-r from-black/25 via-white/5 to-transparent z-10" />
        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-black/15 z-10" />
        
        {/* Paper pages edges line at the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-beige/40 z-10" />

        {/* Gold corners */}
        <div className="absolute left-0 top-0 w-2 h-2 border-t border-l border-gold/70 rounded-tl-xs z-10" />
        <div className="absolute left-0 bottom-0 w-2 h-2 border-b border-l border-gold/70 rounded-bl-xs z-10" />
        <div className="absolute right-0 top-0 w-2 h-2 border-t border-r border-gold/70 rounded-tr-xs z-10" />
        <div className="absolute right-0 bottom-0 w-2 h-2 border-b border-r border-gold/70 rounded-br-xs z-10" />

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Collaborators / Shared Badge */}
        <div className="absolute top-2.5 right-2.5 z-20">
          {book.isShared ? (
            <span className="flex items-center gap-1 bg-paper/95 text-ink text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-xs shadow-sm border border-beige/45">
              <Users className="w-2.5 h-2.5 text-pink-accent" />
              <span>Shared</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-paper/95 text-ink text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-xs shadow-sm border border-beige/45">
              <Book className="w-2.5 h-2.5 text-brown-light" />
              <span>Personal</span>
            </span>
          )}
        </div>

        {/* Text inside the book cover */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 z-20 flex flex-col justify-end">
          <p className="font-display font-bold text-white text-sm sm:text-base leading-tight line-clamp-2 drop-shadow-md group-hover:text-pink-accent/20 transition-colors italic">
            {book.title}
          </p>
          <div className="flex items-center gap-1 mt-1 opacity-90">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors[0] }} />
            <span className="text-[9px] text-white/90 font-bold tracking-widest uppercase">
              {theme.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 px-0.5">
        <h3 className="font-display font-bold text-ink text-base line-clamp-1 group-hover:text-pink-accent transition-colors italic">
          {book.title}
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-ink-muted mt-1">
          {book.memoryCount} moments · <span className="capitalize">{book.type}</span>
        </p>
      </div>
    </motion.div>
  )

  return <Link to={`/books/${book.id}`}>{content}</Link>
}
