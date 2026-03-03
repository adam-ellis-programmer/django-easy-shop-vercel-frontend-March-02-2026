// src/routes/SignUp.jsx
import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHeader } from '../index'
import img from '../../place holders/test-w.png'
import {
  registerUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from '../../features/user/userSlice'

const inputs = [
  {
    id: 'first-name',
    placeholder: 'first name',
    name: 'firstName',
    type: 'text',
    defaultValue: 'John',
  },
  {
    id: 'last-name',
    placeholder: 'last name',
    name: 'lastName',
    type: 'text',
    defaultValue: 'Doe',
  },
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
  {
    id: 'confirm-password',
    placeholder: 'confirm password',
    name: 'confirm-password',
    type: 'password',
    defaultValue: 'Thisisasecret',
  },
]

const SignUp = () => {
  const [loader, setloader] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const isLoading = status === 'loading'

  // Clear any existing errors when component mounts
  useEffect(() => {
    // dispatch(clearError())
  }, [dispatch])

  // Redirect on successful registration
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/')
    }
  }, [status, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    }

    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      // You could dispatch an action to set a custom error here
      // For simplicity, we'll just alert
      alert("Passwords don't match")
      return
    }

    dispatch(registerUser(userData))
  }

  const handleLoad = () => {
    console.log('first')
    setloader(false)
  }

  return (
    <div className='relative  min-h-screen grid grid-cols-1 lg:grid-cols-2 py-12'>
      <div></div>
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

      {/* background */}
      <div className='bg-[#17223564] absolute top-0 left w-full h-full'></div>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover -z-10'
        src={`https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
        alt='Background'
        onLoad={handleLoad}
      />

      {/* Form Container */}
      <div className='w-full   pt-20 lg:pr-5'>
        <div className='bg-gray-100/30 rounded-lg backdrop-blur-sm p-10 relative mx-5'>
          <img className='h-[30px] absolute top-5 right-5' src={img} alt='' />

          <FormHeader text='Sign Up for your free account' />
          <Form onSubmit={handleSubmit}>
            {error && (
              <div className='alert alert-error mb-4'>
                {typeof error === 'object' ? JSON.stringify(error) : error}
              </div>
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
              <Link className='' to={`/sign-in`}>
                <p> Already have an account</p>
                <p> Sign In</p>
              </Link>
              <Link to={`/`}>Back to browse</Link>
            </div>

            {/* <div className='mb-5'>
              <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4'>
                <legend className='fieldset-legend'>Login options</legend>
                <label className='label'>
                  <input type='checkbox' defaultChecked className='toggle' />
                  Join Mailing List
                </label>
              </fieldset>
            </div> */}

            <div className='flex items-end'>
              <button
                className='btn btn-neutral'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? <p> 'Signing up...'</p> : <p>'Submit'</p>}
              </button>

              {/* ===================== */}
              {/* Only on large screens */}
              {/* ===================== */}
              {isLoading && (
                <div className='hidden  md:flex items-center justify-center'>
                  <div className='h-10 w-10  border-[2px] rounded-full border-t-rose-500 animate-spin mx-10'></div>
                  <div>
                    <p className='capitalize text-md '>please wait...</p>
                    <p className='capitalize text-md '>Signing you up!</p>
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

export default SignUp
