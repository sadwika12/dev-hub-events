import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/Database/event_model";
type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: "Invalid slug format" },
        { status: 400 }
      );
    }

    await connectDB();
    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { message: `No event found with slug: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );

  } catch (e) {
    console.error("[GET /api/events/[slug]]", e);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();
  const { slug } = await params;
  const formData = await request.formData();
  
  const rawData = Object.fromEntries(formData);
  const updateData: Record<string, any> = {};
  for (const [key, value] of Object.entries(rawData)) {
    if (key === 'image') {
      const file = value as File;
      if (file && file.size > 0 && file.name !== "") {
        updateData.image = file.name; 
      }
      continue; 
    }
    updateData[key] = value;
  }

 
  if (updateData.agenda) {
    updateData.agenda = (updateData.agenda as string).split('\n').filter(Boolean);
  }
  if (updateData.tags) {
    updateData.tags = (updateData.tags as string).split(',').filter(Boolean);
  }

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { slug: slug },
      { $set: updateData },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}