import React, { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ChatItem from '../components/ChatItem'
import Message from '../components/Message'
import ChatOnline from '../components/ChatOnline'
import Conversation from '../components/Conversation'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineusers] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const navigate = useNavigate()
  const socket = useRef()
  const scrollref = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:4000")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])


  useEffect(() => {
    if (!user) return
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users) => {
      setOnlineusers(users)
    })
  }, [user])




  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


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
    setCurrentChat(c)
    const receiverId = c.members.find(member => member !== user._id)
    try {
      const req = await fetch(`/api/auth?userId=${receiverId}`)
      const data = await req.json()
      setReceiver(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    let newmsg = newMessage.trim()
    if (newmsg.length == 0) {
      alert("please write something")
      setNewMessage('')
      return
    }
    console.log(newmsg)
    let msg = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newmsg
    }
    const receiverId = currentChat.members.find(member => member !== user._id)
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newmsg
    })
    try {
      const res = await fetch("/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
      })
      const data = await res.json()
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='w-full flex height'>
        {user !== null ? (
          <Conversation user={user} handleChat={handleChat} />
        ) : ''}


        <div className='chatBox  '>
          {currentChat ? (
            <div>
              <div className='flex items-center gap-5  my-2 py-3 px-2 '>
                <img className='w-12 h-12 rounded-full' src={receiver && receiver.profile_picture ? user.profile_picture : `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`} alt="" />
                <p className='text-xl font-medium'>{receiver && receiver.name}</p>
              </div>
              <div className='height2 overflow-y-scroll'>
               
                <div className='p-5 '>
                  {messages && messages.map((message, index) => (
                    <div key={index} ref={scrollref} >
                      <Message message={message} user={user} />
                    </div>
                  ))}


                </div>
              </div>
              <div className='px-2 mt-5 flex items-center justify-between'>
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
                  type="submit"
                  className="w-50 m-5 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Send
                </button>
              </div>
            </div>
          ) : <span className='w-full h-full flex justify-center items-center text-gray-300 text-4xl'>Open a conversation to start a chat</span>}
        </div>
        <div className='chatOnine'>
          <div className='p-5'>

            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user && user._id}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard