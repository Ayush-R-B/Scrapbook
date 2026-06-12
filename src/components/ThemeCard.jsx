import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ThemeCard({ theme, selected, onClick, compact = false }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer text-left w-full
        transition-all duration-200 outline-none
        ${compact ? 'h-20' : 'h-28'}
        ${selected
          ? 'border border-pink-accent/50 shadow-md scale-102'
          : 'border border-beige/85 shadow-sm hover:shadow-md'
        }
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
      
      {/* Theme pattern overlay decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: theme.pattern === 'floral'
            ? 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.45) 0%, transparent 50%)'
            : theme.pattern === 'stars'
            ? 'radial-gradient(1.5px 1.5px at 15% 25%, white 50%, transparent 50%), radial-gradient(2px 2px at 70% 65%, white 50%, transparent 50%)'
            : theme.pattern === 'water'
            ? 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 80%)'
            : 'none',
        }}
      />
      
      {/* Spine highlight detail inside card to look like a mini book */}
      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/15 to-transparent z-10" />

      <div className="relative z-10 flex flex-col justify-end h-full p-4">
        <span className={`font-display font-bold tracking-tight text-sm ${theme.pattern === 'stars' ? 'text-white' : 'text-ink'}`}>
          {theme.name}
        </span>
        <div className="flex gap-1.5 mt-2">
          {theme.colors.map((c, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
      
      {selected && (
        <>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-4 bg-paper/60 border-l border-r border-dashed border-black/8 shadow-sm rotate-[-3deg] z-20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 bg-pink-accent rounded-full flex items-center justify-center text-white shadow-sm border border-white/20 z-20">
            <Check className="w-3 h-3" />
          </div>
        </>
      )}
    </motion.button>
  )
}
