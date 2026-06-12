import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import MoodBadge from './MoodBadge'

export default function MemoryCard({ memory, index = 0 }) {
  const isLeft = index % 2 === 0
  const rotationDegrees = index % 2 === 0 ? -1.5 : 1.5

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -45 : 45, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative flex w-full mb-16 sm:mb-20
        ${isLeft ? 'justify-start' : 'justify-end'}
      `}
    >
      <div className={`w-full max-w-lg ${isLeft ? 'pr-6 sm:pr-20' : 'pl-6 sm:pl-20'}`}>
        <motion.div
          whileHover={{ y: -6, rotate: rotationDegrees * 0.5, scale: 1.015 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative polaroid-frame p-4 pb-8 rounded-sm flex flex-col"
          style={{ rotate: `${rotationDegrees}deg` }}
        >
          {/* Polaroid Washi Tape Accent */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape z-20 pointer-events-none rotate-[2deg] opacity-80" />

          {/* Polaroid Image Box */}
          {memory.images?.length > 0 && (
            <div className={`grid gap-2 rounded-xs overflow-hidden border border-beige/30 ${memory.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {memory.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-cream-dark/20 relative group">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-750"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Polaroid Caption Info */}
          <div className="pt-5 pb-2 flex flex-col flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-beige/30 font-sans">
              <div className="font-handwritten text-lg font-bold text-pink-accent/90 border border-pink-accent/15 px-2 py-0.5 rounded rotate-[-2.5deg] bg-pink-accent/5 shadow-[0_1px_3px_rgba(219,118,126,0.05)] select-none">
                {new Date(memory.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <MoodBadge moodId={memory.mood} size="sm" />
            </div>

            <h3 className="font-display text-2xl font-bold text-ink italic leading-tight mb-2.5">
              {memory.title}
            </h3>
            
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-sans mt-1">
              {memory.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timeline Bullet Node with Hover Glows */}
      <div
        className={`
          absolute top-10 w-4 h-4 rounded-full bg-pink-accent border-4 border-cream
          shadow-md z-20 hidden sm:block transition-all duration-300
          hover:scale-130 hover:bg-pink-accent hover:shadow-pink-accent/50
          ${isLeft ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}
        `}
      />
    </motion.div>
  )
}
