'use strict'

var Account = require('../models/Account'),
    password = require('./password'),
    logger = require('./logger');

module.exports = {

    test: async (req, res) => {
        console.log(req.body);

        res.send({"ok": "1"});
    },

    getAll: async (req, res, next)  => {
        var accounts = await Account.find().lean();
        res.locals.data = accounts;
        next();
    },

    get: async (req, res)  => {
        var account = await Account.findOne({ login: req.params.login }).lean();

        if(!account) res.json({"error": "Такого пользователя нет в системе!"});
        else res.json(account);
    },

    auth: async (req, res)  => {
        var account = await Account.findOne({
             login: req.body.login,
             pass: password.createHash(req.body.password)
         }).lean();

        if(!account) res.json({"error": "Ошибка авторизации!"});
        else res.json(account);
    },

    create: async (req, res) => {
        var body = req.body;
        var test = await Account.findOne({login: body.login}).lean();
        if(test) res.json({"error": "Данный логин занят!"});
        else {
            if(!body.login || !body.password || !body.name) {
                res.json({"error": "Введены не все данные!"});
                return;
            }

            var account = new Account({
                login: body.login,
                password: password.createHash(body.password),
                name: body.name
            });
            account = await account.save();
            logger.log(`Создан аккаунт -> ${account.name}`);
            res.json(account);
        }
    },

    edit: async (req, res) => {
        var body = req.body;
        var account = await Account.findOne({login: req.params.login});

        if(!account) {
            res.json({"error": "Такого пользователя нет в системе!"});
            return;
        }

        if(!body.name || body.name.length == 0) {
            res.json({"error": "Ф.И.О. пользователя обязательно для заполнения!"})
            return;
        }
        var oldName = account.name;
        account.name = body.name;
        account = await account.save();
        logger.log(`Изменен аккаунт ${account.name}: ${oldName} -> ${body.name}`);
        res.json(account);
    },

    editPass: async (req, res) => {
        var body = req.body;
        var account = await Account.findOne({login: req.params.login});

        if(!account) {
            res.json({"error": "Такого пользователя нет в системе!"});
            return;
        }

        if(!body.password || body.password.length == 0) {
            res.json({"error": "Ф.И.О. пользователя обязательно для заполнения!"})
            return;
        }
        account.password = password.createHash(body.password);

        account = await account.save();
        logger.log(`Изменен пароль ${account.name}`);
        res.json(account);
    },

    delete: async (req, res) => {
        var account = await Account.deleteOne({login: req.params.login});
        if(account.n == "1")
            logger.log(`Удален пользователь ${req.params.login}`);

        res.json(account);
    }

};
