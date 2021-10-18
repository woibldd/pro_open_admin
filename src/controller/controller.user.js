const MD5 = require('md5');
const jwt = require('jsonwebtoken');

const OperationService = require('../service/service.operation');
const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');

module.exports = class UserController extends CoreController {

	constructor() {
        super('user');
        this.operationService = new OperationService();
    }

    async login (params) {
        this._checkParams(params, ['loginName', 'password']);

        const { loginName, password } = params;

        const users = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM User WHERE loginName=? `,
            values: [ loginName ]
        });
        if (!users || users.length === 0) {
            throw new Error('用户名或密码错误');
        }
        
        const user = users[0];
        if (!user || !user.password || user.password !== MD5(password)) {
            throw new Error('用户名或密码错误');
        }
        
        const jwtToken = jwt.sign({
            userId: user.id
        }, 'aejael', {
            expiresIn: '10h'
        });
        return {
           jwtToken 
        }
    }
   
    async update (params) {
        this._checkParams(params, ['sessionId', 'loginName', 'password']);

        const { id, sessionId, loginName, password } = params;

        if (!id) {
            await DBhelper.queryMysql(MYSQL, {
                sql: `INSERT INTO User(loginName, password)
                    VALUES(?, ?)`,
                values: [ loginName, MD5(password) ]
            });

            await this.operationService.insertOperation(sessionId, `添加新用户[${loginName}]`);
        } else {
            await DBhelper.queryMysql(MYSQL, {
               sql: `UPDATE User set password=? WHERE id=? `,
               values: [ MD5(password), id ]
            });
            await this.operationService.insertOperation(sessionId, `更新用户[${loginName}]密码`);
        }

        return true;
    }

}