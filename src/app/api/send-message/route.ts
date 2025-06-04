import dbConnect from "@/lib/mongodb";
import chatMessageModel, { Sender } from "@/model/chatMessage";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialise Gemini once (re-use across requests)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

export async function POST(req: NextRequest) {
  try {
    // DB connection
    await dbConnect();

    // Parse & validate body
    const { message, sender } = await req.json();
    if (!message || !sender) {
      return NextResponse.json(
        { error: "Message and sender are required." },
        { status: 400 }
      );
    }

    // Persist the USER message
    const userMsg = new chatMessageModel({
      text: message as string,
      createdAt: new Date(),
      sender: Sender.User, 
    });
    await userMsg.save();

    // Return the full conversation, newest last 
    const messages = await chatMessageModel.find({}).sort({ createdAt: 1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    //  Error handling 
    console.error("Error in sending messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
