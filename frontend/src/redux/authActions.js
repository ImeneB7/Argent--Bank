import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk('auth/loginUser', async ({email, password}, {rejectedWithValue}) => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid email or password');
        }
        const data = await response.json();
        const token = data.body.token;

        if (!token) {
            throw new Error('Token not found in response');
        }

        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        console.error("Error:", error.response.data);
        return rejectedWithValue(error.message);
    }
});