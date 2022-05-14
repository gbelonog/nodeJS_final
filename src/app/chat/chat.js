const { Router } = require('express');
const chatRouter = new Router();

chatRouter.get('/chat', (req, res) => {
    //const { login } = req.cookies;
    //console.log(req.cookies);
    res.render('chat', {});
})
module.exports = chatRouter;