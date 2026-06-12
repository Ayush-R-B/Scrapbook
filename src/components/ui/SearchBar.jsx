import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search books...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light pointer-events-none">
        <Search className="w-4.5 h-4.5 opacity-60" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-11 pr-4 py-2.5 rounded-xl text-sm sm:text-base
          bg-paper border border-beige/95 shadow-[inset_0_1.5px_3px_rgba(50,38,31,0.02)]
          text-ink placeholder:text-brown-light/45
          focus:outline-none focus:ring-2 focus:ring-soft-pink/40 focus:border-pink-accent
          transition-all duration-300
        "
      />
    </div>
  )
}
