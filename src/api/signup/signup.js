const { Router } = require('express');
const signUpRouter = new Router();
const { signupValidation } = require('../../validation');
const cookieParser = require('cookie-parser');
const { itemData } = require('../../../services');

signUpRouter.use(cookieParser());
signUpRouter.get('/signup', (req, res) => {
    res.render('signup', { error: ''})
});
signUpRouter.post('/signup', signupValidation.appValidator, async(req, res) => {
    const { error } = req.validation || '';
    if(!!req.validation.error) {
        res.render('signup', { error });
    } else {
         await itemData.setItem({
            login: req.body.userName,
            password: req.body.password
        })
        res.cookie('login', true, { httpOnly: true });
        res.redirect('/');
    }
});
module.exports = signUpRouter;