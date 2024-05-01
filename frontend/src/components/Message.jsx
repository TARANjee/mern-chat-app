import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { format } from 'timeago.js';

function Message({ message, user }) {
    const [own, setOwn] = useState(false)
    useEffect(() => {
        if (user._id === message.sender) {
            setOwn(true)
        }
    }, [])
 
    return (
        <div className='my-5'>
            <div className={`  w-full  flex gap-2 ${own && ' justify-end'} `}>
                <img className='w-10 h-10 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                <div className={` ${own ? ' bg-gray-100 text-black' : 'bg-blue-500 text-white'} max-w-[60%] rounded-full px-6 py-2`}>
                    <p >{message.text}</p>
                </div>
            </div>
            <p className={` mt-2 text-sm text-gray-500 ${own && 'flex justify-end'} `}>{format(message.createdAt)}</p>
        </div>
    )
}

export default Message