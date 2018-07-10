var express = require('express'),
    router = require('./router'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

app.listen(3001, function () {
    console.log('Server listen on 3001');
});
