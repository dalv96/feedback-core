const Account = require('./controllers/account');
const Poll = require('./controllers/poll');

module.exports = function (app) {
    app.get('/account/', Account.getAll);
    app.get('/account/:login', Account.get);
    app.post('/account/create', Account.create);
    app.delete('/account/:login/delete', Account.delete);
    app.post('/account/:login/edit', Account.edit);
    app.post('/account/loginCheck', Account.testLogin);
    app.post('/account/:login/editPass', Account.editPass);

    app.get('/api/v1/poll/active', Poll.getCurrent);
    app.get('/api/v1/poll/', Poll.getAll);
    app.get('/api/v1/poll/:_id', Poll.get);
    app.post('/api/v1/poll', Poll.create);
    app.put('/api/v1/poll', Poll.edit);

    app.all('*', (req, res) => {
        res.send({
            user: res.locals.user,
            data: res.locals.data,
        });
    });
};
