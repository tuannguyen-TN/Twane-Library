import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { UserReducerState } from '../../types/UserReducerState'
import { User } from '../../types/User'
import { AuthorizedToken } from '../../types/AuthorizedToken'
import { UserCredentials } from '../../types/UserCredentials'
import { BASE_URL } from '../../common/common'

export const initialUserState: UserReducerState = {
  user: null,
  fetching: false,
  loggingIn: false,
  isLoggedIn: false,
  authorizedToken: null,
  error: '',
}

export const userLogin = createAsyncThunk<
  AuthorizedToken,
  UserCredentials,
  { rejectValue: string }
>(
  'user/userLogin',
  async ({ email, password }: UserCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/signin`, {
        email,
        password,
      })
      return res.data
    } catch (e) {
      const err = e as Error
      return rejectWithValue(err.message)
    }
  }
)

export const fetchSingleUserInfo = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>(
  'user/fetchSingleUserInfo',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res.data
    } catch (e) {
      const err = e as Error
      return rejectWithValue(err.message)
    }
  }
)

export const userRegister = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('user/userRegister', async (newUser: Partial<User>, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, newUser)
    return res.data
  } catch (e) {
    const err = e as Error
    return rejectWithValue(err.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    userLogout: (state) => {
      return Object.assign(state, initialUserState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        authorizedToken: action.payload,
      }
    })
    builder.addCase(userLogin.pending, (state, action) => {
      return {
        ...state,
        loggingIn: true,
        error: '',
      }
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          loggingIn: false,
          error: action.payload,
        }
      }
    })
    builder.addCase(fetchSingleUserInfo.fulfilled, (state, action) => {
      return {
        ...state,
        fetching: false,
        user: action.payload,
      }
    })
    builder.addCase(fetchSingleUserInfo.pending, (state, action) => {
      return {
        ...state,
        fetching: true,
        error: '',
      }
    })
    builder.addCase(fetchSingleUserInfo.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {})
    builder.addCase(userRegister.pending, (state, action) => {})
    builder.addCase(userRegister.rejected, (state, action) => {})
  },
})

const userReducer = userSlice.reducer
export const { userLogout } = userSlice.actions
export default userReducer
