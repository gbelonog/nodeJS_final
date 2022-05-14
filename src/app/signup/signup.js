const { Router } = require('express');
const signUpRouter = new Router();
const { signupValidation } = require('../../validation');
const cookieParser = require('cookie-parser');
const { itemData } = require('../../../services');

signUpRouter.use(cookieParser());

signUpRouter.get('/signup', (req, res) => {
    res.render('signup', { error: ''})
});

signUpRouter.post('/signup', signupValidation.appValidator, (req, res) => {
    console.log('POST /signup');
    console.log('req.validation',req.validation);
    const { error } = req.validation || '';
    if(req.validation.error) {
        console.log('error', error);
        res.render('signup', { error });
    } else {
        console.log('signup');
        let body = '';
        req.on('data', data => {
            body += data;
        })
    
        req.on('end', async () => {
            const splitedBody = body.split('&');
            const userName = splitedBody[0].replace('userName=', '');
            const password = splitedBody[1].replace('password=', '');
            await itemData.setItem({
                login: userName,
                password: password
            })
            res.cookie('login', true, { httpOnly: true });
            res.redirect('/');
        })
    }
});

module.exports = signUpRouter;