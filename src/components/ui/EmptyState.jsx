import { motion } from 'framer-motion'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6 paper-sheet rounded-[32px] border border-beige/40 shadow-sm relative overflow-hidden"
    >
      {/* Washi tape decoration */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none opacity-70 z-10" />

      <div className="w-14 h-14 rounded-full bg-cream-dark/40 flex items-center justify-center mb-5 text-pink-accent shadow-[inset_0_1.5px_3px_rgba(50,38,31,0.05)] border border-beige/20">
        {Icon ? (
          typeof Icon === 'string' ? (
            <span className="text-2xl">{Icon}</span>
          ) : (
            <Icon className="w-6 h-6 opacity-85" />
          )
        ) : (
          <span className="text-2xl">📔</span>
        )}
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink italic mb-2">{title}</h3>
      <p className="text-ink-muted text-xs sm:text-sm max-w-xs mb-6 leading-relaxed font-sans">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">{actionLabel}</Button>
      )}
    </motion.div>
  )
}
