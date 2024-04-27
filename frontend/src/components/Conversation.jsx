import React from 'react'
import { useState } from 'react'
import ChatItem from '../components/ChatItem'
import { useEffect } from 'react'

function Conversation({ user, currentChat, handleChat }) {
    const [search, setSearch] = useState('')
    const [conversations, setConversations] = useState([])

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
    }, [])
   
   

    return (
        <div className='chatMenu bg-gray-100 '>
            <div className='p-5'>

                <input
                    type="text"
                    name="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
                    placeholder="Search for friends"
                    required
                />

                {conversations.map((conversation, index) => (
                    <div key={index} onClick={() => handleChat(conversation)}>
                        <ChatItem conversation={conversation} currentUser={user} />
                    </div>
                ))}



            </div>
        </div>

    )
}

export default Conversation