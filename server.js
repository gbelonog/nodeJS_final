const express = require('express');
const config = require('config');
const path = require('path');
const { appRouter, apiRouter } = require('./src');
const bodyParser = require('body-parser');
const app = express(); 
const { port } = config.get('server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src',  'views'));
app.use('/assets',  express.static(path.join('public', 'assets')))
app.use('/api', apiRouter);
app.use('/', appRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 