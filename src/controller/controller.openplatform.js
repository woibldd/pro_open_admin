
const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');

module.exports = class openPlatformController extends CoreController {

	constructor() {
        super('openPlatform');
    }

    async list (params) {
        this._checkParams(params, ['sessionId', 'pageNum', 'pageSize']);
        const { pageNum, pageSize } = params;

        const offset = (pageNum - 1) * pageSize;

        const totalCount = await DBhelper.queryMysql(MYSQL_OPEN, `SELECT count(*) as count FROM OpenPlatform`);
        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM OpenPlatform ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageSize)]
        });

        return {
            total: totalCount[0].count,
            list: result
        }
    }

}