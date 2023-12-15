import { Author } from './Author'
import { Category } from './Category'

export type Book = {
  _id: string
  ISBN: string
  title: string
  edition: string
  category: Category[]
  description: string
  publisher: string
  author: Author[]
  img: string
  availableCopies: {
    total: number
  }[]
}
