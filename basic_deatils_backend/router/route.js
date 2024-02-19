const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')
const localApp = require('../auth/localapp')
const appController = require('../controllers/appController')
const registerMail = require('../controllers/mailer')


/** post */

router.post('/register', appController.register)

router.post('/registerMail', registerMail.registerMail)

router.post('/authenticate', appController.verifyUser, async (req, res) => {
    res.end()
})

router.post('/login', appController.verifyUser, appController.login)



/**Get */

router.get('/user/:username', appController.getUser)
router.get('/generateOTP', appController.verifyUser, localApp.localVariables, appController.generateOtp)
router.get('/verifyOTP', appController.verifyUser, appController.verifyOtp)
router.get('/createResetSession', appController.createResetSession)



/** Put */
router.put('/updateuser', auth, appController.updateUser)
router.put('/resetPassword', appController.verifyUser, appController.resetPassword)


module.exports = router