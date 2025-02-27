import yt_dlp

class URLGetter:
    def __init__(self):
        self.ydl_opts = {
            'format': 'bestaudio',
            'quiet': 'true',
        }
    
    def get_youtube_audio_url(self, url):
        

        stream_url = None

        with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
            info = ydl.sanitize_info(ydl.extract_info(url, download=False))
            title = info['title']
            stream_url = info['url']

        return stream_url, title
