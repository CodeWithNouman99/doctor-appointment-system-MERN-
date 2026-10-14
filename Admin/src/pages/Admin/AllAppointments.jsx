import React, { useMemo, useState } from 'react'

// TODO: baad mein ye data backend API (/api/admin/appointments) se aayega
const appointments = [
  { id: 1, patient: 'Ali Raza', age: 24, doctor: 'Dr. Ahmed Khan', speciality: 'General physician', date: '14 Oct 2026', time: '10:00 AM', fees: 500, status: 'Confirmed' },
  { id: 2, patient: 'Ayesha Noor', age: 31, doctor: 'Dr. Sara Malik', speciality: 'Gynecologist', date: '14 Oct 2026', time: '11:30 AM', fees: 800, status: 'Pending' },
  { id: 3, patient: 'Hamza Tariq', age: 19, doctor: 'Dr. Bilal Hussain', speciality: 'Dermatologist', date: '15 Oct 2026', time: '09:00 AM', fees: 700, status: 'Confirmed' },
  { id: 4, patient: 'Fatima Zahra', age: 45, doctor: 'Dr. Ahmed Khan', speciality: 'General physician', date: '15 Oct 2026', time: '01:00 PM', fees: 500, status: 'Cancelled' },
  { id: 5, patient: 'Usman Ali', age: 28, doctor: 'Dr. Hira Siddiqui', speciality: 'Neurologist', date: '16 Oct 2026', time: '04:30 PM', fees: 1200, status: 'Completed' },
  { id: 6, patient: 'Zainab Iqbal', age: 36, doctor: 'Dr. Sara Malik', speciality: 'Gynecologist', date: '17 Oct 2026', time: '12:00 PM', fees: 800, status: 'Pending' },
]

const statusStyle = {
  Confirmed: 'bg-indigo-50 text-[#5F6FFF]',
  Pending: 'bg-amber-50 text-amber-600',
  Cancelled: 'bg-red-50 text-red-600',
  Completed: 'bg-emerald-50 text-emerald-600',
}

const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

const AllAppointments = () => {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return appointments.filter((a) => {
      const matchStatus = filter === 'All' || a.status === filter
      const matchQuery =
        !q || a.patient.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q)
      return matchStatus && matchQuery
    })
  }, [filter, query])

  return (
    <div className='w-full max-w-6xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>All Appointments</h1>
        <p className='text-sm text-gray-500 mt-1'>View and manage every booking in one place.</p>
      </div>

      {/* Toolbar */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5'>
        <div className='flex flex-wrap gap-2'>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === f
                  ? 'bg-[#5F6FFF] border-[#5F6FFF] text-white shadow-md shadow-indigo-200'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#5F6FFF] hover:text-[#5F6FFF]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2 bg-white border border-gray-200 focus-within:border-[#5F6FFF] focus-within:ring-4 focus-within:ring-indigo-100 rounded-full px-4 py-2 md:w-72 transition-all'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#9CA3AF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.3-4.3' />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search patient or doctor...'
            className='w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400'
          />
        </div>
      </div>

      {/* Table */}
      <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-190 text-left'>
            <thead>
              <tr className='bg-gray-50 text-xs uppercase tracking-wider text-gray-500'>
                <th className='px-6 py-3.5 font-semibold'>#</th>
                <th className='px-6 py-3.5 font-semibold'>Patient</th>
                <th className='px-6 py-3.5 font-semibold'>Age</th>
                <th className='px-6 py-3.5 font-semibold'>Date & Time</th>
                <th className='px-6 py-3.5 font-semibold'>Doctor</th>
                <th className='px-6 py-3.5 font-semibold'>Fees</th>
                <th className='px-6 py-3.5 font-semibold'>Status</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {list.map((a, i) => (
                <tr key={a.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 text-sm text-gray-500'>{i + 1}</td>

                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-9 h-9 rounded-full bg-linear-to-br from-[#5F6FFF] to-[#8B5CF6] text-white grid place-items-center text-sm font-semibold'>
                        {a.patient[0]}
                      </div>
                      <p className='text-sm font-medium text-gray-800'>{a.patient}</p>
                    </div>
                  </td>

                  <td className='px-6 py-4 text-sm text-gray-600'>{a.age}</td>

                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-800'>{a.date}</p>
                    <p className='text-xs text-gray-500'>{a.time}</p>
                  </td>

                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-800'>{a.doctor}</p>
                    <p className='text-xs text-gray-500'>{a.speciality}</p>
                  </td>

                  <td className='px-6 py-4 text-sm font-medium text-gray-800'>Rs {a.fees}</td>

                  <td className='px-6 py-4'>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {list.length === 0 && (
          <div className='py-14 text-center'>
            <p className='text-gray-700 font-medium'>No appointments found</p>
            <p className='text-sm text-gray-500 mt-1'>Try a different filter or search term.</p>
          </div>
        )}

        <div className='px-6 py-3 border-t border-gray-100 text-xs text-gray-500'>
          Showing {list.length} of {appointments.length} appointments
        </div>
      </div>
    </div>
  )
}

export default AllAppointments