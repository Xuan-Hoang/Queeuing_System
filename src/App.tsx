import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './layout/Login/login';
import HomePage from './layout/Home/home';
import ForgotPassword from './layout/Login/forgotPassword/forgot_password';
import ResetPassword from './layout/Login/resetPassword/reset_password';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/home/*' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
