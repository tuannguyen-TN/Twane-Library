import { createContext } from 'react'

import { Category } from '../types/Category'
import { Author } from '../types/Author'

export const AuthorsCategoriesContext = createContext<{
  authors: Author[]
  categories: Category[]
} | null>(null)
