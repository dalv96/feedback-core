var express = require('express'),
    router = require('./router'),
    helper = require('./controllers/helper'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    mongoose = require('./controllers/connect'),
    MongoStore = require('connect-mongo')(expressSession),
    passport = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy,
    conf = require('./conf/secret');

const morgan = require('morgan');

var app = express();

var OPTS = {
  server: conf.ldap
}
passport.use(new LdapStrategy(OPTS));

app
    .use(morgan('dev'))
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors({
      origin: true,
      credentials: true
    }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/login', function (req, res, next) {
  passport.authenticate('ldapauth', {}, function (err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({error: true});
    }
    return res.send(user);
  })(req, res, next);
});

router(app);

app.listen(3030, function () {
  console.log(`\n  ################## RELOAD SERVER - ${helper.dateToExtStr()} ################### \n`);
});
