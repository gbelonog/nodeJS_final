const { Router } = require('express');
const loginRouter = new Router();
const cookieParser = require('cookie-parser');
const { itemData } = require('../../../services');

loginRouter.use(cookieParser());
loginRouter.get('/login', (req, res) => {
    res.render('login');
});
loginRouter.post('/login', async(req, res) => {
    let items = await itemData.getItem();
    const loginsArray = items.map(e => e.login == req.body.login);
    const result = loginsArray.findIndex((e) => {if(e) return e});
    if(result > -1){
        res.cookie('login', true, { httpOnly: true });
        res.redirect('/'); 
    } else {
        res.redirect('/login');
    }        
});
module.exports = loginRouter;