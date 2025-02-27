import React from 'react'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"

interface AudioInputProps {
  url: string;
  setUrl: (url: string) => void;
  handleFetchAudio: () => void;
  loading: boolean;
}

const AudioInput: React.FC<AudioInputProps> = ({ url, setUrl, handleFetchAudio, loading }) => {
  return (
    <div className="flex mb-4">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFetchAudio()
          }
        }}
        className="block w-full"
        placeholder="https://www.youtube.com/watch?v=..."
      />
      <Button
        onClick={handleFetchAudio}
        disabled={loading}
        className="flex items-center justify-center ml-2"
      >
        <span className="text-lg">↵</span>
      </Button>
    </div>
  )
}

export default AudioInput 