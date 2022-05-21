const { Router } = require('express');
const homeRouter = new Router();
const { itemData } = require('../../../services');
const pug = require('pug');
const path = require('path');
const cookieParser = require('cookie-parser');

homeRouter.use(cookieParser());
homeRouter.get('/', async(req, res) => {
    let { login } = req.cookies;
    let items = await itemData.getItem();
    const list = items.map(e => e.login);
    res.send(
        pug.renderFile(path.join(__dirname, '..', '..', '..', 'src', 'views', 'chatList.pug'), { login, items: list })
    );
})
homeRouter.get('/home', (req, res) => {
    res.redirect('/'); 
})
homeRouter .post('/', (req, res) => {
    res.render('signup', {})
});
module.exports = homeRouter;