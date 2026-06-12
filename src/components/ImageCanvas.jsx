import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Upload, Trash2, Plus } from 'lucide-react'

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

  // Empty Upload Zone Render
  if (images.length === 0) {
    return (
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.008 }}
        className={`
          ${aspectClass} w-full rounded-2xl cursor-pointer
          border-2 border-dashed transition-all duration-300
          flex flex-col items-center justify-center gap-3.5 p-6 text-center
          ${dragOver
            ? 'border-pink-accent bg-soft-pink/15 scale-[1.01] shadow-md shadow-pink-accent/5'
            : 'border-beige/90 bg-cream-dark/30 hover:border-pink-accent/60 hover:bg-cream-dark/50 shadow-inner-sm'
          }
        `}
      >
        <div className="w-12 h-12 rounded-full bg-paper flex items-center justify-center text-brown-light shadow-sm border border-beige/40">
          <Upload className="w-5.5 h-5.5 opacity-70" />
        </div>
        <div>
          <p className="font-display text-base font-bold text-ink">{emptyLabel}</p>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">{emptyHint}</p>
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

  // Single Image Preview Render
  if (!multiple || images.length === 1) {
    return (
      <div className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden shadow-polaroid border border-beige/45 group p-2 pb-8 bg-paper`}>
        <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg border border-beige/20" />
        <div className="absolute inset-2 rounded-lg bg-black/0 group-hover:bg-black/15 transition-all duration-200" />
        
        {/* Transparent Washi tape mockup */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none z-10" />

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 rounded-full bg-paper/95 text-ink text-xs font-bold shadow-md cursor-pointer hover:bg-paper transition-all"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => onImagesChange([])}
            className="w-7.5 h-7.5 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-pink-accent hover:scale-105 transition-all shadow-md"
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

  // Multiple Images Carousel list Render
  return (
    <div className="space-y-4">
      <div className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden shadow-polaroid border border-beige/45 p-2 pb-8 bg-paper`}>
        <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape pointer-events-none z-10" />
      </div>
      
      {/* Scroll list of thumbnails */}
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
          className="w-16 h-16 rounded-xl border-2 border-dashed border-beige/90 bg-cream-dark/15 flex items-center justify-center text-ink-muted hover:border-pink-accent hover:text-pink-accent transition-all cursor-pointer flex-shrink-0"
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
