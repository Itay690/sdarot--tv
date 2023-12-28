import { serverApi } from './server.api';

export const sdarotApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getSdarot: build.query<{ name: string; seasons: number }[], void>({
      query: () => 'sdarot',
    }),
  }),
});

export const { useGetSdarotQuery } = sdarotApi;
