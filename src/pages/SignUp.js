import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    // State to hold form data
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const postData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        username: `${formData.firstName}_${formData.lastName}`,
      };
    
      // Make the first POST request to register the user
      axios.post('http://127.0.0.1:8000/api/register', postData)
        .then((response) => {
          console.log('Registration successful!', response.data);
          // After successful registration, make the next POST request to create the patient
          const user = response.data;
          const patientData = {
            user: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            date_of_birth: formData.dateOfBirth,
          };
          return axios.post('http://127.0.0.1:8000/api/patient-create', patientData);
        })
        .then((response) => {
          console.log('Patient Created.', response.data);
          // After patient creation, make the last POST request to log in the user
          const loginData = {
            email: formData.email,
            password: formData.password,
          };
          return axios.post('http://127.0.0.1:8000/api/login', loginData);
        })
        .then((response) => {
          console.log('Login successful!', response.data);
          const user = response.data;
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((error) => {
          console.error('Request failed:', error);
        });
    };

    
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  return (
    <section className="absolute top-0 min-h-screen w-full border border-red-500 flex items-center">
      <div className="mx-auto w-full lg:w-1/2 h-[80vh] flex flex-col items-center justify-evenly bg-[#FFE1DC] rounded-lg">
        <form onSubmit={handleSubmit} className="w-3/4 lg:w-1/2 flex flex-col space-y-12 ">
          <div className="w-full flex flex-col space-y-6">
              <div className='w-full flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Patient Name</label>
              <div className='w-full flex flex-col lg:flex-row lg:space-x-2 justify-between'>
                  <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 border border-gray-400 rounded flex-grow"/>
                  <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 border border-gray-400 rounded flex-grow"/>
              </div>
              <Link to={'/login'}>
                  <p className='text-xs underline text-[#ff3d16] font-semibold hover:text-orange-700'>Already have an account? Login</p>
              </Link>
              </div>
              <div className='w-full flex flex-col space-y-1'>
                  <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                  <input type="email" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
              </div>
              <div className='w-full flex flex-col space-y-1'>
                  <label htmlFor="password" className='text-sm font-semibold'>Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
              </div>
              <div className='w-full flex flex-col space-y-1'>
                  <label htmlFor="dateOfBirth" className='text-sm font-semibold'>Date of Birth</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="p-2 border border-gray-400 rounded text-sm"/>
              </div>
            </div>
            <button type="submit" className="mx-auto w-3/4 p-2 bg-[#ff7e64] text-white rounded font-semibold hover:bg-orange-600">
                Sign Up
            </button>
        </form>
      </div>
    </section>
  )
}

export default SignUp
