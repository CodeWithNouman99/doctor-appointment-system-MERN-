import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Bahar click karne par dropdown band
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const role = aToken ? 'Admin' : 'Doctor'

  return (
    <header className='sticky top-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-8 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200'>
      {/* Left: logo + role */}
      <div className='flex items-center gap-3'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2.5 cursor-pointer select-none'
        >
          <div className='w-9 h-9 rounded-xl bg-linear-to-br from-[#5F6FFF] to-[#8B5CF6] text-white grid place-items-center shadow-lg shadow-indigo-200'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 5v14M5 12h14' />
            </svg>
          </div>
          <p className='text-xl font-bold tracking-tight text-gray-800'>
            Presc<span className='text-[#5F6FFF]'>ripto</span>
          </p>
        </div>
        <span className='hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#5F6FFF] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full'>
          <span className='w-1.5 h-1.5 rounded-full bg-[#5F6FFF] animate-pulse' />
          {role} Panel
        </span>
      </div>

      {/* Middle: search */}
      <div className='hidden md:flex flex-1 max-w-md items-center gap-2 bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-200 border border-transparent focus-within:border-[#5F6FFF] rounded-full px-4 py-2 transition-all'>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#9CA3AF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
        </svg>
        <input
          type='text'
          placeholder='Search doctors, patients, appointments...'
          className='w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400'
        />
      </div>

      {/* Right: date, bell, profile */}
      <div className='flex items-center gap-2 sm:gap-4'>
        <p className='hidden lg:block text-xs text-gray-500'>{today}</p>

        <button className='relative w-10 h-10 grid place-items-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
            <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
          </svg>
          <span className='absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white' />
        </button>

        <div className='relative' ref={menuRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className='flex items-center gap-2 pl-1 pr-2 sm:pr-3 py-1 rounded-full hover:bg-gray-100 transition-colors'
          >
            <div className='w-9 h-9 rounded-full bg-linear-to-br from-[#5F6FFF] to-[#8B5CF6] text-white grid place-items-center text-sm font-semibold'>
              {role[0]}
            </div>
            <div className='hidden sm:block text-left leading-tight'>
              <p className='text-sm font-semibold text-gray-800'>{role}</p>
              <p className='text-[11px] text-gray-500'>Online</p>
            </div>
            <svg
              width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'
              className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </button>

          {open && (
            <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <p className='text-sm font-semibold text-gray-800'>{role} Account</p>
                <p className='text-xs text-gray-500'>Signed in to Prescripto</p>
              </div>
              <button
                onClick={() => { setOpen(false); navigate('/') }}
                className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className='w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar