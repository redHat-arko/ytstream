import sys
import url_getter
import player
from PyQt5.QtWidgets import QApplication


class FreeMusic:
    def __init__(self, urls):
        self.urls = urls

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

    def play(self):
        self.parse()
        self.get_audio_urls()

        app = QApplication(sys.argv)
        player_obj = player.VLCPlayer(self.audio_urls)
        player_obj.start()

        # Run the main loop
        sys.exit(app.exec_())


def main():
    urls = sys.argv[1:]
    music = FreeMusic(urls)
    music.play()


main()
