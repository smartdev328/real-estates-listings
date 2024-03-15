import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

type AuthSliceState = {
  user: User | null
  isLoggedin: boolean
}

const initialState: AuthSliceState = {
  user: null,
  isLoggedin: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },
    saveToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.isLoggedin = true
    },
    logout: (state) => {
      state.isLoggedin = false
      state.user = null
      localStorage.removeItem('token');
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser, logout, saveToken } = authSlice.actions

export default authSlice.reducer

