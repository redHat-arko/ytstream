import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Queue: React.FC = () => {
  const [url, setUrl] = useState('')
  const [queue, setQueue] = useState<string[]>([])

  const addToQueue = () => {
    if (url) {
      setQueue([...queue, url])
      setUrl('')
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
              <span>{item}</span>
              <Button onClick={() => removeFromQueue(index)} variant="destructive">Remove</Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log(queue)}>Play Queue</Button>
      </CardFooter>
    </Card>
  )
}

export default Queue
