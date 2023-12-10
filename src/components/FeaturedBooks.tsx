import { Box, Typography } from '@mui/material'

import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import BookListDisplay from './BookListDisplay'

const FeaturedBooks = () => {
  const featuredBooks = useAppSelector(
    (state: StateType) => state.featuredBooksReducer
  )

  return (
    <Box>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        Featured Books
      </Typography>
      <BookListDisplay books={featuredBooks} />
    </Box>
  )
}

export default FeaturedBooks
