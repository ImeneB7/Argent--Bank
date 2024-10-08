import React from "react";
import logo from "../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";



function NavBar() {


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
        <>
        <span className="main-nav-item" >

        </span>
          
          <NavLink to='/login' className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          
        </NavLink>
        </>

        <NavLink to='/login' className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
        
      </div>
    </nav>
    )
}

export default NavBar;