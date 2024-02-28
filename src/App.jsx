import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  SignIn  from './pages/SignIn';
import SignUp from './pages/SignUp';
import  Home  from './pages/Home';
import { Navbar } from './components/Navbar';
import styles from "./App.module.css"
import ResetPasswordPage from './pages/ResetPasswordPage';
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
    </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
