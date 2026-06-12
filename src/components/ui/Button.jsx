import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-pink-accent text-white shadow-[0_4px_12px_rgba(219,118,126,0.25)] hover:shadow-[0_8px_20px_rgba(219,118,126,0.4)] hover:bg-pink-accent/90 focus-visible:ring-2 focus-visible:ring-pink-accent/50 outline-none border border-pink-accent/20',
  secondary: 'bg-paper text-ink border border-beige/95 hover:bg-cream-dark/30 shadow-sm focus-visible:ring-2 focus-visible:ring-beige outline-none',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-cream-dark/30 focus-visible:ring-2 focus-visible:ring-cream-dark outline-none',
  outline: 'bg-transparent border border-pink-accent text-pink-accent hover:bg-pink-accent/5 focus-visible:ring-2 focus-visible:ring-pink-accent/30 outline-none',
}

const sizes = {
  sm: 'px-4 py-1.5 text-xs rounded-xl font-bold tracking-tight',
  md: 'px-5 py-2.5 text-sm rounded-xl font-bold tracking-tight',
  lg: 'px-6.5 py-3.5 text-base rounded-2xl font-bold tracking-tight',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.015, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
