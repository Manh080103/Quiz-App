const attemptRouter = require('./attempts');

function route(app) {
    app.use('/', attemptRouter);
}

module.exports = route;