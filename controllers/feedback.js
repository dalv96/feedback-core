'use strict'

var Feedback = require('../models/Feedback'),
    Account = require('../models/Account'),
    logger = require('./logger');

module.exports = {

    create: async (req, res) => {
        var body = req.body;
        var user = await Account.findOne({login: body.user}).lean();

        if(!user) {
            res.json({"error": "Такого пользователя нет!"});
            return
        }

        var feedback = new Feedback({
            user: user,
            question: body.question
        });

        feedback = await feedback.save();
        logger.log(`Добавлен отзыв о ${body.user}`);
        res.json(feedback);
    },

    delete: async (req, res) => {
        var fb = await Feedback.findOne({_id: req.params._id}).populate('user');
        var feedback = await Feedback.deleteOne({_id: req.params._id});
        if(feedback.n == "1")
            logger.log(`Удален отзыв о ${fb.user.login}`);

        res.json(feedback);
    }

};
