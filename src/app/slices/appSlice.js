import { createSlice } from '@reduxjs/toolkit'
import * as actions from '../actions/appAction'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
        errMessage: ''
    },
    extraReducers: (builder) => {
        // Case is getting data
        builder.addCase(actions.getCategoryList.pending, (state) => {
            state.isLoading = true
        })
        // Case success
        builder.addCase(actions.getCategoryList.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload // Assign returned data from async action
        })
        // Case error
        builder.addCase(actions.getCategoryList.rejected, (state, action) => {
            state.isLoading = false
            state.errMessage = action.payload
        })
    }
})

export default appSlice.reducer
