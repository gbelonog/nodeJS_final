const { Router } = require('express');
const appRouter = new Router();

appRouter.get('/', require('./home/home'));
appRouter.get('/signup', require('./signup/signup'));
appRouter.post('/signup', require('./signup/signup'));
appRouter.get('/login', require('./login/login'));
appRouter.post('/login', require('./login/login'));
appRouter.get('/chat', require('./chat/chat'));
appRouter.get('/logout', (req, res) => {
    res.cookie('login', false, { httpOnly: true });
    res.redirect('/'); 
});
module.exports = appRouter;