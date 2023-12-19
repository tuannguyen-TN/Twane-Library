import { useContext } from 'react'

import { AuthorsCategoriesContext } from '../contexts/AuthorsCategoriesContext'

export const useAuthorsCategoriesContext = () => {
  const authorsCategoriesContext = useContext(AuthorsCategoriesContext)
  if (!authorsCategoriesContext) {
    throw new Error(
      'authorsCategoriesContext must be inside a CategoriesContext.Provider'
    )
  }
  return authorsCategoriesContext
}
