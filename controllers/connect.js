const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
};

const url = '127.0.0.1:27017';
const name = 'feedback';
const uri = `mongodb://${url}/${name}`;

mongoose.connect(uri, options);

mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});

module.exports = mongoose;
