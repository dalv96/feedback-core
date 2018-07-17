'use strict'

var Feedback = require('../models/Feedback'),
  Account = require('../models/Account'),
  logger = require('./logger');

module.exports = {

  create: async (req, res) => {
    var body = req.body;
    var user = await Account.findOne({ login: res.locals.user.login }).lean();

    if (!user) {
      res.json({"error": "Такого пользователя нет!"});
      return
    }

    var feedback = new Feedback({
      user: user,
      q1: body.q1,
      q2: body.q2,
      q3: body.q3,
      text1: body.text1,
      text2: body.text2,
      text3: body.text3
    });
    feedback = await feedback.save();
    logger.log(`Добавлен отзыв о ${user.login}`);
    return
  },

  delete: async (req, res) => {
    var fb = await Feedback.findOne({_id: req.params._id}).populate('user');
    var feedback = await Feedback.deleteOne({_id: req.params._id});
    if(feedback.n == "1")
      logger.log(`Удален отзыв о ${fb.user.login}`);

    res.json(feedback);
  }

};
