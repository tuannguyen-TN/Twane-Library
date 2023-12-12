import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../common/common'
import { Author } from '../../types/Author'

const authorQueries = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/authors`,
  }),
  tagTypes: ['Author'],
  endpoints: (builder) => ({
    fetchAllAuthors: builder.query<Author[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Author' as const,
                _id,
              })),
              { type: 'Author', id: 'LIST' },
            ]
          : [{ type: 'Author', id: 'LIST' }],
    }),
  }),
})

export const { useFetchAllAuthorsQuery } = authorQueries
export default authorQueries
