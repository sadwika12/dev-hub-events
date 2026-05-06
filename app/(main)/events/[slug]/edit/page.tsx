'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const EditEventPage = () => {
  const router = useRouter()
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  
  const [eventData, setEventData] = useState<any>(null)
  const [agendaItems, setAgendaItems] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`)
        const data = await res.json()
        if (data.event) {
          setEventData(data.event)
          setAgendaItems(data.event.agenda || [''])
          setTags(data.event.tags || [])
        }
      } catch (err) {
        console.error("Failed to fetch event", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [slug])

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)

    const formData = new FormData(e.currentTarget)
    formData.delete('agenda')
    formData.append('agenda', agendaItems.filter(Boolean).join('\n'))
    formData.delete('tags')
    formData.append('tags', tags.join(','))

    try {
      const response = await fetch(`/api/events/${slug}`, {
        method: 'PUT',
        body: formData
      })

      if (response.ok) {
        alert('Event Updated Successfully')
        router.push(`/events/${slug}`)
        router.refresh()
      } else {
        alert('Failed to update event')
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="text-white p-20 text-center">Loading...</div>

  const inputClass = "bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 w-full"

  return (
    <section className="min-h-screen px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-10">Edit Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Title */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Title</label>
          <input name="title" defaultValue={eventData.title} className={inputClass} required />
        </div>

        {/* 2. Description */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Description</label>
          <textarea name="description" defaultValue={eventData.description} rows={4} className={inputClass} required />
        </div>

        {/* 3. Overview */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Overview (Card Summary)</label>
          <textarea name="overview" defaultValue={eventData.overview} rows={2} className={inputClass} required />
        </div>

        {/* 4 & 5. Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Date</label>
            <input name="date" type="date" defaultValue={eventData.date} className={inputClass} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Time</label>
            <input name="time" type="time" defaultValue={eventData.time} className={inputClass} required />
          </div>
        </div>

        {/* 6. Location */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Location</label>
          <input name="location" defaultValue={eventData.location} className={inputClass} required />
        </div>

        {/* 7. Mode */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Mode</label>
          <select name="mode" defaultValue={eventData.mode} className={inputClass} required>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* 8. Audience */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Audience</label>
          <input name="audience" defaultValue={eventData.audience} className={inputClass} required />
        </div>

        {/* 9. Organizer */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Organizer</label>
          <input name="organizer" defaultValue={eventData.organizer} className={inputClass} required />
        </div>

        {/* 10. Image (Optional) */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Event Image (Leave blank to keep current)</label>
          <input name="image" type="file" accept="image/*" className={inputClass} />
        </div>

        {/* 11. Agenda (Dynamic List) */}
        <div className="flex flex-col gap-3">
          <label className="text-white/70 text-sm">Agenda</label>
          <p className="text-white/30 text-xs">Add or modify items to update the event schedule</p>
          
          {agendaItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-white/30 text-xs font-mono min-w-[24px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newAgenda = [...agendaItems];
                  newAgenda[index] = e.target.value;
                  setAgendaItems(newAgenda);
                }}
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
                placeholder={`e.g. 10:00 AM - Welcome Speech`}
              />
              {agendaItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => setAgendaItems(agendaItems.filter((_, i) => i !== index))}
                  className="text-white/30 hover:text-red-400 transition-colors px-2 text-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setAgendaItems([...agendaItems, ''])}
            className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-xl py-2 mt-2 transition-all flex items-center justify-center gap-2"
          >
            <span>+</span> Add agenda item
          </button>
        </div>
        {/* 10. Tags Section */}
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
                    onClick={() => setTags(tags.filter(t => t !== tag))}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Tag Input Field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  const trimmed = tagInput.trim().toLowerCase();
                  if (trimmed && !tags.includes(trimmed)) {
                    setTags([...tags, trimmed]);
                    setTagInput('');
                  }
                }
              }}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
              placeholder="Type a tag and press Enter"
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = tagInput.trim().toLowerCase();
                if (trimmed && !tags.includes(trimmed)) {
                  setTags([...tags, trimmed]);
                  setTagInput('');
                }
              }}
              className="px-4 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {updating ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </section>
  )
}

export default EditEventPage