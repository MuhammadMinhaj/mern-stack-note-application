const router = require('express').Router()
const {
    singupPostController,
    loginPostController,
    verifyTokenGetController,
    userGetController
} = require('../controllers/authController')


router.post('/singup',singupPostController)
router.post('/login',loginPostController)

router.post('/verify-token',verifyTokenGetController)
router.get('/user',userGetController)
module.exports = router