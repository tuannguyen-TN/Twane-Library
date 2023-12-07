import React from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import {
  useDeleteBookMutation,
  useFetchSingleBookQuery,
} from '../redux/queries/bookQueries'
import { Author } from '../types/Author'
import { Category } from '../types/Category'

const SingleBookPage = () => {
  const params = useParams()
  const bookId = params.id
  const { data, isLoading, isError } = useFetchSingleBookQuery(bookId as string)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )

  //   const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation()
  const isUpdating = false

  return (
    <div>
      {isLoading && <LinearProgress />}
      {isError && (
        <Typography variant="h4">
          Item not found. Click <Link to="/">here</Link> to get back to
          homepage.
        </Typography>
      )}
      {data && (
        <Stack
          key={data._id}
          direction="row"
          alignItems="flex-start"
          spacing={5}
        >
          <Card
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: '56.25%',
              }}
              image={data.img}
            />
            <CardActions>
              {/* <Button
                size="small"
                disabled={isUpdating || isDeleting}
                onClick={() => dispatch(addToCart(data))}
              >
                <AddShoppingCartIcon />
              </Button> */}
              {/* <ProductMutationFormDialog
                product={data}
                disabled={
                  user === null ||
                  user.role !== 'admin' ||
                  isUpdating ||
                  isDeleting
                }
                action="Update"
                onSubmit={updateProduct}
              /> */}
              <Button
                size="small"
                disabled={
                  user === null ||
                  user.role[0].title !== 'admin' ||
                  isUpdating ||
                  isDeleting
                }
                onClick={() =>
                  deleteBook({
                    bookId: data._id,
                    token: authorizedToken?.accessToken as string,
                  }).then(() => navigate('/books'))
                }
              >
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
          <Stack direction="column" spacing={5} alignItems="flex-start">
            <Typography variant="h3">{data.title}</Typography>
            <Stack direction="column" justifyContent="space-between">
              {data.author.map((author: Author) => (
                <Typography key={author._id}>- {author.fullName}</Typography>
              ))}
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={10}
            >
              <Typography variant="h6">ISBN</Typography>
              <Typography>{data.ISBN}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={8.5}
            >
              <Typography variant="h6">Edition</Typography>
              <Typography>{data.edition}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={6}
            >
              <Typography variant="h6">Publisher</Typography>
              <Typography>{data.publisher}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={4}
            >
              <Typography variant="h6">Description</Typography>
              <Typography>{data.description}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={6.5}
            >
              <Typography variant="h6">Category</Typography>
              <Stack direction="column" justifyContent="space-between">
                {data.category.map((category: Category) => (
                  <Typography key={category._id}>{category.name}</Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  )
}

export default SingleBookPage
