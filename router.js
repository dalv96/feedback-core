const Account = require('./controllers/account'),
    Feedback = require('./controllers/feedback'),
    Auth = require('./controllers/auth');

module.exports = function (app) {

    // app.post('/login', Auth.login);
    //
    // app.all('/checkAuth', Auth.checkAuth);
    //
    // app.post('/logout', Auth.logout);
    //
    // app.all('*', Auth.isLoggedIn);

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

    app.all('*', function (req, res) {
      res.send({
        user: res.locals.user,
        data: res.locals.data
      })
    })
}
