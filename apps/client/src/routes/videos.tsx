import React, { useState } from 'react';
import { VideoPlayer } from '../components/video-player';
import { useGetAllVideosQuery } from '../store/services/videos.api';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Link, NavLink } from 'react-router-dom';

export const Videos: React.FC = () => {
  const { data: videos } = useGetAllVideosQuery();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter videos based on search term
  const filteredVideos = videos?.filter((video) =>
    video.filename.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full min-w-0 flex-grow flex-col bg-blue-50 p-4">
      {/* Add flex-grow */}
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded-md border border-gray-300 p-2"
        style={{ boxSizing: 'border-box' }} // Ensure the width includes padding and border
      />
      <div className="flex flex-wrap justify-start">
        {filteredVideos?.map((video) => (
          <NavLink
            key={video.id}
            to={`video/${video.fileId}`}
            className="flex w-1/5 flex-col items-center justify-between gap-4 rounded-md border bg-blue-200 p-2 hover:bg-slate-400"
            style={{ minWidth: '200px', margin: '10px' }}
          >
            <div className="text-lg md:font-bold">
              Video Name: {video.filename}
            </div>
            <div className="mt-auto">
              Upload Date: {formatDistanceToNow(new Date(video.uploadDate))}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
