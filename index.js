var express = require('express'),
    router = require('./router'),
    helper = require('./controllers/helper'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    mongoose = require('./controllers/connect'),
    MongoStore = require('connect-mongo')(expressSession);

var app = express();

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors({
      origin: true,
      credentials: true
    }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(expressSession({
        secret: 'asdasdasd',
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000 // 2 недели
        },
        name: 'feedback',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            autoRemove: 'native',
            ttl: 14 * 24 * 60 * 60,
            touchAfter: 10 * 60,
            stringify: true
        })
    }))

router(app);

app.listen(3030, function () {
    console.log(`\n  ################## RELOAD SERVER - ${helper.dateToExtStr()} ################### \n`);
});
