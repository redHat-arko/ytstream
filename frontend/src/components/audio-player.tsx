import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface AudioData {
  stream_url: string;
  title: string;
}

interface AudioPlayerProps {
  audioData: AudioData | null;
  error: string;
  queue: AudioData[];
  setQueue: React.Dispatch<React.SetStateAction<AudioData[]>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData, error, queue, setQueue }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && audioData) {
      audioRef.current.play();
    }
  }, [audioData]);

  const handleEnded = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      audioRef.current!.src = nextTrack.stream_url;
      audioRef.current!.play();
    }
  };

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
            ref={audioRef}
            controls
            className="w-full"
            src={audioData.stream_url}
            onEnded={handleEnded}
          >
            Your browser does not support the audio element.
          </audio>
        </CardFooter>
      )}
    </Card>
  )
}

export default AudioPlayer 