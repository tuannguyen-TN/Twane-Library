import { configureStore } from '@reduxjs/toolkit'

export const createStore = () =>
  configureStore({
    reducer: {},
  })

const store = createStore()

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
