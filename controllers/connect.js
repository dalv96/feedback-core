'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise
};

var url = '127.0.0.1:27017';
var name = 'feedback';
var uri = 'mongodb://' + url + '/' + name;

mongoose.connect(uri, options);

mongoose.connection.on('connected', function() {
    // console.log('Connected to DB');
});

module.exports = mongoose;
