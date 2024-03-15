import { Route, Routes } from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
