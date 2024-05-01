import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { Router as expressRouter } from 'express';
import { comparePassword, hashpassword } from '../helper.js';

const router = expressRouter();

router.get('/home', (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json("The token was not available")
    }

    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.clearCookie("token");
            return res.json({ msg: "token is wrong" })
        }
        res.json({ msg: 'success', email: decoded.email })
    })

})
router.get('/', async (req, res) => {
    const email = req.query.email
    const userId = req.query.userId
    try {
        const user = userId
            ? await User.findById({ _id: userId })
            : await User.findOne({ email })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        
        if (!user) return res.json({ msg: "not exist" })

        
        if (comparePassword(password, user.password)) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1d' })
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
        let hashpass = hashpassword(password)

        await User.create({ name, email, password: hashpass })

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