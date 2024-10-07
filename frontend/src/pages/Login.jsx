import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Login = () => {

    return(
        <>
        <NavBar/>
          <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <Form/>
          </section>
      <Footer/>
    </main>
    </>
    )
}

export default Login;