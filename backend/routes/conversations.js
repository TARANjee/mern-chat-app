import Conversation from '../models/Conversation.js';
import { Router as expressRouter } from 'express';

const router = expressRouter();

// new conv
router.post('/', async (req, res) => {
    let senderId = req.body.senderId
    let receiverId = req.body.receiverId
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    })

    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
//get conv
router.get('/:userId', async (req, res) => {
    const id = req.params.userId
    try {
        const allCoversation = await Conversation.find({
            members: { $in: [id] }
        })
        res.status(200).json(allCoversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router