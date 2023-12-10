import React from 'react'
import { useParams } from 'react-router'
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
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { toast } from 'react-toastify'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useFetchSingleBookQuery } from '../redux/queries/bookQueries'
import { Author } from '../types/Author'
import { Category } from '../types/Category'
import {
  addFeaturedBook,
  removeFeaturedBook,
} from '../redux/reducers/featuredBooksReducer'
import { Book } from '../types/Book'

const SingleBookPage = () => {
  const params = useParams()
  const bookId = params.id
  const { data, isLoading, isError } = useFetchSingleBookQuery(bookId as string)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: StateType) => state.userReducer)
  const featuredBooks = useAppSelector(
    (state: StateType) => state.featuredBooksReducer
  )

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
          key={data._id + Math.random().toString()}
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
              {featuredBooks.findIndex((book: Book) => data._id === book._id) >
              -1 ? (
                user && user.role[0].title === 'Admin' ? (
                  <Button
                    size="small"
                    disabled={user === null || user.role[0].title !== 'Admin'}
                    onClick={() => dispatch(removeFeaturedBook(data._id))}
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
                  disabled={user === null || user.role[0].title !== 'Admin'}
                  onClick={() => dispatch(addFeaturedBook(data as Book))}
                >
                  <StarBorderIcon />
                </Button>
              )}
            </CardActions>
          </Card>
          <Stack direction="column" spacing={5} alignItems="flex-start">
            <Typography variant="h3">{data.title}</Typography>
            <Stack direction="column" justifyContent="space-between">
              {data.author.map((author: Author) => (
                <Typography key={author._id + Math.random().toString()}>
                  - {author.fullName}
                </Typography>
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
                {data.category && data.category[0].name
                  ? data.category.map((category: Category) => (
                      <Typography key={category._id + Math.random().toString()}>
                        {category.name}
                      </Typography>
                    ))
                  : null}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  )
}

export default SingleBookPage
