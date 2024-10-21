import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './userActions';

export const updateUsername = createAsyncThunk(
    'user/updateUsername',
    async ({userName, firstName, lastName}, {rejectWithValue, getState}) => {
        // On accède à l'état global via getState() pour récupérer le token de l'utilisateur
        const state = getState();
        const token = state.auth.token;
        console.log("Sending to API:", {userName, firstName, lastName});
        try {
            // On fait une requête PUT vers l'API pour mettre à jour le profil utilisateur
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
// Création du slice avec createSlice, qui génère automatiquement des reducers et des actions
const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Action pour effacer les informations du profil
        clearProfile: (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
        },
        // Action pour déconnecter l'utilisateur (suppose que l'état contient un token et un user)
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    // extraReducers est utilisé pour gérer les actions asynchrones créées avec createAsyncThunk
    extraReducers: (builder) => {
        // Quand fetchUserProfile est en cours d'exécution (pending)
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true; 
            state.profile = null;
        })
        // Quand fetchUserProfile réussit (fulfilled)
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload; // mets à jour le profil avec les données reçues
        })
        // Quand fetchUserProfile échoue (rejected)
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Quand updateUsername est en cours (pending)
        .addCase(updateUsername.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // Quand updateUsername réussit (fulfilled)
        .addCase(updateUsername.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        // Quand updateUsername échoue (rejected)
        .addCase(updateUsername.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {clearProfile} = userSlice.actions;
export {fetchUserProfile};
export default userSlice.reducer;