import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { forexApi } from './forexApi'
import forexReducer from './forexSlice'

export const store = configureStore({
  reducer: {
    forex: forexReducer,
    [forexApi.reducerPath]: forexApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(forexApi.middleware)
})

setupListeners(store.dispatch)