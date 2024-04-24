import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { Router as expressRouter } from 'express';

const router = expressRouter();

router.get('/home', (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json("The token was not available")
    }

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) return res.json("token is wrong")
        res.json({ msg: 'success', email: decoded.email })
    })

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    try {
        const user = await User.findOne({ email })
        if (!user) return res.json({ msg: "not exist" })
        if (password == user.password) {
            const token = jwt.sign({ email: user.email }, 'jwt-secret-key', { expiresIn: '1d' })
            res.cookie("token", token);
            res.send({ msg: 'exist' })
        }
        else {
            res.send({ msg: "incorrect credential" })
        }


    } catch (error) {
        res.send(error.message)
    }

})
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const finduser = await User.findOne({ email })
        if (finduser) return res.json({ msg: "exist" })

        let user = await User.create({ name, email, password })

        res.send({ msg: "success" })


    } catch (error) {
        res.send(error.message)
    }

})
router.get('/logout', (req, res) => {
    console.log('logout')
    res.clearCookie("token");
    res.send({ msg: 'Cookie deleted' });
})

export default router