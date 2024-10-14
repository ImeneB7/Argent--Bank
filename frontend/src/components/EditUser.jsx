import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsername } from "../redux/userSlice";

function EditUser() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.user.profile);
    const [firstName, setFirstName] = useState(profile?.firstName || "");
    const [lastName, setLastName] = useState(profile?.lastName || "");
    const [userName, setUsername] = useState(profile?.userName || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting with username:", userName);
        dispatch(updateUsername({userName, firstName, lastName}));
        navigate("/profile");
    };

    const handleCancel = () => {
        navigate("/profile");
    }

    return(
        <div className="sign-in_content edit-user-content">
            <h2>Edit user info</h2>
            <form onSubmit={handleSubmit}>
            <div className="edit-user-wrapper">
                <label htmlFor="username">User name:</label>
                <input 
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="edit-user-wrapper">
                <label htmlFor="firstName">First name:</label>
                <input 
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled />
            </div>
            <div className="edit-user-wrapper">
                <label htmlFor="lastName">Last name:</label>
                <input 
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled />
            </div>
            <div className="form-buttons">
                <button type="submit" className="edit-button edit-user-button">Save</button>
                <button type="submit" className="edit-button edit-user-button" onClick={handleCancel}>Cancel</button>
            </div>
            </form>
        </div>
    )
}

export default EditUser;