import yt_dlp

class URLGetter:
    def __init__(self, url):
        self.url = url

    def get_youtube_audio_url(self):
        ydl_opts = {
            'format': 'bestaudio',
            'quiet': 'true',
        }

        stream_url = None

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.sanitize_info(ydl.extract_info(self.url, download=False))
            title = info['title']
            stream_url = info['url']

        return stream_url, title 