import { getMoodById } from '../data/mockData'

export default function MoodBadge({ moodId, size = 'md' }) {
  const mood = getMoodById(moodId)

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2',
  }

  const moodColorBase = mood.color || '#ddd0c0'
  const badgeStyle = {
    backgroundColor: `${moodColorBase}18`,
    border: `1.5px dashed ${moodColorBase}85`,
    color: 'var(--color-ink)',
  }

  return (
    <span
      className={`inline-flex items-center rounded-md font-semibold uppercase tracking-[0.12em] ${sizes[size]} shadow-[0_1px_3px_rgba(44,40,37,0.04)] transition-all duration-300 hover:scale-103`}
      style={badgeStyle}
    >
      <span className="text-xs sm:text-sm select-none leading-none">{mood.emoji}</span>
      <span className="opacity-85 text-[9px] sm:text-[10px] tracking-[0.15em]">{mood.label}</span>
    </span>
  )
}
