import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function getUser() {
      const request = await fetch('/api/auth/home')
      const res = await request.json()

      if (res.msg == 'success') {
        navigate('/')
      }
    }
    return () => {
      getUser()
    }


  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(isValidEmail)) {
      alert("email is not valid")
    }
    if (password.length < 6) {
      alert("password length should be 6 character")
    }
    if (password !== cpassword) {
      alert("password doesn't match")
    }


    const user = {
      name,
      email,
      password
    }
    try {
      const request = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await request.json()
      if (data.msg == 'success') {
        navigate('/login')
      }
      else {
        alert("user already exist")
      }

    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#F0F2F5]'>
      <div className=' flex '>
        <div className='w-3/5 flex flex-col justify-center  ' >
          <h1 className='text-6xl font-bold text-blue-600'>facebook</h1>
          <p className='text-3xl w-100 mt-5 '>facebook help you connected and share with the people in your life</p>
        </div>

        <div className="w-2/5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-4" action="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
              placeholder="Full Name"
              required />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
              placeholder="Email address"
              required />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
              required />
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Confirm Password"
              className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
              required />


            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 " />
            <div className='flex justify-center'>
              <Link to='/login' className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log into Account</Link>
            </div>
          </form>



        </div>
      </div>
    </div>
  )
}

export default Register