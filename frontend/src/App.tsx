import { useState } from 'react'
import axios from 'axios'
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">ytstream</h1>
              <ModeToggle />
            </CardHeader>
            <CardContent>
              <div className="flex">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1 block w-full placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <Button
                  onClick={handleFetchAudio}
                  disabled={loading}
                  className="flex items-center justify-center py-2 px-4 ml-2"
                >
                  <span className="text-lg">↵</span>
                </Button>
              </div>
              {error && (
                <div className="mt-4 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </CardContent>
            {audioData && (
              <CardFooter>
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{audioData.title}</h2>
                <audio
                  controls
                  className="w-full"
                  src={audioData.stream_url}
                >
                  Your browser does not support the audio element.
                </audio>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
