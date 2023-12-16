import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import userReducer, { initialUserState } from '../reducers/userReducer'
import { UserReducerState } from '../../types/UserReducerState'
import bookQueries from '../queries/bookQueries'
import featuredBooksReducer from '../reducers/featuredBooksReducer'
import categoryQueries from '../queries/categoryQueries'
import authorQueries from '../queries/authorQueries'
import cartQueries from '../queries/cartQueries'
import borrowQueries from '../queries/borrowQueries'

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
      [authorQueries.reducerPath]: authorQueries.reducer,
      [bookQueries.reducerPath]: bookQueries.reducer,
      [borrowQueries.reducerPath]: borrowQueries.reducer,
      [categoryQueries.reducerPath]: categoryQueries.reducer,
      [cartQueries.reducerPath]: cartQueries.reducer,
      featuredBooksReducer,
    },
    preloadedState: {
      featuredBooksReducer: preLoadedFeaturedBooksReducer,
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authorQueries.middleware,
        bookQueries.middleware,
        borrowQueries.middleware,
        categoryQueries.middleware,
        cartQueries.middleware
      ),
  })

const store = createStore()

const updateLocalStorage = () => {
  const featuredBooks = store.getState().featuredBooksReducer
  const userCredentials = store.getState().userReducer

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
