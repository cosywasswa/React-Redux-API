/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=20';
const initialState = {
    users: [],
    isLoading: false,
    isError: undefined
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
    try {
        const resp = await axios.get(url);
        return resp.data.results;
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const usersSlice = createSlice({
    name: 'myUser',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isError = true;
        })
    }


});

export const { } = usersSlice.actions;
export default usersSlice.reducer;