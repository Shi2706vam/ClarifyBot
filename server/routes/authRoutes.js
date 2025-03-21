import express from 'express'
import cors from 'cors'
import { isAuthenticated, loginUser, logoutUser, resetPassword, sendResetOtp, sendVerifyOtp, signupUser, verifyEmail } from '../controllers/authController.js'
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// const express = require('express')
// const cors = require('cors')
// const { test, signupUser, loginUser, logoutUser, getProfile } = require('../controllers/authController.js')

// middleware

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/send-verify-otp', userAuth, sendVerifyOtp)
router.post('/verify-account', userAuth, verifyEmail)
router.get('/is-auth', userAuth, isAuthenticated)
router.post('/send-reset-otp', userAuth, sendResetOtp)
router.post('/reset-password', userAuth, resetPassword)

// router.get('/profile', getProfile)

// module.exports = router
export default router