const express = require('express');
const config = require('config');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const { itemData } = require('./services');
const fs = require('fs');
const pug = require('pug');
const { appRouter } = require('./src');
const app = express(); 

const { port } = config.get('server');
 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src',  'views'));



//app.use(cookieParser());
app.use('/assets',  express.static(path.join('public', 'assets')))

// app.get('/', async(req, res) => {
//     //res.cookie('login', true, { httpOnly: true });
//     let { login } = req.cookies;
//     console.log('login', login);
//     //login = false;
//     // let chatList = '';
//     // let indexReader = fs.createReadStream(path.join(__dirname, 'views', 'chatList.pug'), { encoding: 'utf8' });
//     // indexReader.on('data', (data) => {
//     //     chatList += data;
//     // });
//   //  indexReader.on('end', async () => {
//         let items = await itemData.getItem();
//         const list = items.map(e => e.login);
//        // chatList = chatList.replace('list', list);
//         //res.send(template);
//         //res.render('chatList', { chatList });
//         console.log('items', items);
//        // console.log('list', list);
//         res.send(
//             pug.renderFile(path.join(__dirname, 'src', 'views', 'chatList.pug'), { login, items: list })
//         );
//   //  });

// })

// app.get('/chats', (req, res) => {
//     res.redirect('/'); 
// })
// app.get('/conversation', (req, res) => {
//     const { login } = req.cookies;
//     console.log(req.cookies);
//     res.render('conversation', { login });
// })
// app.get('/login', (req, res) => {
//     res.cookie('login', true, { httpOnly: true });
//     res.render('login');
// })
// app.get('/logout', (req, res) => {
//     res.cookie('login', false, { httpOnly: true });
//     //const { login } = req.cookies;
//     res.redirect('/'); 
// })
// app.get('/signup', (req, res) => {
//     res.render('signup');
// })

// app.post('/login', (req, res) => {
//     console.log('POST /login');
//     let body = '';
//     req.on('data', data => {
//         body += data;
//     })

//     req.on('end', async () => {
//         const splitedBody = body.split('&');
//         const login = splitedBody[0].replace('login=', '');
//         const password = splitedBody[1].replace('password=', '');
//         await itemData.setItem({
//             login: login,
//             password: password
//         })
//         res.cookie('login', true, { httpOnly: true });
//         res.redirect('/');
//     })
// });
app.use('/', appRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 