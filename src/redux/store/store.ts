import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import userReducer, { initialUserState } from '../reducers/userReducer'
import { UserReducerState } from '../../types/UserReducerState'
import bookQueries from '../queries/bookQueries'

const preLoadedUserReducer: UserReducerState = JSON.parse(
  localStorage.getItem('user') || JSON.stringify(initialUserState)
)

export const createStore = () =>
  configureStore({
    reducer: {
      userReducer,
      [bookQueries.reducerPath]: bookQueries.reducer,
    },
    preloadedState: {
      // cartReducer: preLoadedCartReducer,
      // productsReducer: {
      //   ...initialProductsState,
      //   featuredProducts: preLoadedFeaturedProducts,
      // },
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bookQueries.middleware),
  })

const store = createStore()

const updateLocalStorage = () => {
  // const cart = store.getState().cartReducer
  // const featuredProducts = store.getState().productsReducer.featuredProducts
  const userCredentials = store.getState().userReducer

  // localStorage.setItem('cart', JSON.stringify(cart))
  // localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts))
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
