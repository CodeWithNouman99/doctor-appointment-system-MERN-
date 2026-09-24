import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, doctors, specialityData } from '../assets/assets_frontend/assets'

const stats = [
  { value: `${doctors.length}+`, label: 'Verified Doctors' },
  { value: `${specialityData.length}`, label: 'Specialities' },
  { value: '24/7', label: 'Online Booking' },
  { value: '< 1 min', label: 'To Book a Slot' },
]

const values = [
  {
    title: 'Verified Doctors',
    text: 'Every doctor on Prescripto is verified, so you always know who you are booking with.',
    icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  },
  {
    title: 'Instant Booking',
    text: 'Pick a day, choose a time, and confirm. No phone calls, no waiting in queues.',
    icon: 'M3.75 13.5 14.25 2.25 12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  },
  {
    title: 'Care That Fits You',
    text: 'Filter by speciality and find the right doctor for your needs in seconds.',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
]

const steps = [
  { no: '01', title: 'Find a Doctor', text: 'Browse by speciality or explore our top doctors.' },
  { no: '02', title: 'Choose a Slot', text: 'See real-time availability for the next 7 days.' },
  { no: '03', title: 'Book & Relax', text: 'Confirm your appointment and manage it anytime.' },
]

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-6 h-6'>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
)

const About = () => {
  const navigate = useNavigate()

  return (
    <div className='text-gray-700'>

      {/* ---------- Hero ---------- */}
      <section className='text-center pt-12 pb-10'>
        <p className='inline-block text-xs font-semibold tracking-widest text-[#5F6FFF] bg-indigo-50 px-4 py-1.5 rounded-full'>
          ABOUT PRESCRIPTO
        </p>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-5 leading-tight'>
          Healthcare, made <span className='text-[#5F6FFF]'>simple</span>.
        </h1>
        <p className='max-w-2xl mx-auto mt-4 text-gray-500 leading-7'>
          We connect patients with trusted doctors and make booking an appointment
          as easy as a few clicks, without calls, queues, or confusion.
        </p>
      </section>

      {/* ---------- Stats ---------- */}
      <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((item) => (
          <div key={item.label} className='bg-indigo-50 rounded-xl py-6 text-center'>
            <p className='text-2xl sm:text-3xl font-bold text-[#5F6FFF]'>{item.value}</p>
            <p className='text-sm text-gray-500 mt-1'>{item.label}</p>
          </div>
        ))}
      </section>

      {/* ---------- Story ---------- */}
      <section className='flex flex-col md:flex-row items-center gap-12 my-20'>
        <div className='relative w-full md:max-w-100'>
          <div className='absolute -top-4 -left-4 w-full h-full bg-[#5F6FFF] rounded-2xl'></div>
          <img className='relative w-full rounded-2xl' src={assets.about_image} alt="Doctors at Prescripto" />
        </div>

        <div className='flex-1 flex flex-col gap-5 text-sm sm:text-base leading-7 text-gray-600'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>Our Story</h2>
          <p>
            Finding the right doctor shouldn't be stressful. Yet for most people it means
            long phone calls, unclear availability, and hours spent in waiting rooms.
          </p>
          <p>
            Prescripto was built to fix that. We bring verified doctors and patients onto one
            platform, where you can see real availability, pick a slot that works for you,
            and manage every appointment from one place.
          </p>
          <div className='border-l-4 border-[#5F6FFF] pl-4 py-1'>
            <p className='font-semibold text-gray-900'>Our Mission</p>
            <p>To make quality healthcare accessible to everyone, one appointment at a time.</p>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className='my-20'>
        <div className='text-center mb-10'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>Why Choose Us</h2>
          <p className='text-gray-500 mt-2'>Built around what patients actually need.</p>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {values.map((item) => (
            <div
              key={item.title}
              className='group border border-gray-200 rounded-2xl p-8 hover:border-[#5F6FFF] hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
            >
              <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-[#5F6FFF] group-hover:bg-[#5F6FFF] group-hover:text-white transition-colors duration-300'>
                <Icon path={item.icon} />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mt-5'>{item.title}</h3>
              <p className='text-sm text-gray-500 mt-2 leading-6'>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className='my-20'>
        <div className='text-center mb-10'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>How It Works</h2>
          <p className='text-gray-500 mt-2'>Book your appointment in three easy steps.</p>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {steps.map((step) => (
            <div key={step.no} className='relative bg-gray-50 rounded-2xl p-8 overflow-hidden'>
              <span className='absolute -top-2 right-4 text-7xl font-bold text-indigo-100 select-none'>{step.no}</span>
              <h3 className='relative text-lg font-semibold text-gray-900'>{step.title}</h3>
              <p className='relative text-sm text-gray-500 mt-2 leading-6'>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className='bg-[#5F6FFF] rounded-2xl text-center text-white px-6 py-14 mb-10'>
        <h2 className='text-2xl sm:text-3xl font-semibold'>Ready to book your appointment?</h2>
        <p className='text-indigo-100 mt-3'>Find the right doctor and book a slot in under a minute.</p>
        <button
          onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
          className='mt-7 bg-white text-gray-700 font-medium px-10 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300'
        >
          Find a Doctor →
        </button>
      </section>

    </div>
  )
}

export default About