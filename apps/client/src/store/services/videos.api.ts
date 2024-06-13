import { videos } from '@prisma/client';
import { serverApi } from './server.api';

export const videosApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    upload: build.mutation<videos, FormData>({
      query: (body) => ({
        url: 'videos/upload',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['videos'],
    }),
    getAllVideos: build.query<
      (videos & { filename: string; uploadDate: Date })[],
      void
    >({
      query: () => ({ url: 'videos/get-all', method: 'GET' }),
      providesTags: ['videos'],
    }),
    getOneVideos: build.query<
      {
        _id: string;
        length: number;
        chunkSize: number;
        uploadDate: string;
        filename: string;
        contentType: string;
      },
      string
    >({
      query: (fileId) => ({ url: `videos/get-one/${fileId}`, method: 'GET' }),
      providesTags: ['videos'],
    }),
  }),
  overrideExisting: true,
});

export const { useUploadMutation, useGetAllVideosQuery, useGetOneVideosQuery } =
  videosApi;
