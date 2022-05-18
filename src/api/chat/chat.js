const { Router } = require('express');
const chatRouter = new Router();

chatRouter.get('/chat', (req, res) => {
    res.render('chat', {});
})
module.exports = chatRouter;