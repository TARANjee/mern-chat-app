import React from 'react'
import { useEffect, useState } from 'react'
import { format, render, cancel, register } from 'timeago.js';

function Message({ user, message }) {
    const [own, setOwn] = useState(false)
    
    useEffect(() => {
        if (user._id === message.sender) {
            setOwn(true)
        }
        
    }, [])


    return (
        <div className='my-5'>
            <div className={`  w-full  flex gap-2 ${own && ' justify-end'} `}>
                <img className='w-10 h-10 rounded-full' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className={` ${own ? ' bg-gray-100 text-black' : 'bg-blue-500 text-white'} max-w-[60%] rounded-full px-6 py-2`}>
                    <p>{message.text}</p>
                </div>
            </div>
            <p className={` mt-2 text-sm text-gray-500 ${own && 'flex justify-end'} `}>{format(message.createdAt)}</p>
        </div>
    )
}

export default Message