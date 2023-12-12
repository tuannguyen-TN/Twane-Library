import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import {
  Box,
  Container,
  CssBaseline,
  Skeleton,
  Typography,
} from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import axios from 'axios'

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
import { Author } from './types/Author'
import { Category } from './types/Category'
import { BASE_URL } from './common/common'
import { AuthorsCategoriesContext } from './contexts/AuthorsCategoriesContext'
import { useFetchAllCategoriesQuery } from './redux/queries/categoryQueries'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)
  const [allAuthors, setAllAuthors] = useState<Author[]>([])
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(true)

  const fetchAllAuthors = async () => {
    const res = await axios.get<Author[]>(`${BASE_URL}/authors`)
    setAllAuthors(res.data)
  }

  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useFetchAllCategoriesQuery()

  useEffect(() => {
    fetchAllAuthors()
    setLoadingAuthors(false)
  }, [])

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
            {categoriesError && (
              <Typography variant="h4">
                Failed to load list of authors and categories.
              </Typography>
            )}
            {(categoriesLoading || loadingAuthors) && (
              <Skeleton variant="rectangular" width="100%" height={400} />
            )}
            {allAuthors && allCategories && (
              <AuthorsCategoriesContext.Provider
                value={{
                  authors: allAuthors,
                  categories: allCategories as Category[],
                }}
              >
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
              </AuthorsCategoriesContext.Provider>
            )}
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
