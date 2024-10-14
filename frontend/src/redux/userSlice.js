import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './userActions';

export const updateUsername = createAsyncThunk(
    'user/updateUsername',
    async ({userName, firstName, lastName}, {rejectWithValue, getState}) => {
        const state = getState();
        const token = state.auth.token;
        console.log("Sending to API:", {userName, firstName, lastName});
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({userName, firstName, lastName}),
            });
            if (!response.ok) {
                throw new Error ('Failed to update username');
            }
            const data = await response.json();

            return data.body;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true; 
            state.profile = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUsername.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUsername.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(updateUsername.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {clearProfile} = userSlice.actions;
export {fetchUserProfile};
export default userSlice.reducer;