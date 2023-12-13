import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { Book } from '../types/Book'
import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '../redux/queries/bookQueries'
import BookMutationFormDialog from './BookMutationFormDialog'
import {
  addFeaturedBook,
  removeFeaturedBook,
} from '../redux/reducers/featuredBooksReducer'
import {
  useAddToCartMutation,
  useFetchCartQuery,
  useRemoveFromCartMutation,
} from '../redux/queries/cartQueries'

interface Props {
  item: Book
  cartDisplay: boolean
}

const SingleListItemDisplay = ({ item, cartDisplay }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )
  const featuredBooks = useAppSelector(
    (state: StateType) => state.featuredBooksReducer
  )

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation()
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()

  const { data: cart, error } = useFetchCartQuery({
    token: authorizedToken?.accessToken as string,
  })
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation()

  // console.log(
  //   // isUpdating ||
  //   // isDeleting ||
  //   // isAdding ||
  //   // (error && (error as FetchBaseQueryError).status !== 404) ||
  //   cart && cart.books.findIndex((book: Book) => book._id === item._id) < 0
  // )

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image={item.img}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Stack direction="column" justifyContent="space-between">
              {item.author.map((author) => (
                <Typography key={author._id}>{author.fullName}</Typography>
              ))}
            </Stack>
          </Stack>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/books/${item._id}`)}>
            <SearchIcon />
          </Button>
          {!cartDisplay ? (
            <>
              <Button
                size="small"
                disabled={
                  isUpdating ||
                  isDeleting ||
                  isAdding ||
                  (error && (error as FetchBaseQueryError).status !== 404) ||
                  (cart &&
                    cart.books.length > 0 &&
                    cart.books.findIndex(
                      (book: Book) => book._id === item._id
                    ) > -1)
                }
                onClick={() =>
                  addToCart({
                    book_id: item._id,
                    token: authorizedToken?.accessToken as string,
                  })
                }
              >
                <LibraryAddIcon />
              </Button>
              <BookMutationFormDialog
                book={item}
                disabled={
                  user === null ||
                  user.role[0].title !== 'Admin' ||
                  isUpdating ||
                  isDeleting ||
                  isAdding
                }
                action="Update"
                onSubmit={updateBook}
              />
              <Button
                size="small"
                disabled={
                  user === null ||
                  user.role[0].title !== 'Admin' ||
                  isUpdating ||
                  isDeleting ||
                  isAdding
                }
                onClick={() =>
                  deleteBook({
                    bookId: item._id,
                    token: authorizedToken?.accessToken as string,
                  })
                }
              >
                <DeleteIcon />
              </Button>
            </>
          ) : (
            <Button
              size="small"
              disabled={isRemoving}
              onClick={() =>
                removeFromCart({
                  bookId: item._id,
                  token: authorizedToken?.accessToken as string,
                })
              }
            >
              <DeleteIcon />
            </Button>
          )}
          {featuredBooks.findIndex((book: Book) => item._id === book._id) >
          -1 ? (
            user && user.role[0].title === 'Admin' ? (
              <Button
                size="small"
                disabled={
                  user === null ||
                  user.role[0].title !== 'Admin' ||
                  isUpdating ||
                  isDeleting ||
                  isAdding
                }
                onClick={() => dispatch(removeFeaturedBook(item._id))}
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
            )
          ) : (
            <Button
              size="small"
              disabled={
                user === null ||
                user.role[0].title !== 'Admin' ||
                isUpdating ||
                isDeleting ||
                isAdding
              }
              onClick={() => dispatch(addFeaturedBook(item as Book))}
            >
              <StarBorderIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SingleListItemDisplay
