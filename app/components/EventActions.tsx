'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EventActionsProps {
  eventId: string;
  eventData: any;
}

export default function EventActions({ eventId, eventData }: EventActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/events/${eventData.slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert("Event deleted successfully")
        router.push('/') 
        router.refresh()
      } else {
        alert("Failed to delete event")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    router.push(`/events/${eventData.slug}/edit`)
  }

  return (
    <div className="flex gap-2">
      <button 
        onClick={handleEdit}
        className="text-sm font-medium text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1 hover:cursor-pointer"
      >
        Edit Event
      </button>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm font-medium text-red-400/60 hover:text-red-400 transition-colors border border-red-400/10 hover:border-red-400/30 rounded-full px-3 py-1 hover:cursor-pointer disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete Event'}
      </button>
    </div>
  )
}