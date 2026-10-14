import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const icons = {
  dashboard: (
    <path d='M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z' />
  ),
  appointments: (
    <>
      <rect x='3' y='4' width='18' height='18' rx='2' />
      <path d='M16 2v4M8 2v4M3 10h18' />
    </>
  ),
  addDoctor: (
    <>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M19 8v6M22 11h-6' />
    </>
  ),
  doctors: (
    <>
      <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
    </>
  ),
}

const Icon = ({ name }) => (
  <svg
    width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor'
    strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round'
  >
    {icons[name]}
  </svg>
)

const menu = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/all-appointments', label: 'Appointments', icon: 'appointments' },
  { to: '/add-doctor', label: 'Add Doctor', icon: 'addDoctor' },
  { to: '/doctor-list', label: 'Doctors List', icon: 'doctors' },
]

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  if (!aToken) return null

  return (
    <aside className='sticky top-16 h-[calc(100vh-4rem)] w-16 md:w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between py-5'>
      <div>
        <p className='hidden md:block px-6 mb-3 text-[11px] font-semibold tracking-widest text-gray-400 uppercase'>
          Main Menu
        </p>

        <ul className='flex flex-col gap-1 px-2 md:px-4'>
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-linear-to-r from-indigo-50 to-white text-[#5F6FFF] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[#5F6FFF] transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-[#5F6FFF]' : ''}`}>
                    <Icon name={item.icon} />
                  </span>
                  <span className='hidden md:block'>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Bottom status card */}
      <div className='hidden md:block mx-4 p-4 rounded-2xl bg-linear-to-br from-[#5F6FFF] to-[#8B5CF6] text-white'>
        <p className='text-sm font-semibold'>System Status</p>
        <p className='text-xs text-indigo-100 mt-1'>All services running smoothly.</p>
        <div className='flex items-center gap-2 mt-3 text-xs'>
          <span className='w-2 h-2 rounded-full bg-green-300 animate-pulse' />
          Online
        </div>
      </div>
    </aside>
  )
}

export default Sidebar