import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import StarIcon from '@mui/icons-material/Star'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'

import { BorrowItem } from '../types/BorrowItem'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { Book } from '../types/Book'
import { removeFeaturedBook } from '../redux/reducers/featuredBooksReducer'
import { useReturnBorrowMutation } from '../redux/queries/borrowQueries'

interface Props {
  item: BorrowItem
}

const BorrowItemDisplay = ({ item }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )
  const featuredBooks = useAppSelector(
    (state: StateType) => state.featuredBooksReducer
  )

  const [returnBook, { isLoading: isReturning }] = useReturnBorrowMutation()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image={item.book.img}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {item.book.title}
            </Typography>
          </Stack>
          <Typography>
            Borrowed on:{' '}
            {new Date(item.borrowed_Date).toISOString().substring(0, 10)}
          </Typography>
          {item.returned_Date && (
            <Typography>
              Returned on:{' '}
              {new Date(item.returned_Date as string)
                .toISOString()
                .substring(0, 10)}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(`/books/${item.book._id}`)}
          >
            Learn More
          </Button>
          <Button
            size="small"
            disabled={Boolean(item.returned_Date) || isReturning}
            onClick={() =>
              returnBook({
                bookId: item.book._id,
                token: authorizedToken?.accessToken as string,
              })
            }
          >
            Return Book
          </Button>
          {featuredBooks.findIndex((book: Book) => item.book._id === book._id) >
            -1 &&
            (user && user.role[0].title === 'Admin' ? (
              <Button
                size="small"
                disabled={
                  user === null || user.role[0].title !== 'Admin' || isReturning
                }
                onClick={() => dispatch(removeFeaturedBook(item.book._id))}
              >
                <StarIcon />
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() =>
                  toast.error('Only admins can perform this action!')
                }
              >
                <StarIcon />
              </Button>
            ))}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BorrowItemDisplay
