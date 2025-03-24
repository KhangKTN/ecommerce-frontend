import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCurrentUser = createAsyncThunk('app/user', async (data, { rejectWithValue }) => {
    const res = await apis.getCurrentUser()
    if (!res.success) return rejectWithValue(res)
    return res.data
})
