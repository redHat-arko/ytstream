import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Button } from './components/ui/button'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'

interface AudioData {
  stream_url: string
  title: string
}
 
function App() {
  const [url, setUrl] = useState('')
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      <ModeToggle />
    </ThemeProvider>
  )
}
 
export default App
