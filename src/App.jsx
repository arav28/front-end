import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Createlisting from "./pages/Createlisting";
import Listingpage from "./pages/Listingpage";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PrivateRoute from "./components/RoutingFolder/PrivateRoute";
import CRUDListings from "./pages/Admin/CRUDListings";
import ItemLocation from "./components/MapComponents/ItemLocation";
import Updatelisting from './pages/Updatelistings';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/Createlisting" element={<Createlisting />} />
          <Route path="/Updatelisting" element={<Updatelisting />} />
          <Route path="/Listingpage" element={<Listingpage />} />
          <Route element= {<PrivateRoute/>}>
            <Route path='/modify-listing' element={<CRUDListings/>}/>
          </Route>
          <Route path="/itemLocation" element={<ItemLocation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
