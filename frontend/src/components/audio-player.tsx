import React, { useEffect, useRef, useState } from 'react'
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
  setAudioData: React.Dispatch<React.SetStateAction<AudioData | null>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData, error, queue, setQueue, setAudioData }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  useEffect(() => {
    if (audioData) {
      audioRef.current!.src = audioData.stream_url;
      audioRef.current!.play();
    }
  }, [audioData]);

  const handleEnded = () => {
    if (currentTrackIndex < queue.length - 1) {
      const nextIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(nextIndex);
      setAudioData(queue[nextIndex]);
    } else {
      setCurrentTrackIndex(-1);
      setAudioData(null);
    }
  };

  const jumpQueue = (index: number) => {
    setCurrentTrackIndex(index);
    const trackToPlay = queue[index];
    setAudioData(trackToPlay);
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