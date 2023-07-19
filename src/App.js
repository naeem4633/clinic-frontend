import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import BookAppointment from './pages/BookAppointment';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <div className="App-body">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-appointment' element={<BookAppointment/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
