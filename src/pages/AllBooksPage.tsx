import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useFetchAllBooksQuery } from '../redux/queries/bookQueries'
import { Category } from '../types/Category'
import { BASE_URL } from '../common/common'
import {
  Box,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CategoriesContext } from '../contexts/CategoriesContext'
import BookListDisplay from '../components/BookListDisplay'
import CategoryMenu from '../components/CategoryMenu'
import SortingOptionsMenu from '../components/SortingOptionsMenu'
import ItemPerPageMenu from '../components/ItemPerPageMenu'

const AllBooksPage = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)

  const { data, isLoading, error } = useFetchAllBooksQuery()

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
                <TextField label="Product title" variant="standard" />
                <CategoryMenu
                  value={''}
                  onChange={(e: SelectChangeEvent) => {}}
                />
                <SortingOptionsMenu
                  trends={['Ascending', 'Descending']}
                  value={''}
                  onChange={(e: SelectChangeEvent) => {}}
                />
                <ItemPerPageMenu
                  quantities={[6, 15, 30, 45]}
                  value={''}
                  onChange={(e: SelectChangeEvent) => {}}
                />
              </Stack>
              {/* <ProductMutationFormDialog
                product={{} as unknown as Product}
                disabled={user === null || user.role !== 'admin' || isCreating}
                action="Create"
                onSubmit={createProduct}
              /> */}
            </Stack>
            {isLoading && (
              <Skeleton variant="rectangular" width="100%" height={400} />
            )}
            {error && <Typography variant="h4">Items not found.</Typography>}
            {data && <BookListDisplay books={data.data} />}
          </Box>
        </CategoriesContext.Provider>
      )}
    </div>
  )
}

export default AllBooksPage
