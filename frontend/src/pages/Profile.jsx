import React, { useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";
import EditUser from "../components/EditUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/userActions";


function Profile() {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.user);
    const token = useSelector((state) => state.auth.token); // accèder au token depuis authSlice
    const [isEditing, setIsEditing] = useState(false);
    console.log("Token in profile component:", token);

    useEffect(() => {
        if (token) {
            console.log("Fetching user profile")
            dispatch(fetchUserProfile()); // fetchUserProfile doit être configuré pour utiliser le token
        } else {
            console.error("No token found");
        }
    }, [dispatch, token]);

    console.log("Profil utilisateur:", profile);
    console.log("Chargement:", loading);
    console.log("Erreur:", error);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }
    if (loading) {
        return <div>Loading...</div>
    }
    if (!profile) {
        return <div>Error loading profile data</div>
    }
    if (error) return <div>Error loading profile: {error}</div>

    return (
        <>
            <NavBar/>
            <main className="main bg-dark">
                <div className="header">
                    {!isEditing ? (
                        <>
                        <h1>Welcome back<br /> {profile.firstName} {profile.lastName}!</h1>
                        <button onClick={handleEditClick} className="edit-button">Edit Name</button>
                        </>
                    ) : (
                        <EditUser onCancel={handleCancelEdit}/>
                    )  }                  
                </div>
                <Accounts/>
                <Footer/>
            </main>
        </>
    );
}

export default Profile;