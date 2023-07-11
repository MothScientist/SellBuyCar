import React from "react";
import "./app.css";
import { Route, Routes, Link } from "react-router-dom";
import MainPage from "../MainPage/MainPage.jsx";
import Layout from "../Layout/Layout.jsx";
import AboutPage from "../AboutPage/AboutPage.jsx";
import RegistrationPageStep1 from "../RegistrationPage/RegistrationPageStep1.jsx";
import RegistrationPageStep2 from "../RegistrationPage/RegistrationPageStep2.jsx";
import RegistrationPageResult from "../RegistrationPage/RegistrationPageResult.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="aboutPage" element={<AboutPage />} />
        <Route path="authentification" element={<RegistrationPageStep1 />} />
        <Route path="authentification/step2" element={<RegistrationPageStep2/>} />
        <Route path="authentification/result" element={<RegistrationPageResult/>}/>
        <Route path="cabinet" element={<RegistrationPageStep1 />} />
        <Route path="cart" element={<RegistrationPageStep1 />} />
        <Route path="map" element={<RegistrationPageStep1 />} />
        <Route path="search" element={<RegistrationPageStep1 />} />
      </Route>
    </Routes>
  );
}
