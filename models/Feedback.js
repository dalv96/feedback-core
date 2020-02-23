const mongoose = require('../controllers/connect');

const REQUIRED_STRING = {
    type: String,
    required: true,
};

const REQUIRED_DATE = {
    type: Date,
    required: true,
};

const Feedback = mongoose.Schema({
    date: {
        ...REQUIRED_DATE,
        default: new Date(),
    },
    author: REQUIRED_STRING,
    department: REQUIRED_STRING,
    questions: [{
        text: REQUIRED_STRING,
        type: REQUIRED_STRING,
        variants: [{
            color: REQUIRED_STRING,
            text: REQUIRED_STRING,
        }],
    }],
    dateStart: REQUIRED_DATE,
    dateEnd: REQUIRED_DATE,
});

const feedback = mongoose.model('Feedback', Feedback);
module.exports = feedback;
