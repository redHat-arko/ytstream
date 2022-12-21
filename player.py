from PyQt5.QtWidgets import QApplication, QHBoxLayout, QLabel, QPushButton, QSlider, QVBoxLayout, QWidget
import vlc
import time


class VLCPlayer(QWidget):
    def __init__(self, stream_urls):
        super().__init__()

        # Create a VLC media player
        self.player = vlc.MediaListPlayer()

        self.media_list = vlc.MediaList()

        for url in stream_urls:
            self.media_list.add_media(url)

        self.player.set_media_list(self.media_list)

        # Create the UI
        self.create_ui()

    def create_ui(self):
        self.setWindowTitle("FreeMusic")

        self.setGeometry(100, 100, 400, 300)

        self.prev_button = QPushButton("Previous")

        # Create the play button
        self.play_button = QPushButton("Play")

        # Create the pause button
        self.pause_button = QPushButton("Pause")

        # Create the next button
        self.next_button = QPushButton("Next")

        layout = QVBoxLayout()
        layout.addWidget(self.prev_button)
        layout.addWidget(self.play_button)
        layout.addWidget(self.pause_button)
        layout.addWidget(self.next_button)
        self.setLayout(layout)

        self.play_button.clicked.connect(self.player.play)

        # Connect the pause button to the pause() method
        self.pause_button.clicked.connect(self.player.pause)

        self.next_button.clicked.connect(self.player.next)

        self.prev_button.clicked.connect(self.player.previous)

    def start(self):
        # Show the main window
        self.show()

        self.player.play()

