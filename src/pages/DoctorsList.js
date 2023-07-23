import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsLists = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Send a request to the doctor-list endpoint to fetch the list of doctors
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/doctor-list');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // Call the fetchData function to get the list of doctors on component mount
    fetchData();
  }, []);

  return (
    <section className="absolute top-0 min-h-screen w-full flex items-center ">
      <div className="mx-auto w-full lg:w-3/4 h-[80vh] flex flex-col items-center justify-start bg-[#FFE1DC] rounded-lg p-8 space-y-6 overflow-y-auto">
        <p className='font-semibold text-2xl'>Doctors</p>
        <div className='mx-auto w-full lg:w-3/4 flex flex-col space-y-20'>
          <div className='flex space-x-2 justify-between font-semibold'>
            <p className='hidden lg:block text-lg text-left'>Doctor Name</p>
            <p className='hidden lg:block text-lg text-center w-1/6'>Email</p>
          </div>
          {doctors.map((doctor) => (
            <div key={doctor.id} className='flex flex-col lg:flex-row space-x-2 items-center lg:justify-between text-sm'>
              <p className='font-semibold'>{doctor.first_name} {doctor.last_name}</p>
              <p className=''>{doctor.specialty}</p>
              <p className=''>{doctor.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsLists;
