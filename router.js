const Account = require('./controllers/account'),
    Feedback = require('./controllers/feedback');

module.exports = function (app) {

    app.get('/account/:login', Account.get);

    app.post('/account/create', Account.create);

    app.delete('/account/:login/delete', Account.delete);

    app.post('/account/:login/edit', Account.edit);

    app.post('/account/:login/editPass', Account.editPass);

    app.post('/feedback/create', Feedback.create);

    app.delete('/feedback/delete', Feedback.delete);

}
