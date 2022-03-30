import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataReducer'
import createSagaMiddleware  from '@redux-saga/core'

export const middleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    data: dataReducer
  },
  middleware: [middleware]
})

export type RootState = ReturnType<typeof store.getState>