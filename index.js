const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth').Strategy;
const timeout = require('connect-timeout');
const moment = require('moment');

const router = require('./router');

const conf = require('./conf/secret');
const helper = require('./controllers/helper');

const app = express();

const OPTS = {
    server: conf.ldap,
};

app.use(morgan((tokens, req, res) => [
    moment().format('DD.MM.YYYY HH:mm:ss'),
    '*',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
].join(' ')));

app
    // .use(morgan('dev'))
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors({ origin: true, credentials: true }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser());

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

app.use(timeout(10000));
app.use(haltOnTimedout);

// passport.use(new LdapStrategy(OPTS));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

app.post('/login', (req, res, next) => {
    passport.authenticate('ldapauth', {}, (err, user) => {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            return res.send({ error: true });
        }
        return res.send(user);
    })(req, res, next);
});

router(app);

app.listen(3030, () => {
    console.log(`\n  ################## RELOAD SERVER - ${helper.dateToExtStr()} ################### \n`);
});
