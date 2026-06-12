import { getMoodById } from '../data/mockData'

export default function MoodBadge({ moodId, size = 'md' }) {
  const mood = getMoodById(moodId)
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2',
  }

  // Generate dynamic border and ticket styles based on mood color
  const moodColorBase = mood.color || '#e4dacf'
  const badgeStyle = {
    backgroundColor: `${moodColorBase}15`, 
    border: `1.5px dashed ${moodColorBase}90`,
    color: 'var(--color-ink)',
  }

  return (
    <span
      className={`inline-flex items-center rounded-md font-bold uppercase tracking-wider ${sizes[size]} shadow-sm transition-all duration-300 hover:scale-103`}
      style={badgeStyle}
    >
      <span className="text-xs sm:text-sm select-none leading-none">{mood.emoji}</span>
      <span className="opacity-90 text-[9px] sm:text-[10px] tracking-widest">{mood.label}</span>
    </span>
  )
}
