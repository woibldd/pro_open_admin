
const CoreController = require('./controller.core');

module.exports = class StatusController extends CoreController {

	constructor() {
        super('status');
    }

    async ping(params){
        return "pong";
    }

    async serviceStatus() {
        // return await DBhelper.hgetAllRedis(REDIS, CONFIG.KEY_STATUS);
        return await {};
    }

}