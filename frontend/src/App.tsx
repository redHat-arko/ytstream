import { useState } from 'react'
import axios from 'axios'

interface AudioData {
  stream_url: string
  title: string
}

function App() {
  const [url, setUrl] = useState('')
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post('http://localhost:8000/api/get-audio', {
        url: url
      })
      setAudioData(response.data)
    } catch (err) {
      setError('Failed to fetch audio. Please check the URL and try again.')
      setAudioData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">YouTube Audio Player</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Audio'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {audioData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">{audioData.title}</h2>
            <audio
              controls
              className="w-full"
              src={audioData.stream_url}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
