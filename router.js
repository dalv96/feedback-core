const Account = require('./controllers/account');
const Feedback = require('./controllers/feedback');

module.exports = function (app) {
    app.get('/account/', Account.getAll);

    app.get('/account/:login', Account.get);

    app.post('/account/create', Account.create);

    app.delete('/account/:login/delete', Account.delete);

    app.post('/account/:login/edit', Account.edit);

    app.post('/account/loginCheck', Account.testLogin);

    app.post('/account/:login/editPass', Account.editPass);

    app.post('/feedback/create', Feedback.create);

    app.delete('/feedback/delete', Feedback.delete);

    app.get('/stat', Feedback.get);

    app.get('/excel', Feedback.getExcel);

    app.all('*', (req, res) => {
        res.send({
            user: res.locals.user,
            data: res.locals.data,
        });
    });
};
