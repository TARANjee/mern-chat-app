import Message from '../models/Message.js';
import { Router as expressRouter } from 'express';

const router = expressRouter();
//add
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error.message)
    }

})

//get
router.get('/:conversationId', async (req, res) => {
    let conversationId = req.params.conversationId
    try {
        const messages = await Message.find({ conversationId })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router