import { useState } from 'react'
import axios from 'axios'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

interface Track {
  url: string
  title: string
}

function App() {
  const [url, setUrl] = useState('')
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/get-audio', {
        url: url
      })
      setPlaylist([...playlist, {
        url: response.data.stream_url,
        title: response.data.title
      }])
      setUrl('')
    } catch (error) {
      console.error('Error fetching audio:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">YTStream Web</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full p-2 border rounded mb-2"
          />
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Playlist
          </button>
        </form>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Playlist</h2>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <div 
                key={index}
                className={`p-4 rounded cursor-pointer ${
                  currentTrack === index 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                {track.title}
              </div>
            ))}
          </div>
        </div>

        {playlist.length > 0 && (
          <AudioPlayer
            src={playlist[currentTrack].url}
            onEnded={() => {
              if (currentTrack < playlist.length - 1) {
                setCurrentTrack(currentTrack + 1)
              }
            }}
            showSkipControls={true}
            onClickPrevious={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
            onClickNext={() => setCurrentTrack(Math.min(playlist.length - 1, currentTrack + 1))}
          />
        )}
      </div>
    </div>
  )
}

export default App
