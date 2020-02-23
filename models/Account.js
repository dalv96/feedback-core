
const mongoose = require('../controllers/connect');

const Account = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
});

const account = mongoose.model('Account', Account);
module.exports = account;
