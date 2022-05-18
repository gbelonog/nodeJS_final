const { Router } = require('express');
const apiRouter = new Router();

apiRouter.get('/', require('./home/home'));

module.exports = apiRouter;