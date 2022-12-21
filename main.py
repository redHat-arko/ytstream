import sys
import url_getter
import player
from PyQt5.QtWidgets import QApplication


def parse(urls):
    for i in range(len(urls)):
        url = urls[i]
        if url[-4:] == '.txt':
            with open(url) as f:
                lines = [line.rstrip() for line in f]
            urls[i + 1:i + 1] = lines
            urls.pop(i)
    return urls


def get_audio_urls(urls):
    audio_urls = []
    titles = []

    for url in urls:
        url_getter_obj = url_getter.URLGetter(url)
        audio_url, title = url_getter_obj.get_youtube_audio_url()
        audio_urls.append(audio_url)
        titles.append(title)
    return audio_urls


def main():
    urls = sys.argv[1:]
    urls = parse(urls)

    audio_urls = get_audio_urls(urls)

    # Create the QApplication
    app = QApplication(sys.argv)

    # Create the VLC player and show the UI
    player_obj = player.VLCPlayer(audio_urls)
    player_obj.start()

    # Run the main loop
    sys.exit(app.exec_())


main()
