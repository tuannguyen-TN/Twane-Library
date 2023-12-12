import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../common/common'
import { Category } from '../../types/Category'

const categoryQueries = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/categories`,
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    fetchAllCategories: builder.query<Category[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Category' as const,
                _id,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const { useFetchAllCategoriesQuery } = categoryQueries
export default categoryQueries
