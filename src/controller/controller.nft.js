const moment = require('moment');

const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');
const NetHelper = require('../tool/nethelper');
const LanguageHelper = require('../tool/langhelper');
const TokenStatus = require('../enum/tokenStatus');
const OperationService = require('../service/service.operation');

module.exports = class NFTController extends CoreController {

	constructor() {
        super('nft');
        this.tokenStatus = new TokenStatus();
        this.operationService = new OperationService();
    }

    async list (params) {
        this._checkParams(params, ['pageNum', 'pageSize']);
        const { pageNum, pageSize, status, search_key} = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1 `;
        if (status) {
            where += ` AND status=${status} `;
        }
        if(search_key){
            where += ` AND search_key like  '%${search_key}%' OR title like '%${search_key}%'`;
        }

        const totalCount = await DBhelper.queryMysql(MYSQL_OPEN, `SELECT count(*) as count FROM NFT ${where}`);
        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM NFT ${where} ORDER BY create_time DESC LIMIT ?,?`,
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

        const nfts = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM NFT WHERE id = ?`,
            values: [parseInt(id)]
        });
        const nft = nfts && nfts[0];
        if (!nft) throw new Error('NFT not found');
        delete nft.owner_eth_address;
        delete nft.search_key;

        // nft.multiLanguageList = await LanguageHelper.batchGet('NFT', [ { id } ]);
        return nft;
    }

    async verify (params) {

        this._checkParams(params, ['sessionId', 'id', 'status']);
        const { id, status, remark, sessionId } = params;

        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM NFT WHERE id = ?`,
            values: [parseInt(id)]
        });
        if (!result || result.length === 0) throw new Error('NFT not found');
        const nft = result[0];
        if (nft.status === this.tokenStatus.LISTED) throw new Error('NFT is already listed');
        
        let failRemark = '';
        if (status === this.tokenStatus.FAILED) {
            failRemark = `, ???????????????:${remark}`;
        }
        this.operationService.insertOperation(sessionId, `??????NFT[${id}]?????????${this.tokenStatus.getKey(status)}${failRemark}`, 'nft');

        if (status !== this.tokenStatus.LISTED) {
            await DBhelper.queryMysql(MYSQL_OPEN, {
                sql: `UPDATE NFT SET status=?, remark=? WHERE id=? `,
                values: [ status, remark || '', id ]
            });
            return true;
        }
        
        // ????????????
        // ????????????????????????
        const body = {
            start: 0,
            limit: 1,
            chain: nft.chain,
            contract: nft.contract
        };
        const collections = await NetHelper.post({
            url: `${CONFIG.host_nft}/admin/collectionList`,
            json: true,
            body
        });
        
        let collection = null;
        // nft collection??????????????????
        if (collections && collections.list && collections.list.length > 0) {
            collection = collections.list[0];
            if (collection.owner_eth_address !== nft.owner_eth_address || id !== collection.open_id) throw new Error('??????????????????NFT, ???????????????');
        }

        // ????????????
        const data = Object.assign(nft, {
            sort: nft.sort || 0,
            status: 1,                                       // ms_nft???????????????
            open_id: id,
            birthday_time: moment(nft.birthday_time).format('YYYY:MM:DD HH:mm:ss') || moment().format('YYYY:MM:DD HH:mm:ss')
        });
        delete data.id;

        // ???????????????nft collection??????????????????????????????????????????????????????????????????
        if (collection) {
            data.id = collection.id;
        } else {
            data.channel = nft.channel || 1;
            data.sort = nft.sort || 1;
        }
        const updatedNfts = await NetHelper.post({
            url: `${CONFIG.host_nft}/admin/openSyncCollection`,
            json: true,
            body: data
        });

        let updatedNft = null;
        if (updatedNfts && updatedNfts.length > 0) {
            updatedNft = updatedNfts[0];
            
            if (!nft.coin_id) {
                // collection???????????????collection_id
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE NFT SET collection_id=?, status=?, remark=?, is_online=? WHERE id=?`,
                    values: [ updatedNft.id, status, remark || '', updatedNft.status, id ]
                })
            } else {
                // collection?????????
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE NFT SET status=?, remark=?, is_online WHERE id=? `,
                    values: [ status, remark || '', updatedNft.status, id ]
                });
            }
        }

        // ???????????????
        const multiLanguageList = await LanguageHelper.batchGet('NFT', [ { id } ]);
        if (!multiLanguageList || multiLanguageList.length == 0) return true;

        await LanguageHelper.batchSet('nft', 'NFT', multiLanguageList);
        return true;
    }
}