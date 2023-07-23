import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <section className="absolute top-0 min-h-screen w-full bg-[url('./static/images/gradient-background.jpg')]">
        <div className='w-full h-screen flex flex-col space-y-32 items-center justify-center'>
            <div className='w-full lg:w-1/2 text-center text-4xl lg:text-5xl'>
                <p className=''>Embrace a Healthier Tomorrow with</p>
                <p className='text-[#FF876F] font-semibold tracking-wider'>ClinicName</p>
            </div>
            <div className='flex flex-col space-y-8'>
                <Link to={'/create-appointment'} class="btn">
                    <span className="text">Book an Appointment</span>
                </Link>
                <Link to={'/doctors-list'} class="ml-6">
                    <span className="text">Check available doctors</span>
                </Link>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home
