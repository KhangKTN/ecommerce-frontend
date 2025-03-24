import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCategoryList = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
    const res = await apis.getCategories()
    if (!res.success) return rejectWithValue(res)
    return res.data
})
