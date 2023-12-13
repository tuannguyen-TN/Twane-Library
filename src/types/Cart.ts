import { Book } from './Book'

export type Cart = {
  _id: string
  cart_id: string
  books: Book[]
}
