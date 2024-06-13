import React, { useState } from 'react';
import { Button, Snackbar, styled } from '@mui/material';
import { useUploadMutation } from '../store/services/videos.api';

export const Upload: React.FC = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const [file, setFile] = useState<File | null>();
  const [upload] = useUploadMutation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleUpload = async () => {
    if (!file) {
      throw new Error('No File Selected');
    }

    // Check if the file has the '.mp4' extension
    if (!file.name.toLowerCase().endsWith('.mp4')) {
      setNotificationMessage('Invalid file type. Please select an MP4 file.');
      setShowNotification(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await upload(formData).unwrap();
      setShowNotification(true);
      setNotificationMessage('Video uploaded successfully');
      setFile(null);
    } catch (error) {
      // Handle error, maybe show another notification
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-4 rounded-lg border border-solid border-slate-200 p-4">
        <h2>Upload a video</h2>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
        >
          Select file
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => {
              if (!event.target.files) {
                throw Error('No File Selected');
              }

              setFile(event.target.files[0]);
            }}
          />
        </Button>
        <div>{file ? `File: ${file.name}` : `No File Selected`}</div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setFile(null);
            }}
          >
            Clear
          </Button>
          <Button onClick={handleUpload} variant="contained">
            Upload
          </Button>
        </div>
      </div>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        message={notificationMessage}
      />
    </div>
  );
};
