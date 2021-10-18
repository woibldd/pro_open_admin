const DBhelper = require('../tool/dbhelper');

const CoreController = require('./controller.core');

module.exports = class OperationController extends CoreController {

	constructor() {
        super('operation');
    }

    async list (params) {
        this._checkParams(params, ['sessionId', 'pageNum', 'pageSize']);
        const { pageNum, pageSize } = params;

        const offset = (pageNum - 1) * pageSize;

        const totalCount = await DBhelper.queryMysql(MYSQL, `SELECT count(*) as count FROM Operation`);
        const result = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM Operation ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageNum)]
        });

        return {
            total: totalCount[0].count,
            list: result
        }
    }
   
}