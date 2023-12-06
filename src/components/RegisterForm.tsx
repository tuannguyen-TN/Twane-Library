import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { User } from '../types/User'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { userRegister } from '../redux/reducers/userReducer'
import { RegisterSchema } from '../schemas/RegisterSchema'

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFormSubmit = async (data: Partial<User>) => {
    const newUser: Partial<User> = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      email: data.email as string,
      password: data.password as string,
      confirmPassword: data.confirmPassword as string,
      address: data.email as string,
      phoneNumber: data.email as string,
      avatar: data.avatar
        ? data.avatar
        : `https://ui-avatars.com/api/?name=${data.firstName?.replaceAll(
            /\s/g,
            '%20'
          )}${data.lastName?.replaceAll(/\s/g, '%20')}`,
    }

    const res = await dispatch(userRegister(newUser))
    console.log(res)

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Signed up successfully!')
      navigate('/login')
    } else {
      toast.error(res.payload?.toString())
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="First name"
              {...register('firstName')}
            />
            {errors.firstName && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.firstName?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Last name"
              {...register('lastName')}
            />
            {errors.lastName && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.lastName?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Email address"
              {...register('email')}
            />
            {errors.email && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.email?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.password?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Confirm password"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.confirmPassword?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Address"
              {...register('address')}
            />
            {errors.address && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.address?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Phone number"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'red',
                }}
              >
                {errors.phoneNumber?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="Avatar (blank for default)"
              {...register('avatar')}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
