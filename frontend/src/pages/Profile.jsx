import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";
import EditUser from "../components/EditUser";


function Profile() {

    return (
        <>
            <NavBar/>
            <main className="main bg-dark">
                <div className="header">                 
                        <h1>Welcome back<br />!</h1>
                        <button className="edit-button">Edit Name</button>
                        <EditUser/>
                    
                </div>
                <Accounts/>
                <Footer/>
            </main>
        </>
    );
}

export default Profile;