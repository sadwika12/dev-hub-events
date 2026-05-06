import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import connectDB from '@/lib/mongoose'
import Event from '@/Database/event_model'
import { auth } from '@/auth'
type EventData = {
  [key: string]: FormDataEntryValue | string | string[]
}

export async function POST(req: NextRequest) {
  try {
    
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized — please sign in' },
        { status: 401 }
      )
    }

    await connectDB()
    const formData = await req.formData()
    const event: EventData = Object.fromEntries(formData.entries())

    
    const file = formData.get('image') as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'DevEvent' },
        (error, results) => {
          if (error) return reject(error)
          resolve(results)
        }
      ).end(buffer)
    })

    event.image = (uploadResult as { secure_url: string }).secure_url
    event.agenda = (event.agenda as string).split('\n').map(s => s.trim()).filter(Boolean)
    event.tags = (event.tags as string).split(',').map(s => s.trim()).filter(Boolean)

   
    event.createdBy = session.user.id

    const createdEvent = await Event.create(event)
    return NextResponse.json(
      { message: 'Event Created successfully', event: createdEvent },
      { status: 201 }
    )

  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find().sort({ createdAt: -1 })
    return NextResponse.json(
      { message: 'Events listed successfully', events },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json(
      { message: 'Events fetching failed', error: e },
      { status: 500 }
    )
  }
}

 