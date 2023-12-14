import React from 'react'
import { Box, Grid, Skeleton, Typography } from '@mui/material'

import { useFetchBorrowsQuery } from '../redux/queries/borrowQueries'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { BorrowItem } from '../types/BorrowItem'
import BorrowItemDisplay from '../components/BorrowItemDisplay'

const MyBorrowsPage = () => {
  const { authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )

  const {
    data: borrows,
    isLoading,
    error,
  } = useFetchBorrowsQuery({ token: authorizedToken?.accessToken as string })

  return (
    <Box>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        My Borrows
      </Typography>
      <Grid container spacing={4} py={5}>
        {isLoading && (
          <Skeleton variant="rectangular" width="100%" height={400} />
        )}
        {error && (
          <Box>
            <Typography variant="h4">
              Error fetching your borrow data.
            </Typography>
          </Box>
        )}
        {borrows &&
          (borrows.history.length > 0 ? (
            borrows.history.map((item: BorrowItem) => (
              <BorrowItemDisplay
                item={item}
                key={item.book._id + Math.random().toString()}
              />
            ))
          ) : (
            <Box>
              <Typography variant="h4">
                You have no book borrows. Let's borrow some books.
              </Typography>
            </Box>
          ))}
      </Grid>
    </Box>
  )
}

export default MyBorrowsPage
