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
    },
    { timestamps: true }
);

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
