import React from 'react'

// TODO: baad mein ye data backend API (/api/admin/dashboard) se aayega
const stats = [
  { label: 'Doctors', value: 12, change: '+2 this month', color: 'from-[#5F6FFF] to-[#8B5CF6]', icon: 'doctors' },
  { label: 'Appointments', value: 48, change: '+12% vs last week', color: 'from-emerald-500 to-teal-400', icon: 'appointments' },
  { label: 'Patients', value: 135, change: '+9 new', color: 'from-orange-500 to-amber-400', icon: 'patients' },
  { label: 'Revenue', value: 'Rs 84,500', change: '+6% vs last month', color: 'from-pink-500 to-rose-400', icon: 'revenue' },
]

const weekly = [
  { day: 'Mon', count: 6 },
  { day: 'Tue', count: 9 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 11 },
  { day: 'Fri', count: 8 },
  { day: 'Sat', count: 12 },
  { day: 'Sun', count: 3 },
]

const latest = [
  { patient: 'Ali Raza', doctor: 'Dr. Ahmed Khan', date: '14 Oct 2026', status: 'Confirmed' },
  { patient: 'Ayesha Noor', doctor: 'Dr. Sara Malik', date: '14 Oct 2026', status: 'Pending' },
  { patient: 'Hamza Tariq', doctor: 'Dr. Bilal Hussain', date: '15 Oct 2026', status: 'Confirmed' },
  { patient: 'Fatima Zahra', doctor: 'Dr. Ahmed Khan', date: '15 Oct 2026', status: 'Cancelled' },
  { patient: 'Usman Ali', doctor: 'Dr. Hira Siddiqui', date: '16 Oct 2026', status: 'Completed' },
]

const statusStyle = {
  Confirmed: 'bg-indigo-50 text-[#5F6FFF]',
  Pending: 'bg-amber-50 text-amber-600',
  Cancelled: 'bg-red-50 text-red-600',
  Completed: 'bg-emerald-50 text-emerald-600',
}

const icons = {
  doctors: (
    <>
      <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
    </>
  ),
  appointments: (
    <>
      <rect x='3' y='4' width='18' height='18' rx='2' />
      <path d='M16 2v4M8 2v4M3 10h18' />
    </>
  ),
  patients: (
    <>
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </>
  ),
  revenue: (
    <>
      <path d='M12 2v20' />
      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
    </>
  ),
}

const Dashboard = () => {
  const max = Math.max(...weekly.map((w) => w.count))

  return (
    <div className='w-full max-w-6xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>Dashboard</h1>
        <p className='text-sm text-gray-500 mt-1'>Overview of doctors, patients and appointments.</p>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {stats.map((s) => (
          <div
            key={s.label}
            className='bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm text-gray-500'>{s.label}</p>
                <p className='text-3xl font-bold text-gray-800 mt-1'>{s.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${s.color} text-white grid place-items-center shadow-lg`}>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  {icons[s.icon]}
                </svg>
              </div>
            </div>
            <p className='text-xs text-emerald-600 font-medium mt-4'>{s.change}</p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5'>
        {/* Weekly chart */}
        <div className='lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm'>
          <p className='font-semibold text-gray-800'>Appointments this week</p>
          <p className='text-xs text-gray-500 mb-6'>Daily booking count</p>

          <div className='flex items-end justify-between gap-3 h-44'>
            {weekly.map((w) => (
              <div key={w.day} className='flex-1 flex flex-col items-center gap-2 group'>
                <span className='text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                  {w.count}
                </span>
                <div
                  className='w-full rounded-t-lg bg-linear-to-t from-[#5F6FFF] to-[#8B5CF6] opacity-80 group-hover:opacity-100 transition-all'
                  style={{ height: `${(w.count / max) * 100}%` }}
                />
                <span className='text-xs text-gray-500'>{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest appointments */}
        <div className='lg:col-span-3 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
          <div className='px-6 pt-6 pb-4'>
            <p className='font-semibold text-gray-800'>Latest Appointments</p>
            <p className='text-xs text-gray-500'>Most recent bookings</p>
          </div>

          <div className='divide-y divide-gray-100'>
            {latest.map((a, i) => (
              <div key={i} className='flex items-center justify-between gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors'>
                <div className='flex items-center gap-3 min-w-0'>
                  <div className='w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-[#5F6FFF] to-[#8B5CF6] text-white grid place-items-center text-sm font-semibold'>
                    {a.patient[0]}
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-medium text-gray-800 truncate'>{a.patient}</p>
                    <p className='text-xs text-gray-500 truncate'>{a.doctor} · {a.date}</p>
                  </div>
                </div>
                <span className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${statusStyle[a.status]}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard