import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
            trim: true,
        },
        mriImage: {
            type: String,
            required: true, // can be file path, URL, or base64
        },
        userId: {
            type: String,
            required: true,
        },
        analysisResult: {
            type: mongoose.Schema.Types.Mixed,
            required: false, // Optional field to store the complete analysis result
        },
        recommendation: {
            type: String,
            required: false, // Optional field for recommendation based on analysis
        },
    },
    { timestamps: true }
);

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
