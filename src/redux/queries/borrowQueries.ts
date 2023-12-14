import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../common/common'
import { BorrowItem } from '../../types/BorrowItem'
import { BorrowApiResponse } from '../../types/BorrowApiResponse'

const borrowQueries = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/books`,
  }),
  tagTypes: ['BorrowItem'],
  endpoints: (builder) => ({
    fetchBorrows: builder.query<BorrowApiResponse, { token: string }>({
      query: ({ token }) => ({
        url: 'history',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.history.map(({ book }) => ({
                type: 'BorrowItem' as const,
                _id: book._id,
              })),
              { type: 'BorrowItem', id: 'LIST' },
            ]
          : [{ type: 'BorrowItem', id: 'LIST' }],
    }),
    returnBorrow: builder.mutation<
      BorrowItem,
      { bookId: string; token: string }
    >({
      query: ({ bookId, token }) => ({
        url: 'return',
        method: 'POST',
        body: { id: [bookId] },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['BorrowItem'],
    }),
  }),
})

export const { useFetchBorrowsQuery, useReturnBorrowMutation } = borrowQueries
export default borrowQueries
