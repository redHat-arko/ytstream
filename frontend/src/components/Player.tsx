import { useState } from 'react';
import { Track } from '../types';

interface PlayerProps {
  track: Track;
}

export const Player = ({ track }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{track.title}</h3>
      <audio
        src={track.audio_url}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full"
      />
    </div>
  );
}; 