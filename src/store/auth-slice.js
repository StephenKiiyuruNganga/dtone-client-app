import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    updateToken(state, action) {
      state.token = action.payload
    },
    updateUserInfo(state, action) {
      state.user = action.payload
    },
  },
})

export const AUTH_ACTIONS = authSlice.actions

export default authSlice.reducer
