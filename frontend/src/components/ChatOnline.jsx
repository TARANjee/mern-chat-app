
import { useState, useEffect } from 'react'

function ChatOnline({ onlineUsers, currentId }) {
    const [onlineFriends, setOnlineFriends] = useState(null)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        if (!onlineUsers) return
        setFriends([...onlineUsers])
    }, [onlineUsers])



    useEffect(() => {
        const getUser = () => {
            let arr = []
            friends && friends.map(async (user) => {

                if (friends.length === 1 && user.userId === currentId) {
                    setFriends(null)
                    return
                }

                if (user.userId === currentId) return
                const req = await fetch(`/api/auth?userId=${user.userId}`)
                const data = await req.json()
                arr.push(data)
                setOnlineFriends([...arr])
            })
        }
        getUser()
    }, [friends])
    return (
        <div>
            {friends && onlineFriends && onlineFriends.map((online, index) => (
                <div key={index} className='relative flex items-center gap-3 my-5'>
                    <div className='relative'>
                        <img className='w-8 h-8 rounded-full' src={online.profile_picture ? online.profile_picture : `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`} alt="" />
                        <div className='absolute top-0 right-0 w-2 h-2 rounded-full bg-green-400'></div>
                    </div>
                    <div>
                        <p className='font-medium'>{online.name}</p>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default ChatOnline