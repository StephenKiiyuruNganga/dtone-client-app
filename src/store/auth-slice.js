import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token
    },
    updateUserInfo(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.token = null
    },
  },
})

export const AUTH_ACTIONS = authSlice.actions

export default authSlice.reducer
