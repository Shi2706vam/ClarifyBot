// import { hashPassword, comparePassword } from '../helpers/auth.js'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'
import jwt from 'jsonwebtoken'
import { transporter } from '../config/nodemailer.js'

// const User = require('../models/user.js')
// const { hashPassword, comparePassword } = require('../helpers/auth.js')
// const jwt = require('jsonwebtoken')
// const { transporter } = require('../config/nodemailer.js')

// export const test = (req, res) => {
//     res.json('test is working')
// }


// register endpoint
export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name || !email || !password) {
        return res.json({
            message: 'All fields are required'
        })
    }
    try {
        // check is password is good
        if ( password.length < 6) {
            return res.json({
                message: 'Password is required and should be at least 6 characters long'
            })
        }
        // check email
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.json({
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        // create user in database
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            verifyOtp: otp,
            verifyOtpExpireAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        await user.save()

        // const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' })

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'Verification OTP Sent on Email' })

    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message})
    }
}

// login endpoint
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: 'All fields are required'
        })
    }

    try {

        // check if user exist
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({
                message: 'No user found'
            })
        }

        // check if passwords match
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.json({ success: false, message: 'Invalid Password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'Login Successful' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//send verify otp
export const sendVerifyOtp = async (req, res) => {
    try{
        const {userId} = req.body;

        const user = await UserModel.findById(userId);

        if(user.isAccountVerified) {
            return res.json({success:false, message: "Account Already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Welcome to Clarify',
            text: `Welcome to Clarify. Where question meets clarity. Your account has been created with ${email}`
        }

        await transporter.sendMail(mailOption);

        res.json({sucess: true, message: 'Verification OTP Sent on Email'})

    } catch {
        res.json({ success: false, message: error.message})
    }
}

// verify email
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        const user = await UserModel.findById(userId)

        if(!userId) {
            return res.json({success: false, message: 'User not found'})
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'})
        }

        if(user.verifyOtpExpireAt < Date.now()) {
            res.json({ success: false, message: 'OTP Expired'})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Welcome to Clarify',
            text: `Welcome to Clarify. Where question meets clarity. Your account has been created with ${user.email}`
        }

        await transporter.sendMail(mailOption);

        return res.json({success: true, message: 'Account Verified'})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true})
        
    } catch (error) {
        res.json({ success: false, message: error.message})
        
    }
}

// send password rest otp
export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.json({ success: false, message: 'Email is required'})
    }

    try {
        
        const user = await UserModel.findOne({email});
        if(!user){
        res.json({ success: false, message: 'User not found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting password is ${otp}. Use this OTP to reset your password`
        }

        await transporter.sendMail(mailOption);

        res.json({sucess: true, message: 'Password Reset OTP Sent to your Email'})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Reset user password
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({ success: false, message: 'All the fields are required'});
    }

    try {
            
        const user = await UserModel.findOne({email});

        if(!user){
        res.json({ success: false, message: 'User not found'})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({ success: false, message: 'Invalid OTP'});
        }

        if(user.resetOtpExpireAt < Date.now()) {
            res.json({ success: false, message: 'OTP Expired'})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password =hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save()

        // const mailOption = {
        //     from: process.env.SENDER_EMAIL,
        //     to: user.email,
        //     subject: 'Password Reset OTP',
        //     text: `Your OTP for resetting password is ${otp}. Use this OTP to reset your password`
        // }

        // await transporter.sendMail(mailOption);

        res.json({sucess: true, message: 'Password has been reset successfully'})
        
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Profile
// export const getProfile = (req, res) => {
//     const { token } = req.cookies
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//             if (err) throw err;
//             res.json(user)
//         })
//     } else {
//         res.json(null)
//     }
// }

// module.exports = {
//     test,
//     signupUser,
//     loginUser,
//     logoutUser,
//     getProfile
// }