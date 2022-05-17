const express = require('express');
const config = require('config');
const path = require('path');
const { appRouter } = require('./src');
const app = express(); 
const { port } = config.get('server');
const BodyParser = require('body-parser');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src',  'views'));
app.use('/assets',  express.static(path.join('public', 'assets')))
app.use('/', appRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 