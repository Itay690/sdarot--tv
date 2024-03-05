import { useState } from 'react';
import { useUploadMutation } from '../store/services/sdarot.api';

export const Upload: React.FC = () => {
  const [upload] = useUploadMutation();
  const [file, setFile] = useState<File | null>();

  return (
    <div className="flex h-full w-full">
      <div>
        <label htmlFor="file">Upload Here</label>
        <input
          type="file"
          id="file"
          onChange={(event) => {
            if (!event.target.files) {
              throw Error('No File Selected');
            }

            setFile(event.target.files[0]);
          }}
        />

        <button
          className="border px-4 py-2"
          onClick={async () => {
            if (!file) {
              throw new Error('No File Selected');
            }

            const formData = new FormData();
            formData.append('file', file);

            upload(formData).unwrap();
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
