import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'

interface AudioData {
  stream_url: string
  title: string
}

const Queue: React.FC = () => {
  const [url, setUrl] = useState('')
  const [queue, setQueue] = useState<AudioData[]>([])

  const addToQueue = async () => {
    if (url) {
      try {
        const response = await axios.post('http://localhost:8000/api/get-audio', { url });
        const { stream_url, title } = response.data;
        setQueue([...queue, { stream_url, title }]);
        setUrl('');
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }
  }

  const removeFromQueue = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Audio Queue</h2>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add URL to queue"
          className="mb-2"
        />
        <Button onClick={addToQueue} className="mb-4">Add to Queue</Button>
        <ul>
          {queue.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item.title}</span>
              <Button onClick={() => removeFromQueue(index)} variant="destructive">Remove</Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {/* Play Queue button removed */}
      </CardFooter>
    </Card>
  )
}

export default Queue
