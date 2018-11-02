import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Forgot from './Pages/Auth/Forgot';
import Register from './Pages/Auth/Register';
import Reset from './Pages/Auth/Reset';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebars from './Component/sidebar/Sidebars';
import Layout from './Component/Layout/Layout';



const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/resetpassword/:resetToken" element={<Reset/>} />

        <Route path='/dashboard' element={
            <Sidebars>
              <Layout>
                <Dashboard/>
              </Layout>
            </Sidebars>
        }/>
    </Routes>
    </>
  )
};

export default App;
