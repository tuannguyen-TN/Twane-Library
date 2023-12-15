import React from 'react'
import {
  AppBar,
  Avatar,
  Badge,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { useThemeContext } from '../hooks/useThemeContext'
import MaterialUISwitch from './MaterialUISwitch'
import { userLogout } from '../redux/reducers/userReducer'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useFetchCartQuery } from '../redux/queries/cartQueries'
import { useFetchBorrowsQuery } from '../redux/queries/borrowQueries'

const Navbar = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeContext()
  const { isLoggedIn, user, authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: cart } = useFetchCartQuery({
    token: authorizedToken?.accessToken as string,
  })

  const { data: borrows } = useFetchBorrowsQuery({
    token: authorizedToken?.accessToken as string,
  })

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsDarkTheme) {
      setIsDarkTheme(event.target.checked)
    }
  }

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={5}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="inherit" noWrap>
              Home
            </Typography>
          </Link>
          <Link to="/books" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="inherit" noWrap>
              All books
            </Typography>
          </Link>
          {isLoggedIn && (
            <Link to="/borrows" style={{ textDecoration: 'none' }}>
              <Badge
                badgeContent={
                  (borrows &&
                    borrows.history.filter((item) => !item.returned).length) ||
                  0
                }
                showZero
                color="warning"
              >
                <Typography variant="h6" color="inherit" noWrap>
                  My borrows
                </Typography>
              </Badge>
            </Link>
          )}
        </Stack>
        <Stack direction="row" spacing={5}>
          <MaterialUISwitch
            checked={isDarkTheme}
            onChange={handleSwitchChange}
          />
          {isLoggedIn ? (
            <Stack direction="row" spacing={5}>
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Badge
                  badgeContent={(cart && cart.books.length) || 0}
                  showZero
                  color="warning"
                >
                  <Typography variant="h4" color="inherit" noWrap>
                    🧺
                  </Typography>
                </Badge>
              </Link>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Avatar src={user?.avatar} />
              </Link>
              <Link
                to="/"
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  dispatch(userLogout())
                  navigate('/')
                }}
              >
                <Typography variant="h6" color="inherit" noWrap>
                  Log out
                </Typography>
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={5}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="inherit" noWrap>
                  Sign up
                </Typography>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="inherit" noWrap>
                  Login
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
