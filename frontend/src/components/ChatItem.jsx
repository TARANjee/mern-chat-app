import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function ChatItem({ conversation, currentUser }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await fetch(`/api/auth?userId=${friendId}`)
                const data = await res.json()
                setUser(data)
            } catch (error) {
                console.log(error)
            }

        }
        return () => {
            getUser()
        }
    }, [currentUser, conversation])

    return (
        <div className='flex items-center gap-5 cursor-pointer my-2 py-3 px-2 hover:bg-gray-200'>
            <img className='w-12 h-12 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
            <p className='text-xl font-medium'>{user && user.name}</p>
        </div>
    )
}

export default ChatItem