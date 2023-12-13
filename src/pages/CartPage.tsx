import React, { useEffect } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import {
  useAddToCartMutation,
  useCheckoutMutation,
  useFetchCartQuery,
  useRemoveFromCartMutation,
} from '../redux/queries/cartQueries'
import { Book } from '../types/Book'
import SingleListItemDisplay from '../components/SingleListItemDisplay'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useNavigate } from 'react-router'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const CartPage = () => {
  const { authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!authorizedToken) {
      alert('You are not signed in to use this feature!')
      navigate('/')
    }
  }, [])

  const {
    data: cart,
    isLoading,
    error,
  } = useFetchCartQuery({ token: authorizedToken?.accessToken as string })

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation()
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation()

  const handleCheckout = () => {
    checkout({ token: authorizedToken?.accessToken as string })
      .unwrap()
      .then(() => toast.success('Books borrowed successfully!'))
      .catch(() => toast.error('Books borrowed unsuccessfully!'))
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Typography variant="h4">Your Book Basket</Typography>
        <Button
          disabled={!cart || cart.books.length === 0}
          variant="contained"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Stack>
      <Grid container spacing={4} py={5}>
        {isLoading && (
          <Skeleton variant="rectangular" width="100%" height={400} />
        )}
        {error && (
          <Box>
            {(error as FetchBaseQueryError).status === 404 ? (
              <Typography variant="h4">
                Your cart is empty. Add some books here.
              </Typography>
            ) : (
              <Typography variant="h4">
                Error fetching your cart data.
              </Typography>
            )}
          </Box>
        )}
        {cart &&
          cart.books.map((item: Book) => (
            <SingleListItemDisplay item={item} key={item._id} />
          ))}
      </Grid>
    </Box>
  )
}

export default CartPage
