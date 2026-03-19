import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/Database/event_model";

// Context type for dynamic route parameters
type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    // Await params (required in Next.js 15+)
    const { slug } = await context.params;

    // Validate slug exists
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Validate slug format — only lowercase letters, numbers, hyphens
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: "Invalid slug format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find event by slug
    const event = await Event.findOne({ slug });

    // Event not found
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