
const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');

module.exports = class TokenController extends CoreController {

	constructor() {
        super('token');
    }

    async list (params) {
        this._checkParams(params, ['pageNum', 'pageSize']);
        const { pageNum, pageSize, status } = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1 `;
        if (status) {
            where += ` AND status=${status} `;
        }

        const totalCount = await DBhelper.queryMysql(MYSQL, `SELECT count(*) as count FROM Token ${where}`);
        const result = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM Token ${where} ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageNum)]
        });

        return {
            total: totalCount[0].count,
            list: result
        };
    }

    async detail (params) {
        this._checkParams(params, ['id']);
        const { id } = params;

        return await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM Token WHERE id = ? AND owner_eth_address = ?`,
            values: [parseInt(id)]
        });
    }

}