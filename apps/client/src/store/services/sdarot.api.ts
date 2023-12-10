import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sdarotApi = createApi({
  reducerPath: 'sdarotApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getSdarot: builder.query<{ name: string; seasons: number }[], void>({
      query: () => 'sdarot',
    }),
  }),
});

export const { useGetSdarotQuery } = sdarotApi;
