import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import { ThemeContext } from './contexts/ThemeContext'
import ThemeDisplay from './components/ThemeDisplay'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import AllBooksPage from './pages/AllBooksPage'
import SingleBookPage from './pages/SingleBookPage'
import FeaturedBooks from './components/FeaturedBooks'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <ThemeDisplay>
          <CssBaseline />
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 4,
            }}
          >
            <Container maxWidth="md">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  OpenLibSys
                </Typography>
              </Link>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                A portal to look for books of any categories and/or authors of
                your choice, from Charles Dickens to Mark Twain.
              </Typography>
            </Container>
          </Box>

          <main style={{ minHeight: 'calc(100vh - 290px)' }}>
            <Container sx={{ py: 5 }} maxWidth="lg">
              <Routes>
                <Route path="/" element={<FeaturedBooks />} />
                <Route path="/books" element={<AllBooksPage />} />
                <Route path="/books">
                  <Route path=":id" element={<SingleBookPage />} />
                </Route>
                <Route path="/borrows" element={null} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={null} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Container>
          </main>

          <footer style={{ backgroundColor: 'gray' }}>
            <Footer />
          </footer>
        </ThemeDisplay>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
