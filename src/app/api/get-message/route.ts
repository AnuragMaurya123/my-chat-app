import dbConnect from "@/lib/mongodb";           
import chatMessageModel from "@/model/chatMessage"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Establish MongoDB connection before querying
    await dbConnect();

    // Fetch all chat messages from the database, sorted by creation time (oldest first)
    const messages = await chatMessageModel.find({}).sort({ createdAt: 1 });

    // Return the fetched messages as JSON with 200 OK status
    return NextResponse.json(messages, { status: 200 });
    
  } catch (error) {
    // Log any error encountered during fetching
    console.error("Error in messages fetching:", error);

    // Return a 500 Internal Server Error response with error info
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
