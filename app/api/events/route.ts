import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
// Create Event
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let event;
    const formData = await req.formData();

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({ message: "Invalid JSON Data", status: 400 });
    }

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({
        message: "Image Is Required",
        status: 400,
      });
    }

    const tags = JSON.parse(formData.get("tags") as string);
    const agendas = JSON.parse(formData.get("agendas") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "developer-events" },
          (error, result) => {
            console.log("eror", error);
            if (error) return reject(error);

            resolve(result);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string })?.secure_url;
    const createdEvent = await Event.create({ ...event, tags, agendas });

    return NextResponse.json({
      message: "Event Created Successfully",
      event: createdEvent,
      status: 201,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unkown",
      status: 500,
    });
  }
}

// Fetch Events

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ created: -1 });
    return NextResponse.json({
      message: "Events Fetched Successfully",
      events: events,
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unkown",
      status: 500,
    });
  }
}
