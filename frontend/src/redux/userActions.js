import { createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, {rejectedWithValue, getState}) => {
    try {
        const state = getState();
        const token = state.auth.token;

        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile, status: ${response.status}`);
        }
    

        const data = await response.json();

        if (!data || !data.body) {
            throw new Error('Invalid profile data');
        }

        return data.body;
    } catch (error) {
        return rejectedWithValue(error.message);
    }
}
);