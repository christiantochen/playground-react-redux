import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserDetail } from 'github';

export type UserListState = {
    loading: boolean;
    total_count?: number;
    total_page: number;
    current_page: number;
    incomplete_results?: boolean;
    items?: UserDetail[];
};

export const initialUserListState: UserListState = {
    loading: false,
    total_count: 0,
    total_page: 0,
    current_page: 0,
    incomplete_results: false,
    items: [],
};

export const searchUsers = createAsyncThunk(
    'users.search',
    async ({ username, page }: { username: string; page?: number }) => {
        const res = await axios.get('https://api.github.com/search/users', {
            params: { q: username, page },
        });

        return res.data;
    }
);

const userSlice = createSlice({
    name: 'Users',
    initialState: initialUserListState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                searchUsers.fulfilled,
                (
                    state: UserListState,
                    action: PayloadAction<UserListState>
                ) => {
                    state = { ...state, ...action.payload };
                    state.loading = false;
                    state.total_page = Math.round(state.total_count / 30);
                    return state;
                }
            )
            .addCase(searchUsers.pending, (state: UserListState) => {
                state.loading = true;
                return state;
            });
    },
});

const { reducer } = userSlice;

export default reducer;
