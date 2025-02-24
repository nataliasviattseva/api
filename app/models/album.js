const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
    }
    ]
});

module.exports = albumSchema