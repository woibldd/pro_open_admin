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

    /**
     * 审核同步到ms_coin
     * 1. search_key ${userId-chain-contract}，多个地址可上传相同的token
     * 2. pro_admin和pro_open_admin修改coin、token，互相同步
     * 3. 第一次审核通过新增token表后同步到coin表
     * 4. 第二次审核通过修改token表和coin表
     * 5. coin表添加字段标识token为开放平台审核通过的token
     * 6. 审核通过时判断coin表search_key唯一性
     * 7. coin表添加平台用户字段
     * 8. token表coin_id对应coin表id
     * @param {} params 
     * @returns 
     */
    async verify (params) {
        this._checkParams(params, ['sessionId', 'id', 'status']);
        const { id, status, remark, sessionId } = params;

        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token WHERE id = ?`,
            values: [parseInt(id)]
        });
        if (!result || result.length === 0) throw new Error('Token not found');
        const token = result[0];
        if (token.status === this.tokenStatus.LISTED) throw new Error('Token is already listed');
        
        let failRemark = '';
        if (status === this.tokenStatus.FAILED) {
            failRemark = `, 拒绝原因为:${remark}`;
        }
        this.operationService.insertOperation(sessionId, `审核Token[${id}]状态为${this.tokenStatus.getKey(status)}${failRemark}`);

        if (status !== this.tokenStatus.LISTED) {
            await DBhelper.queryMysql(MYSQL_OPEN, {
                sql: `UPDATE Token SET status=?, remark=? WHERE id=? `,
                values: [ status, remark || '', id ]
            });
            return true;
        }
        
        // 审核通过
        // 判断线上是否存在
        const body = {
            start: 0,
            limit: 1,
            chain: token.chain,
            contract: token.contract
        };
        const coins = await NetHelper.post({
            url: `${CONFIG.host_coin}/admin/coinList`,
            json: true,
            body
        }).catch((err) => {
            return err;
        });
        
        let coin = null;
        // token是否已经上线
        if (coins && coins.list && coins.list.length > 0) {
            coin = coins.list[0];
            if (coin.owner_eth_address !== token.owner_eth_address) throw new Error('线上已存在该Token, 请重新确认');
        }

        // 同步上线
        const data = Object.assign(token, {
            decimals: token.decimals || 18,
            priceFrom: token.price_from || 'auto',
            price: token.price || 0,
            browserAccount: token.browser_account || '',
            browserTx: token.browser_tx || '',
            browserQuote: token.browser_quote || '',
            version: token.version || 0,
            sort: token.sort || 0,
            status: 1,                                       // ms_coin状态，上线
        });
        delete data.id;

        // 线上存在该coin且归属于当前开放平台用户，则更新；否则，新增
        if (coin) data.id = coin.id;
        const updatedCoins = await NetHelper.post({
            url: `${CONFIG.host_coin}/admin/openSyncCoin`,
            json: true,
            body: data
        }).catch((err) => {
            return err;
        });

        // coin新增后更新coin_id
        if (updatedCoins && updatedCoins.length > 0 && !token.coin_id) {
            const updatedCoin = updatedCoins[0];

            await DBhelper.queryMysql(MYSQL_OPEN, {
                sql: `UPDATE Token SET coin_id=?, status, remark WHERE id=?`,
                values: [ updatedCoin.id, status, reamrk || '', id ]
            })
        } else {
            // coin更新后
            await DBhelper.queryMysql(MYSQL_OPEN, {
                sql: `UPDATE Token SET status=?, remark=? WHERE id=? `,
                values: [ status, remark || '', id ]
            });
        }
        
        return true;
    }
}