import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const experiences = Array.from({ length: 10 }, (_, i) => `${i + 1} Year`)

const inputCls =
  'w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white outline-none transition-all focus:border-[#5F6FFF] focus:ring-4 focus:ring-indigo-100'

const Field = ({ label, children }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-sm font-medium text-gray-600'>{label}</label>
    {children}
  </div>
)

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext)

  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setDocImg(null)
    setName('')
    setEmail('')
    setPassword('')
    setExperience('1 Year')
    setFees('')
    setSpeciality('General physician')
    setDegree('')
    setAddress1('')
    setAddress2('')
    setAbout('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!docImg) return toast.error('Please select a doctor image')

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formData.append('about', about)

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { atoken: aToken },
      })

      if (data.success) {
        toast.success(data.message)
        resetForm()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='w-full max-w-4xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>Add Doctor</h1>
       <p className='text-sm text-gray-500 mt-1'>Fill in the doctor's details below to add them to the system.</p>
      </div>

      <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8'>
        {/* Image upload */}
        <div className='flex items-center gap-5 mb-8'>
          <label htmlFor='doc-img' className='cursor-pointer group'>
            {docImg ? (
              <img
                src={URL.createObjectURL(docImg)}
                alt='preview'
                className='w-20 h-20 rounded-full object-cover border-2 border-[#5F6FFF]'
              />
            ) : (
              <div className='w-20 h-20 rounded-full bg-indigo-50 border-2 border-dashed border-indigo-300 grid place-items-center text-[#5F6FFF] group-hover:bg-indigo-100 transition-colors'>
                <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <path d='m17 8-5-5-5 5' />
                  <path d='M12 3v12' />
                </svg>
              </div>
            )}
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' accept='image/*' hidden />
          <div>
            <p className='text-sm font-medium text-gray-700'>Doctor Picture</p>
           <p className='text-xs text-gray-500'>Click to upload an image (JPG / PNG).</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5'>
          <Field label='Doctor Name'>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} type='text' placeholder='Dr. Ahmed Khan' required />
          </Field>

          <Field label='Speciality'>
            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className={inputCls}>
              {specialities.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label='Doctor Email'>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} type='email' placeholder='doctor@example.com' required />
          </Field>

          <Field label='Education / Degree'>
            <input value={degree} onChange={(e) => setDegree(e.target.value)} className={inputCls} type='text' placeholder='MBBS, FCPS' required />
          </Field>

          <Field label='Doctor Password'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} type='password' placeholder='Minimum 8 characters' minLength={8} required />
          </Field>

          <Field label='Address'>
            <div className='flex flex-col gap-2'>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} className={inputCls} type='text' placeholder='Address line 1' required />
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} className={inputCls} type='text' placeholder='Address line 2' />
            </div>
          </Field>

          <Field label='Experience'>
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls}>
              {experiences.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </Field>

          <Field label='Fees'>
            <input value={fees} onChange={(e) => setFees(e.target.value)} className={inputCls} type='number' min='0' placeholder='500' required />
          </Field>
        </div>

        <div className='mt-5'>
          <Field label='About Doctor'>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} className={`${inputCls} resize-none`} rows={5} placeholder='Write a short bio about the doctor...' required />
          </Field>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='mt-7 inline-flex items-center gap-2 bg-[#5F6FFF] hover:bg-[#4b5be6] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-10 py-3 rounded-full transition-colors'
        >
          {loading && (
            <span className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
          )}
          {loading ? 'Saving...' : 'Add Doctor'}
        </button>
      </div>
    </form>
  )
}

export default AddDoctor