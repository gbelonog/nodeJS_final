const { Router } = require('express');
const homeRouter = new Router();
const { itemData } = require('../../../services');
const pug = require('pug');
const path = require('path');
const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();
//homeRouter.use();
// homeRouter.get('/', (req, res) => {
//     res.render('signup', {})
// });
homeRouter.use(cookieParser());
homeRouter.get('/', async(req, res) => {
    //res.cookie('login', true, { httpOnly: true });
    
    let { login } = req.cookies;
    console.log('login', login);
    //login = false;
    // let chatList = '';
    // let indexReader = fs.createReadStream(path.join(__dirname, 'views', 'chatList.pug'), { encoding: 'utf8' });
    // indexReader.on('data', (data) => {
    //     chatList += data;
    // });
  //  indexReader.on('end', async () => {
        let items = await itemData.getItem();
        const list = items.map(e => e.login);
       // chatList = chatList.replace('list', list);
        //res.send(template);
        //res.render('chatList', { chatList });
        console.log('items', items);
       // console.log('list', list);
        res.send(
            pug.renderFile(path.join(__dirname, '..', '..', '..', 'src', 'views', 'chatList.pug'), { login, items: list })
        );
  //  });

})
homeRouter.get('/home', (req, res) => {
    res.redirect('/'); 
})

homeRouter .post('/', (req, res) => {

    
    res.render('signup', {})
});

module.exports = homeRouter;