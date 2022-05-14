const { readdir, readFile } = require('fs/promises');
const path = require('path');
const { info, error } = require('./logger');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { writeToLog } = require('./loggerToFile');
let filesInDir = [];
let data = '';

async function seek(target = '', dirPath = '', verbose = false) {
    try {
        filesInDir = await readdir(dirPath);
        info('filesInDir', filesInDir);
    } catch (err) {
        error(err);
    }

    if (filesInDir) {
        info(`files: ${filesInDir} are in folder ${dirPath}`);
        if (filesInDir.indexOf(target) !== -1) {
            try {
                eventEmitter.emit('success', target, dirPath);
                const data = await readFile(path.join(dirPath, target), 'utf8');
                if (verbose) writeToLog('success', data);
            } catch (err) {
                error(err);
            }
        } else {
            eventEmitter.emit('fail', target, dirPath);
            if (verbose) writeToLog('fail');
        }
    }
}

module.exports = { seek, eventEmitter };

