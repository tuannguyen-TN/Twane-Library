import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../common/common'
import { Cart } from '../../types/Cart'

const cartQueries = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/cart`,
  }),
  tagTypes: ['CartItem'],
  endpoints: (builder) => ({
    fetchCart: builder.query<Cart, { token: string }>({
      query: ({ token }) => ({
        url: '',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.books.map(({ _id }) => ({
                type: 'CartItem' as const,
                _id,
              })),
              { type: 'CartItem', id: 'LIST' },
            ]
          : [{ type: 'CartItem', id: 'LIST' }],
    }),
    addToCart: builder.mutation<Cart, { book_id: string; token: string }>({
      query: ({ book_id, token }) => ({
        url: '',
        method: 'PUT',
        body: { book_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'CartItem', id: 'LIST' }],
    }),
    removeFromCart: builder.mutation<
      boolean,
      { bookId: string; token: string }
    >({
      query: ({ bookId, token }) => ({
        url: `${bookId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['CartItem'],
    }),
    checkout: builder.mutation<{ acknowledged: boolean }, { token: string }>({
      query: ({ token }) => ({
        url: '',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['CartItem'],
    }),
  }),
})

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useCheckoutMutation,
} = cartQueries
export default cartQueries
