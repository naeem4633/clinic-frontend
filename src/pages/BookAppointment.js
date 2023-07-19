import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookAppointment = () => {
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
    patientId: '',
    doctorName: '',
    date: '',
    time: '',
    reason: '',
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
                <label htmlFor="patientId" className='text-sm font-semibold'>Patient ID</label>
                <input type="text" id="patientId" name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} className="p-2 border border-gray-400 rounded"/>
                <Link to={'/sign-up'}>
                    <p className='text-xs underline text-[#ff3d16] font-semibold hover:text-orange-700'>Don't have an ID? Sign up here</p>
                </Link>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="doctorName" className='text-sm font-semibold focus:border focus:border-orange-600'>Doctor</label>
                    <select id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleChange} className="p-2 border border-gray-400 rounded">
                        <option value="">Select Available Doctors</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.first_name}>
                            {doctor.first_name} {doctor.last_name}
                            </option>
                            ))}
                    </select>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="date" className='text-sm font-semibold'>Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="p-2 border border-gray-400 rounded text-sm"/>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="time" className='text-sm font-semibold'>Time</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="p-2 border border-gray-400 rounded text-sm"/>
                </div>
                <div className='w-full flex flex-col space-y-1'>
                    <label htmlFor="reason" className='text-sm font-semibold'>Reason</label>
                    <textarea id="reason" name="reason" placeholder='' value={formData.reason} onChange={handleChange} className="p-2 border border-gray-400 rounded" rows="2"/>
                </div>
            </div>
            <button type="submit" className="mx-auto w-3/4 p-2 bg-[#ff7e64] text-white rounded font-semibold hover:bg-orange-600">
                Book Appointment
            </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
