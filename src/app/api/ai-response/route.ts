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
    const { message } = await req.json();
    if (!message ) {
      return NextResponse.json(
        { error: "Message and sender are required." },
        { status: 400 }
      );
    }


    // Gemini expects a chat-like array of content parts
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    // getting response from ai
    const aiText = aiResponse.text;

    //saving the AI message 
    const aiMsg = new chatMessageModel({
      text: aiText,
      createdAt: new Date(),
      sender: Sender.AI,
    });
    await aiMsg.save();

    // Return the full conversation, newest last 
    const messages = await chatMessageModel.find({}).sort({ createdAt: 1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    //  Error handling 
    console.error("Error in Ai sending messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
