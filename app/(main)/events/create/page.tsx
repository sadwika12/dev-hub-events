'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateEventPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [agendaItems, setAgendaItems] = useState<string[]>([''])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

 
  const addAgendaItem = () => setAgendaItems([...agendaItems, ''])

  const removeAgendaItem = (index: number) =>
    setAgendaItems(agendaItems.filter((_, i) => i !== index))

  const updateAgendaItem = (index: number, value: string) => {
    const updated = [...agendaItems]
    updated[index] = value
    setAgendaItems(updated)
  }

  
  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) =>
    setTags(tags.filter(t => t !== tag))

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    
    formData.delete('agenda')
    formData.append('agenda', agendaItems.filter(Boolean).join('\n'))
    formData.delete('tags')
    formData.append('tags', tags.join(','))

    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const { event } = await response.json()
      alert('Event Created Successfully')
      router.push(`/events/${event.slug}`)
    } else {
      alert('Failed to create event')
    }

    setLoading(false)
  }

 
  const inputClass = "bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 w-full"

  return (
    <section className="min-h-screen px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-2">Create Event</h1>
      <p className="text-white/40 text-sm mb-10">Fill in the details to publish your event</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Title</label>
          <input
            name="title"
            type="text"
            required
            className={inputClass}
            placeholder="Event title"
          />
        </div>

       
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className={inputClass}
            placeholder="Full event description"
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Overview</label>
          <p className="text-white/30 text-xs">Short summary shown on event cards</p>
          <textarea
            name="overview"
            required
            rows={2}
            className={inputClass}
            placeholder="Short overview shown on event card"
          />
        </div>

       
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Date</label>
            <input
              name="date"
              type="date"
              required
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Time</label>
            <input
              name="time"
              type="time"
              required
              className={inputClass}
            />
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Venue</label>
          <input
            name="venue"
            type="text"
            required
            className={inputClass}
            placeholder="Venue name e.g. HICC Convention Center"
          />
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Location</label>
          <input
            name="location"
            type="text"
            required
            className={inputClass}
            placeholder="City, Country e.g. Hyderabad, India"
          />
        </div>

       
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Mode</label>
          <select
            name="mode"
            required
            className={inputClass}
          >
            <option value="" className="bg-black">Select mode</option>
            <option value="online" className="bg-black">Online</option>
            <option value="offline" className="bg-black">Offline</option>
            <option value="hybrid" className="bg-black">Hybrid</option>
          </select>
        </div>

       
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Audience</label>
          <input
            name="audience"
            type="text"
            required
            className={inputClass}
            placeholder="Who is this event for? e.g. React developers"
          />
        </div>

       
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Organizer</label>
          <input
            name="organizer"
            type="text"
            required
            className={inputClass}
            placeholder="Organizer name"
          />
        </div>

       
        <div className="flex flex-col gap-3">
          <label className="text-white/70 text-sm">Agenda</label>
          <p className="text-white/30 text-xs">Add each agenda item separately</p>
          {agendaItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-white/30 text-xs font-mono min-w-[24px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => updateAgendaItem(index, e.target.value)}
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
                placeholder={`e.g. 9:00 AM - Opening Keynote`}
              />
              {agendaItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAgendaItem(index)}
                  className="text-white/30 hover:text-red-400 transition-colors px-2 text-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAgendaItem}
            className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-xl py-2 transition-all"
          >
            + Add agenda item
          </button>
        </div>

        
        <div className="flex flex-col gap-3">
          <label className="text-white/70 text-sm">Tags</label>
          <p className="text-white/30 text-xs">Press Enter or comma to add a tag</p>

          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/70"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

        
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
              placeholder="Type a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Event Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-white/40 w-full"
          />
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>

      </form>
    </section>
  )
}

export default CreateEventPage
