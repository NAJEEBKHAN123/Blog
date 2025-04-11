const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);