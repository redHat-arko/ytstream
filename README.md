# FreeMusic
Tired of ads on YouTube while listening to music? Look no further. FreeMusic is a music streaming application that enables ad-free music streaming from YouTube.

## Why use FreeMusic
While [yt-dlp](https://github.com/yt-dlp/yt-dlp) and other similar applications enable downloading from YouTube, streaming is an entriely different issue. 
With FreeMusic, it is now possible to stream audio ad-free from YouTube.

## Features
* Ad-free audio streaming from YouTube at the highest possible quality supported by YouTube (stereo `OPUS` or `AAC`)
* Support for single links and text playlists
* Ability to pause and skip to the previous or next tracks while navigating a playlist
* Autoplay

## Dependencies
* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* [python-vlc](https://pypi.org/project/python-vlc)
* [PyQt5](https://pypi.org/project/PyQt5)


Requires [VLC](https://www.videolan.org/vlc) to be installed and added to `PATH`.

## Usage

All of these usages and their combinations are valid

`freeMusic URL`

`freeMusic [URL...]`

`freeMusic <text file>`

The text file needs to be formatted with each YouTube link on a new line.

For example:

    https://www.youtube.com/watch?v=DmWWqogr_r8
    https://www.youtube.com/watch?v=VPRjCeoBqr

You can run the `Windows (x64)` binary directly from the terminal. All dependencies are included in the binary but `VLC` still needs to be installed 
and added to `PATH`.

More examples:

`freeMusic https://www.youtube.com/watch?v=DmWWqogr_r8`
`freeMusic https://www.youtube.com/watch?v=DmWWqogr_r8 https://www.youtube.com/watch?v=VPRjCeoBqr`
`freeMusic playlist.txt https://www.youtube.com/watch?v=DmWWqogr_r8 https://www.youtube.com/watch?v=VPRjCeoBqr`

## Release
File|Description
:---|:---
[freeMusic.exe](https://github.com/redHat-arko/freeMusic/releases/download/v1.0/freeMusic.exe)|Windows (Win7 SP1+) standalone x64 binary (recommended for **Windows**)

## Known Issues

`VLC` gives a `mmdevice audio output error: cannot initialize COM (error 0x80010106)` on start but this does not affect playback.
