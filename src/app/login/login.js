const { Router } = require('express');
const loginRouter = new Router();
const cookieParser = require('cookie-parser');
const { itemData } = require('../../../services');

loginRouter.use(cookieParser());
loginRouter.get('/login', (req, res) => {
    //res.cookie('login', true, { httpOnly: true });
    res.render('login');
});

loginRouter.post('/login', (req, res) => {
    console.log('POST /login');
    let body = '';
    req.on('data', data => {
        body += data;
    })

    req.on('end', async () => {
        const splitedBody = body.split('&');
        const login = splitedBody[0].replace('login=', '');
        const password = splitedBody[1].replace('password=', '');
        await itemData.setItem({
            login: login,
            password: password
        })
        res.cookie('login', true, { httpOnly: true });
        res.redirect('/');
    })
});
module.exports = loginRouter;