import { SubmitHandler, useForm } from 'react-hook-form';

export const Upload: React.FC = () => {
  const { register, handleSubmit } = useForm<{ file: File }>();

  const onSubmit: SubmitHandler<{ file: File }> = (data) => console.log(data);

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
