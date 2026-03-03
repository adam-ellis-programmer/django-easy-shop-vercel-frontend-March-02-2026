import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHeader } from '../index'
import img from '../../place holders/test-w.png'

import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from '../../features/user/userSlice'
import products from '../../data/products'

const inputs = [
  {
    id: 'email',
    placeholder: 'email',
    name: 'email',
    type: 'email',
    defaultValue: 'john@gmail.com',
  },
  {
    id: 'password',
    placeholder: 'password',
    name: 'password',
    type: 'password',
    defaultValue: 'Thisisasecret',
  },
]

const SignIn = () => {
  const [loader, setloader] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const isLoading = status === 'loading'

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Redirect on successful login
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/')
    }
  }, [status, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    // get data from form
    const formData = new FormData(e.target)

    // set credentials
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    // dispatch credentials
    dispatch(loginUser(credentials))
  }

  const handleTestUser = () => {
    const credentials = {
      email: 'test-user@easy-store.com',
      password: 'secret',
    }
    dispatch(loginUser(credentials))
    console.log('hello and logging in....', credentials)
  }

  const handleLoad = () => {
    console.log('first')
    setloader(false)
  }

  const urls = [
    'https://images.unsplash.com/photo-1616828640511-7bd1b53494d6?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1758520388383-55023490a258?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1753161025156-7d41a911ca17?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]
  return (
    <div className='relative min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 py-12'>
      <div></div>
      {/* Background Image */}
      <div className='bg-[#05111f78] absolute top-0 left w-full h-full '></div>

      {/* loader */}
      {loader && (
        <div className='bg-[#152840] top-0 left-0 w-full h-full absolute z-10 flex justify-center items-center text-white'>
          <div className='flex flex-col items-center'>
            <p className='mb-4 text-3xl animate-bounce capitalize'>
              Loading page...
            </p>
            <div className='w-15 h-15 rounded-full  border-[3px] border-t-orange-400 animate-spin'></div>
          </div>
        </div>
      )}

      <img
        className='absolute top-0 left-0 w-full h-full object-cover object-center -z-10'
        src={urls[0]}
        alt='Background'
        onLoad={handleLoad}
      />
      {/* Form Container */}
      <div className='w-full lg:pt-50 lg:pr-5'>
        <div className='bg-gray-100/30 rounded-lg backdrop-blur-sm relative mx-5'>
          {/* <img className='h-[30px] absolute top-5 right-5' src={img} alt='' /> */}

          <Form onSubmit={handleSubmit} className='shadow-2xl p-10 md:p-12'>
            <FormHeader text='Sign In ' />
            {error && (
              <div className='alert alert-error mb-4'>{error.error}</div>
            )}
            {inputs.map(({ id, placeholder, name, type, defaultValue }) => {
              return (
                <input
                  key={id}
                  type={type}
                  placeholder={placeholder}
                  className='input input-md w-full cursor-default mb-[1px]'
                  name={name}
                  id={id}
                  required
                  defaultValue={defaultValue}
                />
              )
            })}
            <div className='flex justify-between mb-4 font-extrabold mt-2'>
              <Link to={`/sign-up`}>Sign Up</Link>
              <Link to={`/`}>Back to browse</Link>
            </div>

            <div className='flex items-end'>
              <button
                className='btn btn-neutral'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Submit'}
              </button>
              <button
                onClick={handleTestUser}
                className='btn btn-neutral ml-10'
                type='button'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Test Drive'}
              </button>
              {/* ===================== */}
              {/* Only on large screens */}
              {/* ===================== */}
              {isLoading && (
                <div className='hidden  md:flex items-center justify-center'>
                  <div className='h-10 w-10  border-[2px] rounded-full border-t-rose-500 animate-spin mx-10'></div>
                  <div>
                    <p className='capitalize text-md '>please wait...</p>
                    <p className='capitalize text-md '>Logging you in!</p>
                  </div>
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
