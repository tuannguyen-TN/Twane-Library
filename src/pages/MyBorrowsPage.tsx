import React, { useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

  const [showReturnedBooks, setShowReturnedBooks] = useState<boolean>(false)

  return (
    <Box>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        My Borrows
      </Typography>
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height={400} />
      )}
      {error && (
        <Box>
          <Typography variant="h4">Error fetching your borrow data.</Typography>
        </Box>
      )}
      <Stack direction="column" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Borrowing</Typography>
          <Grid container spacing={4} py={5}>
            {borrows &&
            borrows.history.filter((item) => !item.returned).length > 0 ? (
              borrows.history
                .filter((item) => !item.returned)
                .map((item: BorrowItem) => (
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
            )}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h4">
            <Button onClick={() => setShowReturnedBooks((prev) => !prev)}>
              {showReturnedBooks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            Returned
          </Typography>
          {showReturnedBooks && (
            <Grid container spacing={4} py={5}>
              {borrows &&
              borrows.history.filter((item) => item.returned).length > 0 ? (
                borrows.history
                  .filter((item) => item.returned)
                  .map((item: BorrowItem) => (
                    <BorrowItemDisplay
                      item={item}
                      key={item.book._id + Math.random().toString()}
                    />
                  ))
              ) : (
                <Box>
                  <Typography variant="h4">History is clear!</Typography>
                </Box>
              )}
            </Grid>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default MyBorrowsPage
