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
import Profile from './pages/Profile';
import DoctorsList from './pages/DoctorsList';

function App() {
  const [user, setUser] = useState({});

  const handleLogin = (user) => {
    setUser(user);
    console.log("user set"+ user);
    // Get the user info from localStorage
  };

  return (
  <Router>
    <div className="App">
      <Header />
      <div className="App-body">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-appointment' element={<BookAppointment/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
          <Route path='/profile' element={<Profile user={user} handleLogin={handleLogin}/>}/>
          <Route path='/doctors-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
