import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import authRoute from './routes/auth.js';
import conversationsRoute from './routes/conversations.js';
import messagesRoute from './routes/messages.js';
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("hello world")
})

app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationsRoute)
app.use("/api/messages", messagesRoute)

app.listen(8000, () => {
    mongoose.connect(process.env.mongoDBURL)
        .then(() => {
            console.log("mongodb is connected")
        })
        .catch((e) => console.log(e))
    console.log("app is running at port 8000")
})