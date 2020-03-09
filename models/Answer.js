const mongoose = require('../controllers/connect');
const Question = require('./Question');

const { REQUIRED_STRING, REQUIRED_DATE } = require('./default');

const Answer = mongoose.Schema({
    user: REQUIRED_STRING,
    department: REQUIRED_STRING,
    question: {
        type: Question,
        required: true,
    },
    created: {
        ...REQUIRED_DATE,
        default: new Date(),
    },
    variants: [{
        text: REQUIRED_STRING,
        color: REQUIRED_STRING,
    }],
});

const answer = mongoose.model('Answer', Answer);
module.exports = answer;
