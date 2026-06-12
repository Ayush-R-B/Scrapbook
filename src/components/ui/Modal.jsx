import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className={`
              relative w-full ${sizeClasses[size]}
              paper-sheet rounded-[32px] border border-beige shadow-[0_25px_50px_-12px_rgba(50,38,31,0.22)]
              max-h-[90vh] overflow-y-auto
            `}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4.5 border-b border-beige/45 bg-paper/95 backdrop-blur-sm rounded-t-[32px]">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ink italic leading-tight">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-dark/50 text-ink-muted hover:text-ink transition-colors cursor-pointer font-bold text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
