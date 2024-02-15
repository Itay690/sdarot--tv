import { SubmitHandler, useForm } from 'react-hook-form';
import { useUploadMutation } from '../store/services/sdarot.api';

export const Upload: React.FC = () => {
  const [upload] = useUploadMutation({ fixedCacheKey: 'upload' });
  const { register, handleSubmit, getValues } = useForm<{ file: File }>();

  const onSubmit: SubmitHandler<{ file: File }> = (data) => upload(data);

  console.log(getValues());

  return (
    <div className="flex h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="file">Upload Here</label>
        <input type="file" id="file" {...register('file')} />

        <input type="submit" />
      </form>
    </div>
  );
};
