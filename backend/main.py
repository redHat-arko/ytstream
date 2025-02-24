from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import url_getter
from typing import List

class URL(BaseModel):
    url: str

class Track(BaseModel):
    audio_url: str
    title: str

class YTStream:
    def __init__(self):
        self.urls: List[str] = []
        self.audio_urls: List[str] = []
        self.titles: List[str] = []

    def parse(self):
        for i in range(len(self.urls)):
            url = self.urls[i]
            if url[-4:] == '.txt':
                with open(url) as f:
                    lines = [line.rstrip() for line in f]
                self.urls[i + 1:i + 1] = lines
                self.urls.pop(i)

    def get_audio_urls(self):
        self.audio_urls = []
        self.titles = []
        for url in self.urls:
            url_getter_obj = url_getter.URLGetter(url)
            audio_url, title = url_getter_obj.get_youtube_audio_url()
            self.audio_urls.append(audio_url)
            self.titles.append(title)

    def get_playlist(self) -> List[Track]:
        self.parse()
        self.get_audio_urls()
        return [
            Track(audio_url=url, title=title)
            for url, title in zip(self.audio_urls, self.titles)
        ]

app = FastAPI()
yt_stream = YTStream()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/add-url")
async def add_url(url_data: URL):
    try:
        yt_stream.urls.append(url_data.url)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/playlist", response_model=List[Track])
async def get_playlist():
    try:
        return yt_stream.get_playlist()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 