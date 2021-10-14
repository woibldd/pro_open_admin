const NetHelper = require('./nethelper');

module.exports = class Helper {
    constructor() {}

    static async offlineMarket(data) {
        return await NetHelper.post({
            'url': `${CONFIG.host_market}/quote/offlineMarket`,
            'json': true,
            'body': data
        });
    }

    static async checkMarketCoin(data) {
        return await NetHelper.post({
            'url': `${CONFIG.host_market}/quote/checkMarketCoin`,
            'json': true,
            'body': data
        });
    }

}
