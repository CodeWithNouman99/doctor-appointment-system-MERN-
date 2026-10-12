import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'

/* ---------- Icons ---------- */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-5 h-5'>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-5 h-5'>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
)

const EyeIcon = ({ off }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-5 h-5'>
    {off ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </>
    )}
  </svg>
)

/* ---------- Static data ---------- */
const bars = [40, 65, 45, 80, 60, 95, 70]

const highlights = [
  'Book, reschedule and cancel in one click.',
  'See every doctor’s availability live.',
  'Track patients and revenue at a glance.',
]

/* ---------- Count-up hook + stat card ---------- */
const useCountUp = (end, duration = 1600) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = null
    let raf

    const step = (t) => {
      if (start === null) start = t
      const progress = Math.min((t - start) / duration, 1)
      setValue(Math.floor(end * progress))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])

  return value
}

const Stat = ({ label, end, suffix = '', change }) => {
  const value = useCountUp(end)

  return (
    <div className='rounded-xl bg-white/5 border border-white/10 p-3'>
      <p className='text-xs text-slate-400'>{label}</p>
      <p className='text-xl font-semibold mt-1 tabular-nums'>
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className='text-xs text-emerald-400 mt-0.5'>{change}</p>
    </div>
  )
}

/* ---------- Login page ---------- */
const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Left panel effects
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 })
  const [hIndex, setHIndex] = useState(0)

  const { setAToken, backendUrl } = useContext(AdminContext)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y, nx: (x / rect.width - 0.5) * 2, ny: (y / rect.height - 0.5) * 2 })
  }

  useEffect(() => {
    const id = setInterval(() => setHIndex((i) => (i + 1) % highlights.length), 3000)
    return () => clearInterval(id)
  }, [])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Welcome back, Admin')
        } else {
          toast.error(data.message)
        }
      } else {
        // Doctor login: /api/doctor/login route baad mein banega
        toast.info('Doctor login coming soon')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const inputWrap =
    'flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 text-gray-500 bg-white transition-all focus-within:border-[#5F6FFF] focus-within:ring-4 focus-within:ring-indigo-100'

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-gray-50'>

      {/* ---------- Left: Brand Panel ---------- */}
      <div
        onMouseMove={handleMouseMove}
        className='hidden lg:flex relative flex-col justify-between overflow-hidden bg-[#070B18] text-white p-12 xl:p-16'
      >
        {/* Aurora blobs */}
        <div className='absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#5F6FFF]/40 blur-[130px] animate-aurora'></div>
        <div className='absolute -bottom-40 -right-32 w-[460px] h-[460px] rounded-full bg-fuchsia-500/25 blur-[130px] animate-aurora-alt'></div>
        <div className='absolute top-1/3 left-1/3 w-[320px] h-[320px] rounded-full bg-cyan-400/15 blur-[120px] animate-aurora'></div>

        {/* Grid (fades out at the edges) */}
        <div
          className='absolute inset-0 opacity-[0.08]'
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        ></div>

        {/* Mouse-follow spotlight */}
        <div
          className='absolute inset-0 pointer-events-none transition-opacity duration-300'
          style={{
            background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(95,111,255,0.22), transparent 60%)`,
          }}
        ></div>

        {/* Logo */}
        <div className='relative z-10 flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F6FFF] to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/40'>
            P
          </div>
          <p className='text-xl font-semibold tracking-wide'>Prescripto</p>
        </div>

        {/* Middle */}
        <div className='relative z-10'>
          <span className='inline-flex items-center gap-2 text-xs font-medium text-indigo-200 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur'>
            <span className='relative flex w-2 h-2'>
              <span className='absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping'></span>
              <span className='relative inline-flex w-2 h-2 rounded-full bg-emerald-400'></span>
            </span>
            Admin Dashboard · Live
          </span>

          <h1 className='mt-5 text-4xl xl:text-5xl font-semibold leading-[1.15]'>
            Healthcare operations,{' '}
            <span className='bg-gradient-to-r from-[#8E9BFF] via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent'>
              beautifully simple.
            </span>
          </h1>

          {/* Rotating highlight */}
          <p key={hIndex} className='mt-4 h-7 text-slate-300 animate-fade-up'>
            {highlights[hIndex]}
          </p>

          {/* Visual cluster */}
          <div className='relative mt-14 max-w-lg'>

            {/* Orbit rings */}
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none'>
              <div className='absolute inset-0 rounded-full border border-white/10 animate-orbit'>
                <span className='absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#8E9BFF] shadow-[0_0_20px_#8E9BFF]'></span>
              </div>
              <div className='absolute inset-12 rounded-full border border-dashed border-white/10 animate-orbit-rev'>
                <span className='absolute -bottom-1.5 left-1/2 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_18px_#e879f9]'></span>
              </div>
            </div>

            {/* Main glass card (parallax) */}
            <div
              className='relative z-10 transition-transform duration-200 ease-out'
              style={{ transform: `translate(${pos.nx * -6}px, ${pos.ny * -6}px)` }}
            >
              <div className='rounded-2xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 p-6 shadow-[0_20px_80px_-20px_rgba(95,111,255,0.6)]'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-slate-100'>Clinic Overview</p>
                  <span className='text-xs text-slate-400'>Last 7 days</span>
                </div>

                <div className='grid grid-cols-3 gap-3 mt-4'>
                  <Stat label='Appointments' end={128} change='+12%' />
                  <Stat label='Doctors' end={24} change='+3' />
                  <Stat label='Patients' end={1200} change='+8%' />
                </div>

                {/* ECG heartbeat */}
                <div className='mt-4 rounded-xl bg-black/20 border border-white/5 px-4 py-3'>
                  <div className='flex items-center justify-between text-xs text-slate-400'>
                    <span>Live activity</span>
                    <span className='text-emerald-400'>● Healthy</span>
                  </div>
                  <svg viewBox='0 0 400 70' className='w-full h-14 mt-1'>
                    <defs>
                      <linearGradient id='ecgGrad' x1='0' x2='1'>
                        <stop offset='0%' stopColor='#5F6FFF' />
                        <stop offset='100%' stopColor='#34d399' />
                      </linearGradient>
                    </defs>
                    <path
                      d='M0 38 H110 L124 38 L134 10 L148 62 L160 26 L170 38 H400'
                      fill='none'
                      stroke='url(#ecgGrad)'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      pathLength='1'
                      strokeDasharray='1'
                      className='animate-ecg drop-shadow-[0_0_6px_rgba(95,111,255,0.9)]'
                    />
                  </svg>
                </div>

                {/* Bars */}
                <div className='flex items-end gap-2 h-20 mt-4'>
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t-md ${
                        i === 5 ? 'bg-gradient-to-t from-[#5F6FFF] to-fuchsia-400' : 'bg-white/15'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card 1 */}
            <div
              className='absolute z-20 -top-10 -right-8 transition-transform duration-200 ease-out'
              style={{ transform: `translate(${pos.nx * 12}px, ${pos.ny * 12}px)` }}
            >
              <div className='animate-float rounded-xl bg-white text-gray-800 shadow-2xl px-4 py-3 flex items-center gap-3'>
                <div className='w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm'>✓</div>
                <div>
                  <p className='text-xs font-semibold'>Appointment confirmed</p>
                  <p className='text-[11px] text-gray-500'>Today, 10:30 AM</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div
              className='absolute z-20 -bottom-9 -left-8 transition-transform duration-200 ease-out'
              style={{ transform: `translate(${pos.nx * 16}px, ${pos.ny * 16}px)` }}
            >
              <div className='animate-float-slow rounded-xl bg-white text-gray-800 shadow-2xl px-4 py-3 flex items-center gap-3'>
                <div className='w-9 h-9 rounded-full bg-gradient-to-br from-[#5F6FFF] to-fuchsia-500 text-white flex items-center justify-center text-xs font-semibold'>
                  AK
                </div>
                <div>
                  <p className='text-xs font-semibold'>Dr. Ayesha Khan</p>
                  <p className='text-[11px] text-emerald-600 flex items-center gap-1'>
                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span> Available now
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card 3 */}
            <div
              className='absolute z-20 top-1/2 -right-14 transition-transform duration-200 ease-out'
              style={{ transform: `translate(${pos.nx * 20}px, ${pos.ny * 20}px)` }}
            >
              <div className='animate-float rounded-xl bg-[#0B1020]/90 backdrop-blur border border-white/15 shadow-2xl px-4 py-3'>
                <p className='text-[11px] text-slate-400'>Revenue today</p>
                <p className='text-sm font-semibold'>
                  $2,480 <span className='text-emerald-400 text-xs'>↑ 18%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer chips */}
        <div className='relative z-10 flex flex-wrap items-center gap-3 pt-14 text-xs text-slate-300'>
          {['Secure access', 'Real-time sync', 'Role-based control'].map((chip) => (
            <span key={chip} className='px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur'>
              {chip}
            </span>
          ))}
          <span className='ml-auto text-slate-500'>© {new Date().getFullYear()} Prescripto</span>
        </div>
      </div>

      {/* ---------- Right: Form ---------- */}
      <div className='flex items-center justify-center px-5 py-10'>
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10'
        >
          <p className='lg:hidden text-center text-xl font-semibold text-[#5F6FFF] mb-6'>Prescripto</p>

          <h2 className='text-2xl font-semibold text-gray-900'>Welcome back 👋</h2>
          <p className='text-sm text-gray-500 mt-1'>Sign in to your {state.toLowerCase()} account to continue.</p>

          {/* Role tabs */}
          <div className='grid grid-cols-2 gap-1 bg-gray-100 rounded-xl p-1 mt-6'>
            {['Admin', 'Doctor'].map((role) => (
              <button
                key={role}
                type='button'
                onClick={() => setState(role)}
                className={`py-2 text-sm font-medium rounded-lg transition-all ${
                  state === role ? 'bg-white text-[#5F6FFF] shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Email */}
          <div className='mt-6'>
            <label className='text-sm font-medium text-gray-700'>Email address</label>
            <div className={`${inputWrap} mt-1.5`}>
              <MailIcon />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                required
                placeholder='you@example.com'
                className='w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent'
              />
            </div>
          </div>

          {/* Password */}
          <div className='mt-5'>
            <label className='text-sm font-medium text-gray-700'>Password</label>
            <div className={`${inputWrap} mt-1.5`}>
              <LockIcon />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Enter your password'
                className='w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='hover:text-[#5F6FFF] transition-colors'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className='mt-7 w-full flex items-center justify-center gap-2 bg-[#5F6FFF] text-white py-3 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:bg-[#4B5BE6] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all'
          >
            {loading && (
              <span className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></span>
            )}
            {loading ? 'Signing in...' : `Sign in as ${state}`}
          </button>

          <p className='text-xs text-gray-400 text-center mt-6'>
            Protected area. Authorized personnel only.
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login