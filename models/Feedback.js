'use strict';

var mongoose = require('../controllers/connect');

var Feedback = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    author: {
      type: String,
      required: true
    },
    department: {
        type: String,
        required: true
    },
    q1: {
        type: Number,
        required: true
    },
    q2: {
        type: Number,
        required: true
    },
    q3: {
        type: Number,
        required: true
    },
    text1: {
        type: String
    },
    text2: {
        type: String
    },
    text3: {
        type: String
    }
});

var feedback = mongoose.model('Feedback', Feedback);
module.exports = feedback;
