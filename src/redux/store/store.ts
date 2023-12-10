import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import userReducer, { initialUserState } from '../reducers/userReducer'
import { UserReducerState } from '../../types/UserReducerState'
import bookQueries from '../queries/bookQueries'
import featuredBooksReducer from '../reducers/featuredBooksReducer'

const preLoadedUserReducer: UserReducerState = JSON.parse(
  localStorage.getItem('user') || JSON.stringify(initialUserState)
)

const preLoadedFeaturedBooksReducer = JSON.parse(
  (localStorage.getItem('featuredBooks') as string) || JSON.stringify([])
)

export const createStore = () =>
  configureStore({
    reducer: {
      userReducer,
      [bookQueries.reducerPath]: bookQueries.reducer,
      featuredBooksReducer,
    },
    preloadedState: {
      // cartReducer: preLoadedCartReducer,
      featuredBooksReducer: preLoadedFeaturedBooksReducer,
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bookQueries.middleware),
  })

const store = createStore()

const updateLocalStorage = () => {
  // const cart = store.getState().cartReducer
  const featuredBooks = store.getState().featuredBooksReducer
  const userCredentials = store.getState().userReducer

  // localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem('featuredBooks', JSON.stringify(featuredBooks))
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...userCredentials,
    })
  )
}

store.subscribe(updateLocalStorage)
setupListeners(store.dispatch)

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
