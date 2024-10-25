import React, {useEffect} from "react";
import logo from "../assets/img/argentBankLogo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../redux/authSlice";



function NavBar() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profile = useSelector((state) => state.user.profile);
  const userName = useSelector((state) => state.user.profile?.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("Profile:", profile);
  console.log("userName:", userName);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      dispatch(logout()); // Si pas de token, on déconnecte l'utilisateur
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  }

    return(
        <nav className="main-nav">
      <NavLink to='/' className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>   
        {isAuthenticated && location.pathname === "/profile" ? ( // si authentifié alors signout à la place de signin
        <>
        <span className="main-nav-item" >
          {userName}
        </span>
          
          <NavLink to='/login' onClick={handleLogout} className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
        </>
        ) : (
        <NavLink to='/login' className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
        )}
      </div>
    </nav>
    )
}

export default NavBar;