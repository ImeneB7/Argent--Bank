import React from "react";
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Feature from "../components/Features";


function Home() {
    return(
        <div>
        <NavBar/>
        <Banner/>
        <main>
        <Feature/>
      </main>
      <Footer/>
        </div>
    )
}

export default Home;