const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/registration', 
    [
        check('email', 'Неккоректный email').isEmail(),
        check('password', 'Неккоректный пароль').isLength({ min: 6 })
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Неккоректные данные при регистрации'})
            } 

            const { email, password } = req.body
            const isUsed = await User.findOne({ email })
            if (isUsed) {
                return res.status(300).json({ message: 'Такой email уже занят.' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'Пользователь создан'})
        } catch (err) {
            console.log(err);
        }
})

router.post('/login', 
    [
        check('email', 'Неккоректный email').isEmail(),
        check('password', 'Неккоректный пароль').exists()
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Неккоректные данные при регистрации'})
            } 

            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'Такого email нет в базе' })
            }

            const isCompare = await bcrypt.compare(password, user.password)
            if(!isCompare) {
                return res.status(400).json({ message: 'Пароли не совпадает' })
            }

            const jwtSecretKey = 'SECRET_KEY_HERE';
            const token = jwt.sign(
                {userId: user.id},
                jwtSecretKey,
                { expiresIn: '1h' }
            )

            return res.json({ token, userId: user.id })

        } catch (err) {
            console.log(err);
        }
})

module.exports = router;