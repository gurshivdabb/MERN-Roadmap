/**
 * Experience.js
 * Mongoose model for Experience entity
 * 
 * Author: Gurshiv Singh Dabb
 */

import mongoose from 'mongoose';

// Experience Schema
const experienceSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    pictures: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },

},
    {
        timestamps: true
    });

export default mongoose.model('Experience', experienceSchema);