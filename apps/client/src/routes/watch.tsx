import React from 'react';
import { VideoPlayer } from '../components/video-player';

export const Watch: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <div className="h-1/2 w-1/2">
        <VideoPlayer />
      </div>
    </div>
  );
};
