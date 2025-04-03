from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hilltop Production API is running"}