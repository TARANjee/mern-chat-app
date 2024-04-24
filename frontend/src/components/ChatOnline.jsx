import React from 'react'

function ChatOnline() {
    return (
        <div className='relative flex items-center gap-3 my-5'>
            <div className='relative'>
                <img className='w-8 h-8 rounded-full' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className='absolute top-0 right-0 w-2 h-2 rounded-full bg-green-400'></div>
            </div>
            <div>
                <p className='font-medium'>john Doe</p>
            </div>


        </div>
    )
}

export default ChatOnline