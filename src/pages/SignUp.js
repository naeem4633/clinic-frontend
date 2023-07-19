import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/doctor-list');
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
  
      fetchDoctors();
    }, []);
  
    // State to hold form data
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone_number: '',
    });
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Add form submission logic here
      console.log(formData);
    };
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  return (
    <section className="absolute top-0 min-h-screen w-full border border-red-500 flex items-center">
      <div className="mx-auto w-1/2 h-[80vh] flex flex-col items-center justify-evenly bg-[#FFE1DC] rounded-lg">
        <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-12 ">
          <div className="w-full flex flex-col space-y-6">
                <div className='w-full flex flex-col space-y-1'>
                <label className='text-sm font-semibold'>Patient Name</label>
                <div className='w-full flex flex-row space-x-2 justify-between'>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="p-2 border border-gray-400 rounded flex-grow"/>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="p-2 border border-gray-400 rounded flex-grow"/>
                </div>
                <Link to={'/login'}>
                    <p className='text-xs underline text-[#ff3d16] font-semibold hover:text-orange-700'>Already have an account? Login</p>
                </Link>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="dateOfBirth" className='text-sm font-semibold'>Date of Birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.date_of_birth} onChange={handleChange} className="p-2 border border-gray-400 rounded text-sm"/>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                    <input type="email" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="phoneNumber" className='text-sm font-semibold'>Phone Number</label>
                    <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
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
