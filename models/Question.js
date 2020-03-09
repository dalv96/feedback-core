const mongoose = require('../controllers/connect');

const { REQUIRED_STRING } = require('./default');

const Question = mongoose.Schema({
    text: REQUIRED_STRING,
    type: REQUIRED_STRING,
    variants: [{
        text: REQUIRED_STRING,
        color: REQUIRED_STRING,
    }],
});

const question = mongoose.model('Question', Question);
module.exports = question;
