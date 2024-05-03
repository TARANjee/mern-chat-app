const io = require("socket.io")(4000, {
    cors: {
        origin: "http://localhost:3000"
    }
})
let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId == userId) &&
        users.push({ userId, socketId })
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on("connection", (socket) => {
    //When Connected
    console.log("a user connected")
    // io.emit("welcome", "hello this is socket server")
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
       
        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }
    })

    // When Disconnected
    socket.on("disconnect", () => {
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })

})