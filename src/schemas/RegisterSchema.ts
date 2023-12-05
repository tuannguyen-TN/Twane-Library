import * as yup from 'yup'

export const RegisterSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    phoneNumber: yup.string().required(),
    avatar: yup.string().url(),
  })
  .required()
