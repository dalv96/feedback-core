const helper = require('./helper');

module.exports = {

    log(text) {
        const now = helper.dateToExtStr(new Date());
        const str = `[INFO] ${now} - ${text}`;

        console.log(str);
    },

};
