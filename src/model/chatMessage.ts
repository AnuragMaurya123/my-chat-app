import mongoose, { Schema, Document } from "mongoose";

// Define enum 
export enum Sender {
  User = "user",
  AI = "ai",
}
// Define the Message interface
export interface ChatMessage extends Document {
  text:string;
  content: string;
  createdAt: Date;
  sender: Sender;
}

// Define the Message schema
const chatMessageSchema: Schema<ChatMessage> = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: Object.values(Sender), 
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Create the chatMessage model
const chatMessageModel =
  (mongoose.models.ChatMessage as mongoose.Model<ChatMessage>) ||
  mongoose.model<ChatMessage>("ChatMessage", chatMessageSchema);
export default chatMessageModel;