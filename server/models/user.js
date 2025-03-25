import mongoose, { Schema } from 'mongoose'

// const mongoose = require('mongoose')
// const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp: {
        type: String, 
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number, 
        default: 0
    },
    isAccountVerified: {
        type: Boolean, 
        default: false
    },
    resetOtp: {
        type: String, 
        default: ''
    },
    resetOtpExpiresAt: {
        type: Number, 
        default: 0
    },
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel;
// module.exports = UserModel