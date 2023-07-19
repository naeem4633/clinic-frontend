import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <section className="absolute top-0 min-h-screen w-full bg-[url('./static/images/gradient-background.jpg')]">
        <div className='w-full h-screen flex flex-col space-y-32 items-center justify-center'>
            <div className='w-1/2 text-center'>
                <p className='text-5xl'>Embrace a Healthier Tomorrow with</p>
                <p className='text-5xl text-[#FF876F] font-semibold tracking-wider'>ClinicName</p>
            </div>
            <div className=''>
                <Link to={'/create-appointment'} class="btn">
                    <span className="text">Book an Appointment</span>
                </Link>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home
