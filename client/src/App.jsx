import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Forgot from './Pages/Auth/Forgot';
import Register from './Pages/Auth/Register';
import Reset from './Pages/Auth/Reset';
import Login from './Pages/Auth/Login';



const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/resetpassword/:resetToken" element={<Reset/>} />
    </Routes>
    </>
  )
};

export default App;
