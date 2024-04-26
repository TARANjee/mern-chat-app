import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import Message from '../components/Message'
import ChatOnline from '../components/ChatOnline'
import Conversation from '../components/Conversation'

function Dashboard() {
  const [user, setUser] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {

    async function getUser() {
      const request = await fetch('/api/auth/home')
      const res = await request.json()

      if (res.msg !== 'success') {
        navigate('/login')
      }
      const request2 = await fetch(`/api/auth?email=${res.email}`)
      const data = await request2.json()

      setUser(data)
    }

    return () => {
      getUser()
    }
  }, [])



  return (
    <div>
      <Navbar />
      <div className='w-full flex height'>
        {user !== null ? (
          <Conversation user={user} />
        ) : ''}


        <div className='chatBox  '>
          <div className='height2 overflow-y-scroll'>
            <div className='p-5 '>
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
            </div>
          </div>
          <div className='mt-5 flex items-center justify-between'>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-lgtext-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write Something here...">
            </textarea>
            <button
              type="submit"
              className="w-50 m-5 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Send
            </button>
          </div>

        </div>
        <div className='chatOnine'>
          <div className='p-5'>

            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard