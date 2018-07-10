'use strict'

const crypto = require('crypto');
const secret = 'wertvbngnmlw21312';

module.exports = {
    createHash: function (pass) {
        return crypto.createHmac('sha256', secret)
            .update(pass)
            .digest('hex');
    }
}
