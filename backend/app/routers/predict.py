from fastapi import APIRouter, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io

router = APIRouter(prefix="/predict")

# Load model once at startup
model = tf.keras.models.load_model("app/models/brain_tumor_resnet50v2_model.keras")

@router.post("/")
async def predict(file: UploadFile):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).resize((224, 224)) # adjust size
    img_array = np.expand_dims(np.array(image)/255.0, axis=0)
    
    prediction = model.predict(img_array)
    result = prediction.tolist()
    return {"prediction": result}
