import { Grid } from '@mui/material'

import { Book } from '../types/Book'
import SingleListItemDisplay from './SingleListItemDisplay'

interface Props {
  books: Book[]
}

const BookListDisplay = ({ books }: Props) => {
  return (
    <Grid container spacing={4}>
      {books.map((item: Book) => (
        <SingleListItemDisplay item={item} key={item._id} />
      ))}
    </Grid>
  )
}

export default BookListDisplay
