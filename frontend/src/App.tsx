import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import AudioInput from './components/audio-input'
import AudioPlayer from './components/audio-player'
import Queue from './components/queue'

interface AudioData {
  stream_url: string
  title: string
}
 
function App() {
  const [url, setUrl] = useState('')
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [queue, setQueue] = useState<AudioData[]>([])

  const handleFetchAudio = async () => {
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-end mb-2">
          <ModeToggle />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">ytstream</h1>
        <div className="max-w-md mx-auto">
          <div>
            <AudioInput url={url} setUrl={setUrl} handleFetchAudio={handleFetchAudio} loading={loading} />
          </div>
          <Queue queue={queue} setQueue={setQueue} />
        </div>
        {(audioData || error) && (
          <div className="fixed bottom-10 left-0 right-0 max-w-md mx-auto">
            <AudioPlayer audioData={audioData} error={error} queue={queue} setQueue={setQueue} />
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
 
export default App
