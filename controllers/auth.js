var Account = require('../models/Account'),
    password = require('./password'),
    logger = require('./logger');

module.exports = {

  isLoggedIn: async (req, res, next) => {
      if (req.session.user) {
          var acc = await Account.findOne({login: req.session.user});
          res.locals.user = {
              _id: acc._id,
              login: acc.login,
              name: acc.name
          };
          next();
      } else {
        res.locals.user = null;
        next()
      }
  },

  checkAuth: async (req, res) => {
      if (req.session.user) {
          var acc = await Account.findOne({login: req.session.user});
          res.locals.user = {
              _id: acc._id,
              login: acc.login,
              name: acc.name
          };
          res.send({user: res.locals.user})
      } else {
        res.send({user: null});
      }
  },

  logout: function(req, res) {
      req.session.destroy();
      res.send('Ok')
  },

  login: async (req, res) => {
      var acc = await Account.findOne({
          login: req.body.login,
          password: password.createHash(req.body.password)
      })

      if (acc) {
          req.session.user = acc.login;
          logger.log(`Success authorization by : ${acc.login}`);
          res.sendStatus(200);
      } else {
          res.send({"error": true})
      }
  }
}
