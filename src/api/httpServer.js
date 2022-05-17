const fs = require('fs');
const http = require('http');
const { writeToLog } = require('./utils/loggerToFile');

const PORT = 66;
const server = http.createServer();

server.on('request', (req, res) => {
    console.log('[Request] URL: ', req.url);
    writeToLog('[Request] URL: ', req.url);
    if(req.url == '/'){
        fs.createReadStream('./index.html').pipe(res);
        writeToLog(`Read ./index.html`);
    } else if (req.url == '/favicon.ico'){
        fs.createReadStream('./favicon.ico').pipe(res);
        writeToLog(`Read ./favicon.ico`);
    } else {
        writeToLog(`End`);
        res.end();
    }
});
server.listen(PORT, () => {
    console.log(`Server is serving on http://localhost:${PORT}`);
    writeToLog(`Server is serving on http://localhost:${PORT}`);
});