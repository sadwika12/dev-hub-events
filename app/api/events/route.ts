import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import connectDB from '@/lib/mongoose'
import Event from '@/Database/event_model'

type EventData = {
  [key: string]: FormDataEntryValue | string | string[]
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const formData = await req.formData()

    let event: EventData
    try {
      event = Object.fromEntries(formData.entries())
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      )
    }

    const file = formData.get('image') as File
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      )
    }

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
    event.agenda = (event.agenda as string)
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean)
    event.tags = (event.tags as string)
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean)

    const createdEvent = await Event.create(event)

    return NextResponse.json(
      { message: "Event Created successfully", event: createdEvent },
      { status: 201 }
    )

  } catch (e) {
    console.log(e)
    return NextResponse.json(
      {
        message: 'Event Creation Failed',
        error: e instanceof Error ? e.message : 'Unknown'
      },
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

 