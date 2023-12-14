import { Book } from './Book'

export type BorrowItem = {
  borrowed_Date: string
  returned_Date?: string
  book: Book
  returned: boolean
}
