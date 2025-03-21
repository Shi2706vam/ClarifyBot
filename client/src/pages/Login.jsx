import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Footer from '../components/footer/Footer'

const Login = () => {

  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/signup', { name, email, password })

        if (data.success) {
          // setIsLoggedin(true)
          getUserData()
          toast.success(data.message)
          navigate('/email-verify')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          toast.success(data.message)
          navigate('/')
        }else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.log(error);
      
    }
  };
  

  return (

    <div className='flex flex-col items-center gap-2 justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div onClick={() => navigate('/')} className='absolute left-5 sm:left-20 top-5 cursor-pointer flex items-center gap-1.5'>
        <img src={assets.logo} alt="Clarify" className='w-8 sm-:w-10' />
        <span className='text-lg font-semibold'>CLARIFY</span>
      </div>

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

        <h2 className='text-4xl font-semibold text-white text-center mb-4'>
          {state == 'Sign Up' ? 'Create your Account' : 'Login to your Account!'}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5  rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} />
              <input
                className='bg-transparent outline-none py-2.5'
                type="text"
                placeholder='Full Name'
                autoComplete='name'
                value={name}
                onChange={e => setName(e.target.value)}
                
              />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} />
            <input
              className='bg-transparent outline-none py-2.5'
              type="email"
              placeholder='Email Id'
              autoComplete='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
             
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} />
            <input
              className='bg-transparent outline-none py-2.5'
              type="password"
              placeholder='Password'
              autoComplete='current-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
             
            />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium cursor-pointer hover:bg-gradient-to-l transition-all'>{state}</button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Already have a Account?{' '}
            <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Login')}>Login here</span>
          </p>
        )
          : (
            <p className='text-gray-400 text-center text-xs mt-4'>
              Don't have a Account?{' '}
              <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span>
            </p>
          )}

      </div>
      <Footer />
    </div>
  )
}

export default Login
