const io = require("socket.io")(4000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

io.on("connection", (socket) => {
    console.log("a user connected")
    // io.emit("welcome", "hello this is socket server!")
    
    //take userId and socketId from user
});
