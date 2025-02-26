import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface AudioData {
  stream_url: string;
  title: string;
}

interface AudioPlayerProps {
  audioData: AudioData | null;
  error: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData, error }) => {
  return (
    <Card>
      <CardContent>
        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}
      </CardContent>
      {audioData && (
        <CardFooter>
          <h2 className="text-lg font-semibold mb-2">{audioData.title}</h2>
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
  )
}

export default AudioPlayer 