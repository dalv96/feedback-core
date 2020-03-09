const mongoose = require('../controllers/connect');

const { Schema } = mongoose;

const { REQUIRED_STRING, REQUIRED_DATE } = require('./default');

const Poll = Schema({
    name: REQUIRED_STRING,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
    }],
    created: {
        ...REQUIRED_DATE,
        default: new Date(),
    },
    active: Boolean,
    // dateStart: REQUIRED_DATE,
    // dateEnd: REQUIRED_DATE,
});

const poll = mongoose.model('Poll', Poll);
module.exports = poll;
