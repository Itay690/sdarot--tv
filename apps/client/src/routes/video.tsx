import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/video-player';
import { useGetOneVideosQuery } from '../store/services/videos.api';

export const Video: React.FC = () => {
  const { fileId } = useParams();

  if (!fileId) {
    throw new Error('Must provide id of file in mongodb');
  }

  const { data: video } = useGetOneVideosQuery(fileId);

  return (
    <div className="flex h-full w-full flex-col bg-blue-200">
      <br></br>
      <div className="text-center">
        <div className="text-2xl underline md:font-bold">
          {' '}
          {video?.filename}
        </div>
        <br></br>
      </div>
      <div className="w-full px-72">
        <VideoPlayer
          src={`http://${import.meta.env.VITE_SERVER_HOSTNAME}:${import.meta.env.VITE_SERVER_PORT}/api/videos/${fileId}`}
        />
      </div>
      <br></br>
      <div className="text-center">
        <div>
          {' '}
          uploade date:{' '}
          {video && new Date(video.uploadDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
