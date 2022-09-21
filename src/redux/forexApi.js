import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// rtk query setup for fetching data from api
export const forexApi = createApi({
  reducerPath: 'forexApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host/'}),
  endpoints: builder => ({
    // separate query for conversion inputs
    getConvert: builder.query({
      query: ([first, second, amount]) => `convert?from=${first}&to=${second}&amount=${amount}`
    }),
    // separate query for header fluctation display
    getFluctation: builder.query({
      query: (queries) => `fluctuation?start_date=${queries[0]}&end_date=${queries[1]}&base=${queries[2]}`
    }),
    getLatest: builder.query({
      query: () => 'latest'
    })
  })
})

export const { 
  useGetConvertQuery, 
  useGetFluctationQuery,
  useGetLatestQuery 
} = forexApi