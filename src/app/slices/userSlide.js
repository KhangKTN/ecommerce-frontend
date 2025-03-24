import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import * as actions from '../actions/userAction'

export const appSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.current = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrentUser.pending, (state) => {
            state.isLoading = true
        })
        // Case success
        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true // Assign returned data from async action
            state.current = action.payload
        })
        // Case error
        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false
            state.current = null
            state.isLoggedIn = false
            state.token = null
            toast.info('Login session expired. Please login again!')
        })
    }
})

export const { login, logout } = appSlice.actions
export default appSlice.reducer
