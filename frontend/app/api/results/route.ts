import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/dbConnect";
import Result from "@/models/results";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    
    const body = await request.json();
    const { patientName, mriImage, userId, analysisResult } = body;

    // Validate required fields
    if (!patientName || !mriImage || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: patientName, mriImage, or userId" },
        { status: 400 }
      );
    }

    // Create new result document
    const newResult = new Result({
      patientName: patientName.trim(),
      mriImage,
      userId,
      analysisResult, // Store the complete analysis result
      recommendation: analysisResult?.recommendation || null, // Optional field for recommendation
    });

    const savedResult = await newResult.save();

    return NextResponse.json({
      success: true,
      message: "Result saved successfully",
      data: savedResult
    });

  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save result" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId parameter is required" },
        { status: 400 }
      );
    }

    // Get all results for the user, sorted by most recent first
    const results = await Result.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}