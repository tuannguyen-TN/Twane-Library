import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { booksData } from '../../test/booksData'
import { Book } from '../../types/Book'

export const initialFeaturedBooksState: Book[] = booksData

const featuredBooksSlice = createSlice({
  name: 'featuredBooks',
  initialState: initialFeaturedBooksState,
  reducers: {
    addFeaturedBook: (state, action: PayloadAction<Book>) => {
      const foundIndex = state.findIndex(
        (item: Book) => item._id === action.payload._id
      )
      if (foundIndex === -1) {
        state.push(action.payload)
      }
    },
    removeFeaturedBook: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex(
        (item: Book) => item._id === action.payload
      )
      if (foundIndex > -1) {
        state.splice(foundIndex, 1)
      }
    },
  },
})

const featuredBooksReducer = featuredBooksSlice.reducer
export const { addFeaturedBook, removeFeaturedBook } =
  featuredBooksSlice.actions
export default featuredBooksReducer
