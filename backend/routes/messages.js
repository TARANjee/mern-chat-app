import User from '../models/Conversation.js';
import jwt from 'jsonwebtoken';
import { Router as expressRouter } from 'express';

const router = expressRouter();

router.get('/home', (req, res) => {

    res.json('ghj')


})



export default router