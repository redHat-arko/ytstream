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
        {audioData && (
          <h2 className="text-lg font-semibold mt-6">{audioData.title}</h2>
        )}
      </CardContent>
      {audioData && (
        <CardFooter>
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