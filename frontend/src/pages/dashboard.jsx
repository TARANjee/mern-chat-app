import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ChatItem from '../components/ChatItem'
import Message from '../components/Message'
import ChatOnline from '../components/ChatOnline'
import Conversation from '../components/Conversation'
import { io } from 'socket.io-client';

function Dashboard() {
  const [user, setUser] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const navigate = useNavigate()
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef()

  useEffect(() => {
    setSocket(io("ws://localhost:4000"))
  }, [])

  console.log(socket)
  // useEffect(() => {
  //   socket?.on("welcome", msg => {
  //     console.log(msg)
  //   })
  // }, [socket])

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
  const getMessages = async () => {
    if (!currentChat) return
    try {
      const res = await fetch(`/api/messages/${currentChat._id}`)
      const data = await res.json()
      setMessages(data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMessages()

  }, [currentChat])


  const handleChat = async (c) => {
    console.log(c)
    setCurrentChat(c)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    try {
      const res = await fetch('/api/messages', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      })
      const data = await res.json()
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div>
      <Navbar />
      <div className='w-full flex height'>
        {user !== null ? (
          <Conversation user={user} handleChat={handleChat} />
        ) : ''}


        <div className='chatBox  px-2'>
          {currentChat ? (
            <div>
              <div className='height2 overflow-y-scroll'>

                <div className='p-5 '>
                  {messages && messages.map((message, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message user={user} message={message} />
                    </div>
                  ))}

                </div>
              </div>
              <div className='mt-5 flex items-center justify-between'>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  id="message"
                  rows="4"
                  className="resize-none block p-2.5 w-full text-lgtext-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Something here...">
                </textarea>
                <button
                  onClick={handleSubmit}
                  className="w-50 m-5 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Send
                </button>
              </div>
            </div>
          ) : <span className='w-full h-full flex justify-center items-center text-gray-300 text-4xl'>Open a conversation to start a chat</span>}
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