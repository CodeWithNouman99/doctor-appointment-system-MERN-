import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Book appointments with trusted, verified doctors in just a few clicks.
            Browse by speciality, check availability, and manage your appointments,
            all in one place.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to='/' onClick={() => window.scrollTo(0, 0)} className='hover:text-[#5F6FFF] transition-colors'>Home</Link></li>
            <li><Link to='/about' onClick={() => window.scrollTo(0, 0)} className='hover:text-[#5F6FFF] transition-colors'>About us</Link></li>
            <li><Link to='/contact' onClick={() => window.scrollTo(0, 0)} className='hover:text-[#5F6FFF] transition-colors'>Contact us</Link></li>
            <li className='hover:text-[#5F6FFF] transition-colors cursor-pointer'>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href='tel:+923001234567' className='hover:text-[#5F6FFF] transition-colors'>+92 300 1234567</a></li>
            <li><a href='mailto:support@medislot.com' className='hover:text-[#5F6FFF] transition-colors'>support@medislot.com</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright © {year} MediSlot. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer