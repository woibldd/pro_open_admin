const NetHelper = require('./nethelper');

module.exports = class Helper {
    constructor() {}

    static async detail(data) {
        return await NetHelper.post({
            'url': `${CONFIG.host_price}/quote/price`,
            'json': true,
            'body': data
        });
    }

}