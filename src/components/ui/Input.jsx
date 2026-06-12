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
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider pl-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2.5 rounded-xl bg-paper border border-beige/95
          text-ink placeholder:text-brown-light/45 text-sm sm:text-base
          shadow-[inset_0_1.5px_3px_rgba(50,38,31,0.03)] focus:outline-none focus:ring-2 focus:ring-soft-pink/40 focus:border-pink-accent
          transition-all duration-200
        `}
        {...props}
      />
      {error && <span className="text-xs text-pink-accent font-medium mt-0.5 pl-1">{error}</span>}
    </div>
  )
}
