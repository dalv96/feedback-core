var Account = require('../models/Account'),
    password = require('./password'),
    logger = require('./logger');

module.exports = {
  //
  isLoggedIn: async (req, res, next) => {

      if (req.session.user) {
          var acc = await Account.findOne({login: req.session.user});
          res.locals.user = {
              _id: acc._id,
              login: acc.login,
              name: acc.name
          };
          res.send(res.locals.user);
          next();
      } else {
        res.send({"error": "unauthorizate"})
      }
  },

  logout: function(req, res) {
      console.log(req);
      req.session.destroy();
  },

  checkAuth: async (req, res) => {
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
