
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    const user = {
      email,
      password
    }
    try {
      const request = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await request.json()
     

      if (data.msg == "exist") {
        navigate('/')
      }
      else if (data.msg === "not exist") {
        alert("User not exist, Please Register first.")
      }
      else {
        alert(data.msg)
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#F0F2F5]'>

      <div className=' flex'>
        <div className='w-3/5 flex flex-col justify-center ' >
          <h1 className='text-6xl font-bold text-blue-600'>facebook</h1>
          <p className='text-3xl w-100 mt-5 '>facebook help you connected and share with the people in your life</p>
        </div>

        <div className="w-2/5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-4" action="POST" onSubmit={handleSubmit}>

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

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Log in
            </button>

            <div className='text-center'>
              <a href="#" className="ms-auto text-md text-blue-500 hover:underline dark:text-blue-500">Forgotten Password?</a>
            </div>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 " />

            <div className='flex justify-center'>
              <Link to="/register" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create new account</Link>
            </div>
          </form>



        </div>
      </div>
    </div>
  )
}

export default Login