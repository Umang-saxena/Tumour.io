from fastapi import FastAPI
from routers import predict

app = FastAPI()

app.include_router(predict.router)

@app.get("/")
def home():
    return {"message": "FastAPI ML Server Running"}
