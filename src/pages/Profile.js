import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = ((hour + 11) % 12) + 1;
    return `${twelveHourFormat}:${minutes} ${amPm}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/patient-appointments/${parsedUser.patient_id}`);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchData();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <section className="absolute top-0 min-h-screen w-full flex items-center">
      <div className="mx-auto w-full lg:w-1/2 min-h-[80vh] flex flex-col items-center justify-start bg-[#FFE1DC] rounded-lg p-8 space-y-20">
          <p className='text-3xl'>Profile</p>
          <div className='mx-auto w-full lg:w-1/2 grid grid-cols-2 gap-8'>
            <div className='space-y-2'>
                <p className='text-lg font-semibold text-orange-600'>User ID</p>
                <p className='text-lg'>{user.user_id}</p>
            </div>
            <div className='space-y-2'>
                <p className='text-lg font-semibold text-orange-600'>Name</p>
                <p className='text-lg'>{user.first_name}</p>
            </div>
            <div className='space-y-2'>
                <p className='text-lg font-semibold text-orange-600'>Username</p>
                <p className='text-lg'>{user.username}</p>
            </div>
            <div className='space-y-2'>
                <p className='text-lg font-semibold text-orange-600'>Email</p>
                <p className='text-lg'>{user.user_email}</p>
            </div>
          </div>
          <p className='text-3xl'>Appointments</p>
          {appointments.map((appointment) => (
              <div key={appointment.id} className="w-3/4 lg:w-1/2 flex flex-row justify-evenly">
                <p className="text-lg">
                  {new Date(appointment.date).toLocaleDateString()} 
                </p>
                <p className="text-lg">
                  at
                </p>
                <p className="text-lg">
                  {formatTime(appointment.time)}  
                </p>
              </div>
            ))}
        </div>
      </section>
  )
}

export default Profile