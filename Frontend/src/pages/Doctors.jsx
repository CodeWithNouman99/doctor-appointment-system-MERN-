import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doctors, specialityData } from '../assets/assets_frontend/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [speciality])

  const handleFilter = (item) => {
    // Clicking the active speciality again clears the filter
    if (speciality === item) navigate('/doctors')
    else navigate(`/doctors/${item}`)
  }

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors by speciality.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5F6FFF] text-white' : ''}`}
        >
          Filters
        </button>

        {/* Speciality Sidebar */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialityData.map((item) => (
            <p
              key={item.speciality}
              onClick={() => handleFilter(item.speciality)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer transition-all hover:bg-indigo-50 ${
                speciality === item.speciality ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500'
              >
                <img className='bg-blue-50 w-full' src={item.image} alt={item.name} />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500 col-span-full'>No doctors found for this speciality.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors