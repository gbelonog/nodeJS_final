const { appendFile, createWriteStream } = require('fs');

const date = new Date().toUTCString();

function writeToLog(...args) {
    const logMessage = '\n' + date + '[ ' + args[0] + ' ] ' + (args[1] || '');
    let writer = createWriteStream('./events.log', { encoding: 'utf8', flags: 'a+' });
    writer.write(logMessage);
}

module.exports = { writeToLog };