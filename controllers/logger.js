'use strict';
const helper = require('./helper');

module.exports = {

    log: function (text) {
        var now = helper.dateToExtStr(new Date()),
            str = `[INFO] ${now} - ${text}`;

        console.log(str);
    }

};
