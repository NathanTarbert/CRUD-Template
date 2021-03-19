const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,        
    },
    likes: {
        type: String,
        default: 0
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);