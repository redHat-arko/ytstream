from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from url_getter import URLGetter

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLInput(BaseModel):
    url: str

@app.post("/api/get-audio")
async def get_audio(url_input: URLInput):
    try:
        url_getter = URLGetter(url_input.url)
        stream_url, title = url_getter.get_youtube_audio_url()
        return {"stream_url": stream_url, "title": title}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
