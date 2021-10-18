const CoreController = require('./controller.core');
const MD5 = require('md5');

module.exports = class UserController extends CoreController {

	constructor() {
        super('user');
    }

    async login (params) {
        this._checkParams(params, ['loginName', 'password']);

        const { loginName, password } = params;

        const user = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM User WHERE loginName=?`,
            values: [ loginName ]
        });
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
        this._checkParams(params, ['loginName', 'password']);

        const { id, loginName, password } = params;

        if (!id) {
            await DBhelper.queryMysql(MYSQL, {
                sql: `INSERT INTO User(loginName, password)
                    VALUES(?, ?)`,
                values: [ loginName, MD5(password) ]
            });
        } else {
            await DBhelper.queryMysql(MYSQL, {
               sql: `UPDATE password=? WHERE id=? `,
               values: [ MD5(password), id ]
            });
        }

        return true;
    }

}