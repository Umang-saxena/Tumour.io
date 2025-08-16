import { NextResponse } from "next/server";
import connectMongo from "@/lib/dbConnect"; // adjust to your db connection util

export async function GET() {
  try {
    await connectMongo(); // connect to Mongo
    return NextResponse.json({ success: true, message: "Database connected successfully 🚀" });
  } catch (error) {
    console.error("DB connection error:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}
