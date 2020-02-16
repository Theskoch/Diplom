const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, yalidationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register',

[
    check('email', 'you email dermo').isEmail(),
    check('password', 'you password dermo').isLength({min:1})
],

async (req, res) => {

    try{
        const errors = validationResult(req)     
        
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                massage: 'you idiot'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate){
            return res.status(400).json({massage: 'user is dafain'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        
        await user.save()

        res.status(201).json({ massage:'user complite' })


    }catch(e){
        res.status(500).json({massage: "ouu shit"})
    }
})



// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'email incorect').normalizeEmail().isEmail(),
        check('password', 'password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)     
        
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                massage: 'you idiot'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user){
            return res.status(400).json({massage: 'user undefane'})
        }

        const isMach = await bcrypt.compare(password, user.password)

        if (!isMach){
            return res.status(400).json({ massage: 'password undefane'})
        }

        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id })

    }catch(e){
        res.status(500).json({massage: "ouu shit"})
        
    }
    
})


module.exports = router