import { Role } from './Role'

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  address: string
  phoneNumber: string
  avatar: string
  password: string
  role: Role[]
}
