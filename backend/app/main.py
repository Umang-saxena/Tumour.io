
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict


app = FastAPI()

app.include_router(predict.router)

@app.get("/")
def home():
    return {"message": "FastAPI ML Server Running"}

# --- CORS Middleware for frontend-backend communication ---

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
