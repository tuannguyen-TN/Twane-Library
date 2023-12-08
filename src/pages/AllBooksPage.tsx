import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Pagination,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import {
  useCreateBookMutation,
  useFetchAllBooksQuery,
} from '../redux/queries/bookQueries'
import { Category } from '../types/Category'
import { BASE_URL } from '../common/common'
import { CategoriesContext } from '../contexts/CategoriesContext'
import BookListDisplay from '../components/BookListDisplay'
import CategoryMenu from '../components/CategoryMenu'
import SortingOptionsMenu from '../components/SortingOptionsMenu'
import ItemPerPageMenu from '../components/ItemPerPageMenu'
import { FilterBooksOptions } from '../types/FilterBooksOptions'
import BookMutationFormDialog from '../components/BookMutationFormDialog'
import { Book } from '../types/Book'
import { StateType } from '../redux/store/store'
import { useAppSelector } from '../hooks/useAppSelector'

const AllBooksPage = () => {
  const { user } = useAppSelector((state: StateType) => state.userReducer)

  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [filterOptions, setFilterOptions] = useState<FilterBooksOptions>({
    page: 1,
    perPage: 6,
    search: '',
    sortOrder: '',
    authorName: '',
    categoryName: '',
  })

  const { data, isLoading, error } = useFetchAllBooksQuery(filterOptions)
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation()

  const fetchAllCategories = async () => {
    const res = await axios.get<Category[]>(`${BASE_URL}/categories`)
    setAllCategories(res.data)
  }

  useEffect(() => {
    fetchAllCategories()
    setLoadingCategories(false)
  }, [])

  return (
    <div>
      {loadingCategories ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <CategoriesContext.Provider value={allCategories}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Stack
                direction="row"
                alignItems="baseline"
                spacing={2}
                sx={{ pb: 4 }}
              >
                <TextField
                  label="Book title"
                  variant="standard"
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      search: e.target.value,
                    })
                  }
                />
                <CategoryMenu
                  isMultiple={false}
                  containsNone={true}
                  value={filterOptions.categoryName}
                  onChange={(e: SelectChangeEvent<string | string[]>) =>
                    setFilterOptions({
                      ...filterOptions,
                      categoryName: e.target.value as string,
                    })
                  }
                />
                <SortingOptionsMenu
                  trends={[
                    { id: 'asc', trend: 'A → Z' },
                    { id: 'desc', trend: 'Z → A' },
                  ]}
                  value={filterOptions.sortOrder}
                  onChange={(e: SelectChangeEvent) =>
                    setFilterOptions({
                      ...filterOptions,
                      sortOrder: e.target.value,
                    })
                  }
                />
                <ItemPerPageMenu
                  quantities={[6, 15, 30, 45]}
                  value={filterOptions.perPage}
                  onChange={(e: SelectChangeEvent) =>
                    setFilterOptions({
                      ...filterOptions,
                      perPage: Number(e.target.value),
                    })
                  }
                />
              </Stack>
              <BookMutationFormDialog
                book={{} as unknown as Book}
                disabled={
                  user === null || user.role[0].title !== 'Admin' || isCreating
                }
                action="Create"
                onSubmit={createBook}
              />
            </Stack>
            {isLoading && (
              <Skeleton variant="rectangular" width="100%" height={400} />
            )}
            {error && <Typography variant="h4">Items not found.</Typography>}
            {data && <BookListDisplay books={data.data} />}
            {data && (
              <Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
                <Pagination
                  count={data?.totalPageCount}
                  size="large"
                  showFirstButton
                  showLastButton
                  page={data?.page}
                  onChange={(e: React.ChangeEvent<unknown>, value: number) =>
                    setFilterOptions({
                      ...filterOptions,
                      page: value,
                    })
                  }
                />
              </Stack>
            )}
          </Box>
        </CategoriesContext.Provider>
      )}
    </div>
  )
}

export default AllBooksPage
