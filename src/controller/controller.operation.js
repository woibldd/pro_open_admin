const CoreController = require('./controller.core');

module.exports = class OperationController extends CoreController {

	constructor() {
        super('operation');
    }

    async list (params) {
        this._checkParams(params, ['sessionId', 'pageNum', 'pageSize']);
        const { sessionId, pageNum, pageSize } = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1 AND owner_eth_address=${sessionId} `;

        const totalCount = await DBhelper.queryMysql(MYSQL, `SELECT count(*) as count FROM Operation ${where}`);
        const result = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM Operation ${where} ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageNum)]
        });

        return {
            total: totalCount[0].count,
            list: result
        }
    }
   
}