import React from "react";
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import "./layout.css"
function Layout() {
    return ( 
        <>
            <main className='container'>
                <Header/>

                <Outlet/>
            
                <Footer/>
            </main>
        </>
     );
}

export default Layout;