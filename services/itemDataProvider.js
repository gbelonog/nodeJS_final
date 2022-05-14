const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

class ItemDataProvider {
    constructor() {
        this.cash = null;
        this.dataFile = path.join(__dirname, '..', './chatList.json');
    };

    async getItem() {
        logger.info('getItem');
        if (this.cash) {
            return this.cash;
        };
        try {
            fs.accessSync(this.dataFile);
        } catch {
            this.cash = [];
            return this.cash;
        }

        let reader = fs.createReadStream(this.dataFile, { encoding: 'utf8' });
        const data = await new Promise((res, rej) => {
            let result = '';
            reader.on('data', data => {
                result += data;
            });
            reader.on('end', () => { res(result) });
            reader.on('error', rej);
        });
        this.cash = JSON.parse(data);
        return this.cash;
    };

    async setItem(item) {
        logger.info('set item');
        if (!this.cash) {
            this.cash = await this.getItem();
        }
        console.log('item in setItem', item);
        this.cash.push(item);
        const file = fs.createWriteStream(this.dataFile, { encoding: 'utf8', flag: 'a+' });
        file.end(JSON.stringify(this.cash));
        return this.cash;
    };
}

const itemData = new ItemDataProvider();
module.exports = itemData;