import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({handleLogin}) => {
  const [authorized, setAuthorized] = useState(true);
  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const postData = {
      email: formData.email,
      password: formData.password,
    };
    console.log(formData);
    axios.post('http://127.0.0.1:8000/api/login', postData)
      .then((response) => {
        console.log('Login successful!', response.data);
        const user = response.data;
        console.log(user);
        handleLogin(user);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthorized(true);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setAuthorized(false);
      });
  };

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
                    <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                    <input type="email" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="password" className='text-sm font-semibold'>Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
                    <Link to={'/sign-up'}>
                        <p className='text-xs underline text-[#ff3d16] font-semibold hover:text-orange-700'>Don't have an account? Sign Up</p>
                    </Link>
                </div>
                {!authorized && (
                <div className='w-full flex flex-col space-y-1'>
                  <p className='text-xs text-center text-[#ff3d16] font-semibold hover:text-orange-700'>Invalid Credentials</p>
                </div>
                )}
            </div>
            <button type="submit" className="mx-auto w-3/4 p-2 bg-[#ff7e64] text-white rounded font-semibold hover:bg-orange-600">
                Login
            </button>
        </form>
      </div>
    </section>
  )
}

export default Login