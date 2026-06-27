import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ThemeCard({ theme, selected, onClick, compact = false }) {
  const cardRotation = selected ? 0 : (theme.id.charCodeAt(0) % 2 === 0 ? -1 : 1)

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -4, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer text-left w-full
        transition-all duration-300 outline-none
        ${compact ? 'h-20' : 'h-32'}
        ${selected
          ? 'border-2 border-pink-accent/50 shadow-card-hover scale-102'
          : 'border border-beige/70 shadow-card hover:shadow-card-hover'
        }
      `}
      style={{ rotate: `${cardRotation * 0.8}deg` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />

      <div className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: theme.pattern === 'floral'
            ? 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.5) 0%, transparent 50%)'
            : theme.pattern === 'stars'
            ? 'radial-gradient(1.5px 1.5px at 15% 25%, white 50%, transparent 50%), radial-gradient(2px 2px at 70% 65%, white 50%, transparent 50%)'
            : theme.pattern === 'water'
            ? 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 80%)'
            : 'none',
        }}
      />

      <div className="absolute left-0 top-0 bottom-0 w-[7px] bg-gradient-to-r from-black/18 to-transparent z-10" />

      <div className="relative z-10 flex flex-col justify-end h-full p-4">
        <span className={`font-display font-semibold tracking-tight text-sm ${theme.pattern === 'stars' ? 'text-white' : 'text-ink'}`}>
          {theme.name}
        </span>
        <div className="flex gap-1.5 mt-2.5">
          {theme.colors.map((c, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      {selected && (
        <>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 washi-tape-accent z-20 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-pink-accent rounded-full flex items-center justify-center text-paper shadow-sm border border-paper/30 z-20">
            <Check className="w-3 h-3" />
          </div>
        </>
      )}
    </motion.button>
  )
}
