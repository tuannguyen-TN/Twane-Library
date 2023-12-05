import { Avatar, Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'

const LoginPage = () => {
  const { isLoggedIn } = useAppSelector((state: StateType) => state.userReducer)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {isLoggedIn ? (
        <Typography margin="normal" variant="h4">
          You are already logged in!
        </Typography>
      ) : (
        <div>
          <LoginForm />
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              {"Don't have an account? Sign Up"}
            </Typography>
          </Link>
        </div>
      )}
    </Box>
  )
}

export default LoginPage
