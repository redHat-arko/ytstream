import { Track } from './types';

const API_BASE = 'http://localhost:8000/api';

export const addUrl = async (url: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/add-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }
};

export const getPlaylist = async (): Promise<Track[]> => {
  const response = await fetch(`${API_BASE}/playlist`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }
  
  return response.json();
}; 