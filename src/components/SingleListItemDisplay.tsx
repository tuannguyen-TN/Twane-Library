import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
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
  TextField,
  Typography,
} from '@mui/material'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { Book } from '../types/Book'
import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '../redux/queries/bookQueries'
import BookMutationFormDialog from './BookMutationFormDialog'

interface Props {
  item: Book
}

const SingleListItemDisplay = ({ item }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation()
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()

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
          {/* <Button
            size="small"
            disabled={isUpdating || isDeleting}
            onClick={() => dispatch(addToCart(item))}
          >
            <AddShoppingCartIcon />
          </Button> */}
          <BookMutationFormDialog
            book={item}
            disabled={
              user === null ||
              user.role[0].title !== 'Admin' ||
              isUpdating ||
              isDeleting
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
              isDeleting
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
          {/* {featuredProducts.findIndex(
            (product: Product) => item.id === product.id
          ) > -1 ? (
            user && user.role === 'admin' ? (
              <Button
                size="small"
                disabled={
                  user === null ||
                  user.role !== 'admin' ||
                  isUpdating ||
                  isDeleting
                }
                onClick={() => dispatch(removeFeaturedProduct(item.id))}
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
                user.role !== 'admin' ||
                isUpdating ||
                isDeleting
              }
              onClick={() => dispatch(addFeaturedProduct(item as Product))}
            >
              <StarBorderIcon />
            </Button>
          )} */}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SingleListItemDisplay
