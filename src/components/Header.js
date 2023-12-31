import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <section className='sticky top-0 w-full z-50 bg-[#FFE1DC]'>
        <div className='w-full flex flex-row justify-between p-1 px-4'>
            <Link to={'/'} className='flex flex-row space-x-2 items-center'>
                <img className='w-10 h-10 border' src='../static/images/hospital.png'></img>
                <p className='text-3xl font-semibold tracking-wider'>Clinic</p>
            </Link>
            <ul className='flex flex-row space-x-10 items-center justify-end w-1/6'>
                <Link to={'/profile'}>
                    <svg className='cursor-pointer w-10 h-10 hover:stroke-orange-600' viewBox="0 0 24 24" fill='none' stroke='#FF876F' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-Linknecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke-width="2"></path> <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                </Link>
            </ul>
        </div>
    </section>
  )
}

export default Header
