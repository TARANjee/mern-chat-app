import React from 'react'
import { useState } from 'react'
import ChatItem from '../components/ChatItem'
import { useEffect } from 'react'

function Conversation({ user, handleChat }) {
    const [search, setSearch] = useState('')
    const [conversations, setConversations] = useState([])
    const [newConversation, setNewConversation] = useState(null)
    useEffect(() => {
        async function getConversation() {

            try {
                const res = await fetch(`/api/conversations/${user._id}`)
                const data = await res.json()

                setConversations(data)

            } catch (error) {
                console.log(error)
            }

        }

        return () => {
            getConversation()
        }
    }, [newConversation])

    const createConversation = async () => {
        try {
            const req = await fetch(`/api/auth?email=${search}`)
            const Userdata = await req.json()

            if (Userdata) {
                let newConversation = {
                    senderId: user._id,
                    receiverId: Userdata._id
                }

                let res = await fetch("/api/conversations/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newConversation)
                })
                const data = await res.json()
                setNewConversation(data)
                setSearch('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='chatMenu bg-gray-200'>
            <div className='p-5'>

                <input
                    type="text"
                    name="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
                    placeholder="Search for friends with email address"
                    required
                />
                <button onClick={createConversation} className='w-full bg-blue-400 text-white rounded-lg mt-2 px-2 py-3'>Add Friend</button>
                {conversations && conversations.map((conversation, index) => (
                    <div key={index} onClick={() => handleChat(conversation)}>
                        <ChatItem conversation={conversation} currentUser={user} />
                    </div>
                ))}



            </div>
        </div>

    )
}

export default Conversation