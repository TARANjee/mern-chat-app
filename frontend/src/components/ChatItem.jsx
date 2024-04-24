import React from 'react'

function ChatItem() {
    return (
        <div className='flex items-center gap-5 my-5'>
            <img className='w-12 h-12 rounded-full' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div>
                <p className='text-xl font-medium'>john Doe</p>
            </div>
        </div>
    )
}

export default ChatItem