import { Shows } from '@prisma/client';
import { serverApi } from './server.api';

export const sdarotApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getSdarot: build.query<Shows[], void>({
      query: () => 'sdarot',
    }),
    upload: build.mutation<void, FormData>({
      query: (body) => ({
        url: 'sdarot/upload',
        body,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetSdarotQuery, useUploadMutation } = sdarotApi;
