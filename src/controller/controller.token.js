const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');
const NetHelper = require('../tool/nethelper');
const TokenStatus = require('../enum/tokenStatus');
const OperationService = require('../service/service.operation');

module.exports = class TokenController extends CoreController {

	constructor() {
        super('token');
        this.tokenStatus = new TokenStatus();
        this.operationService = new OperationService();
    }

    async list (params) {
        this._checkParams(params, ['pageNum', 'pageSize']);
        const { pageNum, pageSize, status } = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1 `;
        if (status) {
            where += ` AND status=${status} `;
        }

        const totalCount = await DBhelper.queryMysql(MYSQL_OPEN, `SELECT count(*) as count FROM Token ${where}`);
        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token ${where} ORDER BY create_time DESC LIMIT ?,?`,
            values: [parseInt(offset), parseInt(pageSize)]
        });

        return {
            total: totalCount[0].count,
            list: result
        };
    }

    async detail (params) {
        this._checkParams(params, ['id']);
        const { id } = params;

        return await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token WHERE id = ?`,
            values: [parseInt(id)]
        });
    }

    async verify (params) {
        this._checkParams(params, ['sessionId', 'id', 'status']);
        const { id, status, remark, sessionId } = params;

        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token WHERE id = ?`,
            values: [parseInt(id)]
        });
        if (!result || result.length == 0) throw new Error('Token not found');
        const token = result[0];
        if (token.status == this.tokenStatus.LISTED) throw new Error('Token is already listed');
        
        await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `UPDATE Token set status=?, remark=? WHERE id=? `,
            values: [ status, remark || '', id ]
        });
            
        this.operationService.insertOperation(sessionId, `审核Token[${id}]状态为${this.tokenStatus.getKey(status)}`);

        if (status !== this.tokenStatus.LISTED) return true;

        // 同步上线
        const data = Object.assign(token, {
            decimals: token.decimals || 18,
            priceFrom: token.price_from || 'auto',
            price: token.price || 0,
            browserAccount: token.browserAccount || '',
            browserTx: token.browserTx || '',
            browserQuote: token.browserQuote || '',
            version: token.version || 0,
            sort: token.sort || 0,
            status: 1,                                       // ms_coin状态，上线
        });

        return await NetHelper.post({
            "url": `${CONFIG.host_coin}/admin/coinUpdate`,
            "json": true,
            "body": Object.assign(token, data)
        });
    }

}