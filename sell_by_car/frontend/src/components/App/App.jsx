import React from "react";
import "./app.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage.jsx";
import Layout from "../Layout/Layout.jsx";
import AboutPage from "../AboutPage/AboutPage.jsx";
import AuthPage from "../AuthPage/AuthPage.jsx";


export default function App() {
  return (
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path="aboutPage" element={<AboutPage/>}/>
            <Route path="authentification" element={<AuthPage/>}/>
          </Route>
        </Routes>
  );
}

// const appDiv = document.getElementById("root");
// render(<App />, appDiv);
