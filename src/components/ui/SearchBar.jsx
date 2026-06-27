import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Find a cherished volume...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light pointer-events-none">
        <Search className="w-4 h-4 opacity-55" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-11 pr-4 py-3 rounded-xl text-sm sm:text-base
          bg-paper-warm border border-beige/80 shadow-inner-sm
          text-ink placeholder:text-brown-light/50
          focus:outline-none focus:ring-2 focus:ring-soft-pink/50 focus:border-pink-accent/60
          transition-all duration-300
        "
      />
    </div>
  )
}
