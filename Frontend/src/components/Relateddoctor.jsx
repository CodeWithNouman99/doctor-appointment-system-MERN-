import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctors } from '../assets/assets_frontend/assets'

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate()
  const [relDocs, setRelDocs] = useState([])

  useEffect(() => {
    if (speciality) {
      const related = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDocs(related)
    }
  }, [docId, speciality])

  if (relDocs.length === 0) return null

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
      <h2 className='text-3xl font-medium'>Related Doctors</h2>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Other {speciality}s you can book.
      </p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6'>
        {relDocs.slice(0, 5).map((item) => (
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
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors