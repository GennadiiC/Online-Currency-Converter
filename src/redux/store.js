import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { forexApi } from './forexApi'
import { symbolsApi } from './symbolsApi'
import forexReducer from './forexSlice'

export const store = configureStore({
  reducer: {
    forex: forexReducer,
    [forexApi.reducerPath]: forexApi.reducer,
    [symbolsApi.reducerPath]: symbolsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(forexApi.middleware, symbolsApi.middleware)
})

setupListeners(store.dispatch)