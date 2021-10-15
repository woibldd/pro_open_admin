const CoreController = require('./controller.core');

module.exports = class UserController extends CoreController {

	constructor() {
        super('user');
    }

    async login (params) {
        this._checkParams(params, ['loginName', 'password']);

        
    }

}