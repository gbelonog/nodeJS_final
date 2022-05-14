const { Router } = require('express');
const loginRouter = new Router();
const cookieParser = require('cookie-parser');
const { itemData } = require('../../../services');

loginRouter.use(cookieParser());
loginRouter.get('/login', (req, res) => {
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
        let items = await itemData.getItem();
        console.log('items in login',items);
        const loginsArray = items.map(e => e.login == login);
        console.log('loginsArray',loginsArray);
        const result = loginsArray.findIndex ((e) => e == true);
        console.log('result', result);
        if(result > -1){
            res.cookie('login', true, { httpOnly: true });
            res.redirect('/'); 
        } else {
            res.redirect('/login');
        }        
    })
});
module.exports = loginRouter;