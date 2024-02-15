import { serverApi } from './server.api';

export const sdarotApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getSdarot: build.query<{ name: string; seasons: number }[], void>({
      query: () => 'sdarot',
    }),
    upload: build.mutation<void, { file: File }>({
      query: (body) => ({
        url: 'sdarot/upload',
        body,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetSdarotQuery, useUploadMutation } = sdarotApi;
