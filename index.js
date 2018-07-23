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
    LdapStrategy = require('passport-ldapauth').Strategy;

var app = express();
// user - 12345zaQ
// test - Qaz12345
var OPTS = {
    server: {
      url: 'ldap://neao-m.ru:389',
      bindDN: "dnuser",
      bindCredentials: 'Qaz12345',
      searchBase: "ou=NEAO,dc=neao-m,dc=ru",
      searchFilter: 'sAMAccountName={{username}}'
    }
};

passport.use(new LdapStrategy(OPTS));

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/login', passport.authenticate('ldapauth', {}), function(req, res) {
  res.send(req.user);
});

router(app);

app.listen(3030, function () {
  console.log(`\n  ################## RELOAD SERVER - ${helper.dateToExtStr()} ################### \n`);
});
