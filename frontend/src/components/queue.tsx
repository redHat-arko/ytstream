import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Trash, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AudioData {
  stream_url: string
  title: string
}

interface QueueProps {
  queue: AudioData[];
  setQueue: React.Dispatch<React.SetStateAction<AudioData[]>>;
  setAudioData: React.Dispatch<React.SetStateAction<AudioData | null>>;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Queue: React.FC<QueueProps> = ({ queue, setQueue, setAudioData, setCurrentTrackIndex }) => {
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
    setCurrentTrackIndex(index); // Update the current track index
    setAudioData(trackToPlay); // Set the audio data to the selected track
  }

  return (
    <>
      {queue.length === 0 && !url && !showInput ? (
        <Button onClick={() => setShowInput(true)} className='mt-4'>
          <Plus className="h-4 w-4" />
        </Button>
      ) : (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold my-4">Queue</h2>
            {showInput && (
              <div className="flex items-center mb-4">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Add URL to queue"
                  className="mr-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addToQueue();
                    }
                  }}
                />
                <Button onClick={addToQueue}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <ScrollArea className="max-h-40 overflow-y-auto rounded-md p-2">
              <ul>
                {queue.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center hover:bg-accent hover:text-accent-foreground px-4 py-2"
                    onClick={() => jumpQueue(index)}
                  >
                    <span className="mr-4">{item.title}</span>
                    <Button 
                      onClick={(e) => { e.stopPropagation(); removeFromQueue(index); }} 
                      className="p-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Queue
