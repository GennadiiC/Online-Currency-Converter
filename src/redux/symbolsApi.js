import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// rtk query setup for fetching currrency symbols
export const symbolsApi = createApi({
  reducerPath: 'symbolsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/currency/' }),
  endpoints: builder => ({
    getSymbol: builder.query({
      query: (query) => `${query}`
    })
  })
})

export const { useGetSymbolQuery } = symbolsApi