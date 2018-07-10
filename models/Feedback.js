'use strict';

var mongoose = require('../controllers/connect');

var Feedback = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    question: {
        type: Number,
        required: true
    }
});

var feedback = mongoose.model('Feedback', Feedback);
module.exports = feedback;
