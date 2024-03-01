import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  SignIn  from './pages/SignIn';
import SignUp from './pages/SignUp';
import  Home  from './pages/Home';
import { Navbar } from './components/Navbar';
import styles from "./App.module.css"
import ResetPasswordPage from './pages/ResetPasswordPage';
import { About } from "./components/about";



function App() {
  

  return (
    <div className={styles.App}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='/About' element={<About />} />
    </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
