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
            throw new Error('用户不存在');
        }
        
        const user = users[0];
        if (!user || !user.password || user.password !== MD5(password)) {
            throw new Error('密码错误');
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

    async list (params) {
        this._checkParams(params, ['sessionId', 'pageNum', 'pageSize']);
        const { pageNum, pageSize } = params;

        const offset = (pageNum - 1) * pageSize;

        const totalCount = await DBhelper.queryMysql(MYSQL, `SELECT count(*) as count FROM User`);
        const result = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM User ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageSize)]
        });

        return {
            total: totalCount[0].count,
            list: result.map(_ => {
                delete _.password;
                return _;
            })
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