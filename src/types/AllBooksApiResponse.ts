import { Book } from './Book'

export type AllBooksApiResponse = {
  perPage: number
  page: number
  totalCount: number
  totalPageCount: number
  data: Book[]
}
