import { AuthorizedToken } from './AuthorizedToken'
import { User } from './User'

export type UserReducerState = {
  user: User | null
  fetching: boolean
  loggingIn: boolean
  isLoggedIn: boolean
  authorizedToken: AuthorizedToken | null
  error: string
}
