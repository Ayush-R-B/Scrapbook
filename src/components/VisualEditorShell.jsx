import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from './ui/Button'

export default function VisualEditorShell({
  isOpen,
  onClose,
  title,
  onSave,
  saveLabel = 'Save',
  saveDisabled = false,
  children,
}) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-cream-dark/30"
        >
          {/* Subtle glow background blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-soft-pink/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lavender/10 rounded-full blur-3xl" />
          </div>

          {/* Sticky Editor Header */}
          <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-beige/40 bg-paper/85 backdrop-blur-md shadow-sm">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-ink-muted hover:text-pink-accent transition-colors cursor-pointer px-3 py-1.5 rounded-xl hover:bg-cream-dark/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cancel</span>
            </button>
            
            <h2 className="font-display text-base sm:text-lg font-bold text-ink italic absolute left-1/2 -translate-x-1/2 leading-tight">
              {title}
            </h2>
            
            <Button size="sm" onClick={onSave} disabled={saveDisabled}>
              {saveLabel}
            </Button>
          </header>

          {/* Editor Workspace Content */}
          <div className="relative z-10 flex-1 overflow-y-auto py-6 sm:py-10 px-4">
            
            {/* Scrapbook Notebook Container representation */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-12 items-stretch paper-sheet rounded-[28px] border border-beige/65 shadow-[0_20px_40px_rgba(50,38,31,0.18)] overflow-hidden min-h-[500px]">
              
              {/* Binder spiral rings column decorative on large viewports */}
              <div className="hidden md:flex md:col-span-1 border-r border-beige/45 bg-cream/50 flex-col items-center justify-around py-8 relative">
                {/* Simulated brass spiral binder loops */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative w-full flex justify-end pr-2.5">
                    {/* Brass Ring loop */}
                    <div className="w-9 h-5 rounded-full border-t-4 border-b-4 border-l-4 border-gold/75 bg-transparent rotate-12 shadow-sm" />
                    {/* Ring hole reflection */}
                    <div className="absolute right-1 top-1 w-2.5 h-2.5 rounded-full bg-stone-800/30 shadow-inner" />
                  </div>
                ))}
              </div>

              {/* Lined Notebook Paper sheet where user inputs sit */}
              <div className="col-span-12 md:col-span-11 p-5 sm:p-8 md:p-10 notebook-paper-lined">
                {children}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
