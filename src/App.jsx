import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Createlisting from './pages/Createlisting';
import Listingpage from './pages/Listingpage';
import { Navbar } from './components/Navbar';
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Navbar />
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route path="/Createlisting" element={<Createlisting />} />
  <Route path="/Listingpage" element={<Listingpage />} />
</Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
