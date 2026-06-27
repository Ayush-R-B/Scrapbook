import { motion } from 'framer-motion'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-20 px-8 scrapbook-card rounded-[36px] relative overflow-hidden"
      style={{ rotate: '-0.5deg' }}
    >
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-accent pointer-events-none opacity-75 z-10" />
      <div className="absolute bottom-4 right-6 font-handwritten text-lg text-ink-muted/30 rotate-[-8deg] select-none pointer-events-none">
        empty page
      </div>

      <div className="w-16 h-16 rounded-full bg-cream-dark/50 flex items-center justify-center mb-6 text-pink-accent shadow-inner-sm border border-beige/30">
        {Icon ? (
          typeof Icon === 'string' ? (
            <span className="text-3xl">{Icon}</span>
          ) : (
            <Icon className="w-7 h-7 opacity-80" />
          )
        ) : (
          <span className="text-3xl">📔</span>
        )}
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-3 leading-tight">{title}</h3>
      <p className="text-ink-muted text-sm sm:text-base max-w-sm mb-8 leading-relaxed font-sans">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">{actionLabel}</Button>
      )}
    </motion.div>
  )
}
