const { Router } = require('express');
const apiRouter = new Router();

apiRouter.use('/', require('./home/home'));
apiRouter.use('/signup', require('./signup/signup'));
apiRouter.use('/login', require('./login/login'));
apiRouter.use('/chat', require('./chat/chat'));
apiRouter.use('/logout', (req, res) => {
    res.cookie('login', false, { httpOnly: true });
    res.redirect('/'); 
});

module.exports = apiRouter;