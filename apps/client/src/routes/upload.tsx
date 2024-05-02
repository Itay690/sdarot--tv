import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  useGetSdarotQuery,
  useUploadMutation,
} from '../store/services/sdarot.api';

export const Upload: React.FC = () => {
  const [upload] = useUploadMutation();
  const { data: sdarot } = useGetSdarotQuery();

  const [file, setFile] = useState<File>();
  const [showId, setShowId] = useState<string>();

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex h-fit w-fit flex-col items-center justify-start">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={sdarot?.map((sidra) => sidra.name) ?? []}
          renderInput={(params) => <TextField {...params} label="Show" />}
          className="w-full"
          onChange={(e) => {
            const element = e.target as HTMLElement;

            const sidra = sdarot?.find(
              (sidra) => sidra.name === element.innerText,
            );

            setShowId(sidra?.id);
          }}
        />
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
          className="h-fit w-fit border px-4 py-2"
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
