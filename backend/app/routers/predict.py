from fastapi import APIRouter, File, UploadFile, HTTPException
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import numpy as np
import tensorflow as tf
import os  # Add os import for path handling


# Initialize APIRouter
router = APIRouter()

# Load model once when app starts
model_path = os.path.join(os.path.dirname(__file__), "../models/brain_tumor_resnet50v2_model.keras")
model = load_model(model_path)

# Class names
class_names = ["glioma", "meningioma", "notumor", "pituitary"]

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload JPG or PNG image.")

        # Read image
        image = Image.open(file.file).convert("RGB")
        image = image.resize((150, 150))  # Resize to model input
        img_array = img_to_array(image)
        img_array = tf.expand_dims(img_array, 0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize

        # Predict
        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        predicted_class = class_names[np.argmax(score)]
        confidence = float(100 * np.max(score))

        return {
            "prediction": predicted_class,
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    

