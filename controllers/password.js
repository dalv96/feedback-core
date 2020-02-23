const crypto = require('crypto');

const secret = 'wertvbngnmlw21312';

module.exports = {
    createHash(pass) {
        return crypto.createHmac('sha256', secret)
            .update(pass)
            .digest('hex');
    },
};
