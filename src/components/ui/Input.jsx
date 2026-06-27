export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-[0.15em] pl-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-xl bg-paper-warm border border-beige/80
          text-ink placeholder:text-brown-light/50 text-sm sm:text-base
          shadow-inner-sm focus:outline-none focus:ring-2 focus:ring-soft-pink/50 focus:border-pink-accent/60
          transition-all duration-300
        `}
        {...props}
      />
      {error && <span className="text-xs text-pink-accent font-medium mt-0.5 pl-1">{error}</span>}
    </div>
  )
}
