const NetHelper = require('./nethelper');
const DBhelper = require('./dbhelper');
module.exports = class Helper {
    constructor() {}

    static async noStorage(){
        return await DBhelper.getRedis(REDIS,CONFIG.KEY_DATA_COIN);
    }

    static async list(data) {
        return await NetHelper.post({
            "url": `${CONFIG.host_coin}/admin/coinList`,
            "json": true,
            "body": data
        });
    }

    static async coinDetail(data) {
        return await NetHelper.get({
            "url": `${CONFIG.host_coin}/admin/coinDetail`,
            "json": true,
            "body": data
        });
    }

    static async getChainlist(data) {
        return await NetHelper.get({
            "url": `${CONFIG.host_chain}/admin/getChains`,
            "json": true
        });
    }

    static async getExchanges(data) {
        return await NetHelper.get({
            "url": `${CONFIG.host_price}/admin/getExchanges`,
            "json": true
        });
    }

    static async update(data) {
        return await NetHelper.post({
            "url": `${CONFIG.host_coin}/admin/coinUpdate`,
            "json": true,
            "body": data
        });
    }

    static async getOptions(key) {
        return await NetHelper.get({
            'url': `${CONFIG.host_coin}/admin/getOptions`,
            'json': true,
            'body': {
                'key': key || '',
            }
        })
    }

    static async getPrice(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_coin}/admin/coinPrice`,
            'json': true,
            'body': data
        })
    }

    // 标签相关
    static async tagList(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/tagList`,
            'json': true,
            'body': data
        })
    }

    static async updateTag(data) {
        return await NetHelper.post({
            "url": `${CONFIG.host_market}/admin/updateTag`,
            "json": true,
            "body": data
        });
    }

    static async tagDetail(data) {
        return await NetHelper.post({
            "url": `${CONFIG.host_market}/admin/tagDetail`,
            "json": true,
            "body": data
        });
    }

    // 行情货币相关
    static async marketList(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/marketList`,
            'json': true,
            'body': data
        })
    }
    
    static async updateMarket(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/updateMarket`,
            'json': true,
            'body': data
        })
    }

    static async marketDetail(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/marketDetail`,
            'json': true,
            'body': data
        })
    } 

    static async hotSearchList(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/hotSearchList`,
            'json': true,
            'body': data
        })
    }

    static async updateHotSearch(data) {
        return await NetHelper.get({
            'url': `${CONFIG.host_market}/admin/updateHotSearch`,
            'json': true,
            'body': data
        })
    }
}