import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Trash, Plus } from "lucide-react"

interface AudioData {
  stream_url: string
  title: string
}

interface QueueProps {
  queue: AudioData[];
  setQueue: React.Dispatch<React.SetStateAction<AudioData[]>>;
  setAudioData: React.Dispatch<React.SetStateAction<AudioData | null>>;
}

const Queue: React.FC<QueueProps> = ({ queue, setQueue, setAudioData }) => {
  const [url, setUrl] = useState('')
  const [showInput, setShowInput] = useState(false)

  const addToQueue = async () => {
    if (url) {
      try {
        const response = await axios.post('http://localhost:8000/api/get-audio', { url });
        const { stream_url, title } = response.data;
        const newQueue = [...queue, { stream_url, title }];
        setQueue(newQueue);
        setUrl('');
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }
  }

  const removeFromQueue = (index: number) => {
    const updatedQueue = queue.filter((_, i) => i !== index);
    setQueue(updatedQueue);
  }

  const jumpQueue = (index: number) => {
    const trackToPlay = queue[index]; // Get the track to play
    const updatedQueue = queue.filter((_, i) => i !== index);
    setQueue(updatedQueue);
    setAudioData(trackToPlay); // Set the audio data to the selected track
  }

  return (
    <>
      {queue.length === 0 && !url && !showInput ? (
        <Button onClick={() => setShowInput(true)}>
          <Plus className="h-4 w-4" />
        </Button>
      ) : (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold my-4">Queue</h2>
            {showInput && (
              <div className="flex items-center mb-2">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Add URL to queue"
                  className="mr-2"
                />
                <Button onClick={addToQueue}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto">
              <ul className="mt-4">
                {queue.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center hover:bg-accent hover:text-accent-foreground px-4 py-2"
                    onClick={() => jumpQueue(index)}
                  >
                    <span>{item.title}</span>
                    <Button 
                      onClick={(e) => { e.stopPropagation(); removeFromQueue(index); }} 
                      className="p-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            {/* Play Queue button removed */}
          </CardFooter>
        </Card>
      )}
    </>
  )
}

export default Queue
