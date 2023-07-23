import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const BookAppointment = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser: "+storedUser);
    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
    }
    if(storedUser == null){
      navigate('/login');
    }
  }, []);

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
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      patient: user.patient_id,
      doctor: 1,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
    };

    axios.post('http://127.0.0.1:8000/api/appointment-create', postData)
    .then((response) => {
      console.log('Appointment booked successfully!', response.data);
      // You can handle success actions here, such as showing a success message to the user
    })
    .catch((error) => {
      if (error.response.data.detail == "An Appointment already exists"){
          return alert("Appointment already exists");
      }else{

        console.error('Error booking appointment:', error);
        // You can handle error actions here, such as showing an error message to the user
      }
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
                  <Link to={'/sign-up'}>
                      <p className='text-center text-xs underline text-[#ff3d16] font-semibold hover:text-orange-700'>Don't have an ID? Sign up here</p>
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
