import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BookMutationOptions } from './../../types/BookMutationOptions'
import { BASE_URL } from '../../common/common'
import { AllBooksApiResponse } from '../../types/AllBooksApiResponse'
import { Book } from '../../types/Book'
import { FilterBooksOptions } from '../../types/FilterBooksOptions'

const bookQueries = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/books`,
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query<AllBooksApiResponse, FilterBooksOptions>({
      query: (filterOptions) =>
        `?filter=1&perPage=${filterOptions.perPage}&page=${
          filterOptions.page
        }&search=${filterOptions.search}${
          filterOptions.categoryName
            ? '&categoryName=' + filterOptions.categoryName.split(' ')[1]
            : ''
        }${
          filterOptions.authorName
            ? '&authorName=' + filterOptions.authorName.split('  ')[1]
            : ''
        }${
          filterOptions.sortOrder
            ? '&sortBy=title&sortOrder=' + filterOptions.sortOrder
            : ''
        }`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Book' as const,
                _id,
              })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),
    fetchSingleBook: builder.query<Book, string>({
      query: (bookId) => `${bookId}`,
    }),
    deleteBook: builder.mutation<boolean, { bookId: string; token: string }>({
      query: ({ bookId, token }) => ({
        url: `${bookId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Book'],
    }),
    createBook: builder.mutation<
      Book,
      { newBook: BookMutationOptions; token: string }
    >({
      query: ({ newBook, token }) => ({
        url: '',
        method: 'POST',
        body: { ...newBook, category: newBook.category.toString() },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),
    updateBook: builder.mutation<
      Book,
      Pick<Book, '_id'> & BookMutationOptions & { __v: Number; token: string }
    >({
      query: ({ _id, token, __v, ...newValues }) => ({
        url: `${_id}`,
        method: 'PUT',
        body: { ...newValues, category: newValues.category.toString() },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookQueries.util.updateQueryData(
            'fetchSingleBook',
            _id,
            (draft: Book) => {
              Object.assign(draft, patch)
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),
  }),
})

export const {
  useFetchAllBooksQuery,
  useFetchSingleBookQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
} = bookQueries
export default bookQueries
