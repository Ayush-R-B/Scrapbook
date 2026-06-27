import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Trash2, Plus } from 'lucide-react'

export default function ImageCanvas({
  images = [],
  onImagesChange,
  multiple = false,
  aspect = '4/3',
  emptyLabel = 'Drop your photo here',
  emptyHint = 'or click to browse',
}) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const addFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    const previews = imageFiles.map((f) => URL.createObjectURL(f))
    onImagesChange(multiple ? [...images, ...previews] : previews.slice(0, 1))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const removeAt = (index) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const aspectClass = aspect === '3/4' ? 'aspect-[3/4.2]' : 'aspect-[4/3]'

  if (images.length === 0) {
    return (
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.005 }}
        className={`
          ${aspectClass} w-full rounded-2xl cursor-pointer
          border-2 border-dashed transition-all duration-400
          flex flex-col items-center justify-center gap-4 p-8 text-center
          ${dragOver
            ? 'border-pink-accent bg-soft-pink/12 scale-[1.01] shadow-card'
            : 'border-beige/80 bg-cream-dark/25 hover:border-pink-accent/50 hover:bg-cream-dark/40 shadow-inner-sm'
          }
        `}
        style={{ rotate: '-0.3deg' }}
      >
        <div className="w-14 h-14 rounded-full bg-paper-warm flex items-center justify-center text-brown-light shadow-card border border-beige/35">
          <Upload className="w-5 h-5 opacity-65" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">{emptyLabel}</p>
          <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">{emptyHint}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </motion.div>
    )
  }

  if (!multiple || images.length === 1) {
    return (
      <div className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden polaroid-frame border border-beige/40 group p-2.5 pb-10`} style={{ rotate: '0.5deg' }}>
        <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg border border-beige/25" />
        <div className="absolute inset-2.5 rounded-lg bg-black/0 group-hover:bg-black/12 transition-all duration-300" />

        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none z-10" />

        <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3.5 py-1.5 rounded-full bg-paper/95 text-ink text-xs font-semibold shadow-card cursor-pointer hover:bg-paper transition-all"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => onImagesChange([])}
            className="w-8 h-8 rounded-full bg-ink/70 text-paper flex items-center justify-center cursor-pointer hover:bg-pink-accent hover:scale-105 transition-all shadow-card"
            title="Remove Photo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden polaroid-frame border border-beige/40 p-2.5 pb-10`} style={{ rotate: '-0.5deg' }}>
        <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none z-10" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pl-0.5 scrollbar-thin">
        {images.map((src, i) => (
          <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group border border-beige/40 shadow-sm">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute inset-0 bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-pink-accent"
              title="Delete Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-16 h-16 rounded-xl border-2 border-dashed border-beige/80 bg-cream-dark/20 flex items-center justify-center text-ink-muted hover:border-pink-accent hover:text-pink-accent transition-all cursor-pointer flex-shrink-0"
          title="Add photo"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  )
}
