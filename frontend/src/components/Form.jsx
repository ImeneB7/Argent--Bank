import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginUser} from '../redux/authSlice.js';

function Form() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.username.value;
    const password = e.target.password.value;

    console.log("Attempting to log in with:", { email, password });

    const result = await dispatch(loginUser({email, password}));
    if(loginUser.fulfilled.match(result)) {
      console.log("Login successful, navigating to profile...");
      navigate("/profile")
    } else {
      console.error("Login failed:", result.error.message);
      setErrorMessage(result.error.message);
    }
    
  }
    
    return(
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label >
          </div>
          {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
         <button className="sign-in-button">Sign In</button>
        </form>
    );

}

export default Form;