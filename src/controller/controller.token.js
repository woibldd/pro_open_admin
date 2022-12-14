const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');
const NetHelper = require('../tool/nethelper');
const LanguageHelper = require('../tool/langhelper');
const Coinhelper = require('../tool/coinhelper');
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
        const { pageNum, pageSize, status, search_key, sort, sortby } = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1`;
        if(search_key){
            where += ` AND chain like  '%${search_key}%' OR name like '%${search_key}%' OR coin like '%${search_key}%' OR contract like '%${search_key}%' `;
        }
        if (status) {
            where += ` AND status=${status} `;
        }
        let orderby = `ORDER BY ${sort} ${sortby}`
       

     
       

        const totalCount = await DBhelper.queryMysql(MYSQL_OPEN, `SELECT count(*) as count FROM Token ${where}`);
        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token ${where} ${orderby} LIMIT ?,?`,
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

        const tokens = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token WHERE id = ?`,
            values: [parseInt(id)]
        });
        const token = tokens && tokens[0];
        if (!token) throw new Error('Token not found');
        delete token.owner_eth_address;
        delete token.search_key;

        // token.multiLanguageList = await LanguageHelper.batchGet('Token', [ { id } ]);
        return token;
    } 

    async getMultiLanguageList(params) {
        const { id } = params; 
        return await LanguageHelper.batchGet('Token', [ { id } ]);
    }

    async getChainList() {
        return await Coinhelper.getChainlist()
    }

    /**
     * ???????????????ms_coin
     * 1. search_key ${userId-chain-contract}?????????????????????????????????token
     * 2. pro_admin???pro_open_admin??????coin???token???????????????
     * 3. ???????????????????????????token???????????????coin???
     * 4. ???????????????????????????token??????coin???
     * 5. coin?????????????????????token??????????????????????????????token
     * 6. ?????????????????????coin???search_key?????????
     * 7. coin???????????????????????????
     * 8. token???coin_id??????coin???id
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
            failRemark = `, ???????????????:${remark}`;
        }
        this.operationService.insertOperation(sessionId, `??????Token[${id}]?????????${this.tokenStatus.getKey(status)}${failRemark}`, 'token');

        if (status !== this.tokenStatus.LISTED) {
            await DBhelper.queryMysql(MYSQL_OPEN, {
                sql: `UPDATE Token SET status=?, remark=? WHERE id=? `,
                values: [ status, remark || '', id ]
            });
            return true;
        } 
        
        // ????????????
        // ????????????????????????
        const body = {
            start: 0,
            limit: 1,
            chain: token.chain,
            contracts: [token.contract]
        };

        //"host_coin": "http://ms.coin:8876",
        const coins = await NetHelper.post({
            url: `${CONFIG.host_coin}/admin/coinList`,
            json: true,
            body
        });
        
        let coin = null;
        // token??????????????????
        if (coins && coins.list && coins.list.length > 0) {
            coin = coins.list[0];
            if (coin.owner_eth_address !== token.owner_eth_address || id !== coin.open_id) 
            throw new Error('??????????????????Token, ???????????????');
            // throw new Error(`coin.address:${coin.owner_eth_address}, coin.id:${coin.open_id}, token.address:${token.owner_eth_address}, token:id${id}??? ${coins.list.length}`);
            // throw new Error(JSON.stringify(result))
        }


        let multiLanguageListnew = await LanguageHelper.batchGet('Token', [ { id } ]);
        multiLanguageListnew = multiLanguageListnew.map(_ => {
                const data = _.data;
                data.browserAccount = '';
                data.browserTx = '';
                data.browserQuote = ''; 
                _.data = data;
                return _;
            })
        // throw new Error('Token not multiLanguageListnew');

        // ????????????
        const data = Object.assign(token, {
            decimals: token.decimals || 18,
            priceFrom: token.price_from || 'auto',
            price: token.price || 0,
            browserAccount: token.browser_account || '',
            browserTx: token.browser_tx || '',
            browserQuote: token.browser_quote || '',
            version: token.version || 0,
            sort: token.sort || 0,
            issue_data: token.issue_date || '',
            email:  token.email || '',
            community_info: token.community_info ||  '',
            recommender: token.recommender ||  '',
            langList: multiLanguageListnew || [],
            open_id: id,
            status: 0,                                       // ms_coin???????????????
        });
        delete data.id;


        // ???????????????coin??????????????????????????????????????????????????????????????????
        if (coin) data.id = coin.id;
        const updatedCoins = await NetHelper.post({
            url: `${CONFIG.host_coin}/admin/openSyncCoin`,
            json: true,
            body: data
        }); 

        let updatedCoin = null;
        if (updatedCoins && updatedCoins.length > 0) {
            updatedCoin = updatedCoins[0];
            
            if (!token.coin_id) {
                // coin???????????????coin_id
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE Token SET coin_id=?, status=?, remark=?, is_online=? WHERE id=?`,
                    values: [ updatedCoin.id, status, remark || '', updatedCoin.status || 0, id ]
                });
            } else {
                // coin?????????
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE Token SET status=?, remark=?, is_online=? WHERE id=? `,
                    values: [ status, remark || '', updatedCoin.status || 0, id ]
                }); 
            }
        }

        // // ???????????????
        // const multiLanguageList = await LanguageHelper.batchGet('Token', [ { id } ]);
        // if (!multiLanguageList || multiLanguageList.length == 0) return true;

        // await LanguageHelper.batchSet('coin', 'Coins', multiLanguageList.map(_ => {
        //     const data = _.data;
        //     data.browserAccount = data.browser_account;
        //     data.browserTx = data.browser_tx;
        //     data.browserQuote = data.browser_quote;
        //     delete data.browser_account;
        //     delete data.browser_tx;
        //     delete data.browser_quote;
        //     _.data = data;
        //     return _;
        // })); 
        
        return true;
    }
    // symbol', 'currency', 'chain', 'contract'
    async getPrice(params){
        return await Coinhelper.getPrice(params);
    }
    async update (params) {
        this._checkParams(params, [ "id", 'sessionId']);

        const { multiLanguageList,  id } = params;
        const tokens = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM Token WHERE id = ?`,
            values: [parseInt(id)]
        });
        const tokenData = tokens && tokens[0];
        if (!tokenData) throw new Error('Token not found');
        //?????????????????????
        ['owner_eth_address',  'search_key', 'id',  'status',  'contract', 'chain', 'create_time', 'update_time' ].forEach(key=>delete tokenData[key])
       

        let languageENData = null
        if(multiLanguageList && Array.isArray(multiLanguageList)){
            languageENData = multiLanguageList.find(({lang})=>lang === 'en')
            if(!languageENData)  throw new Error('Lost multiLanguage param lang');
                Object.assign(tokenData, {
                    name : languageENData.name ||'',
                    browser_account : languageENData.browser_account || '',
                    browser_tx : languageENData.browser_tx || '',
                    browser_quote : languageENData.browser_quote || '',
                    about : languageENData.about || '',
                    whitepaper : languageENData.whitepaper || '',
                    tools : JSON.stringify(languageData.tools || [])
                })
        }
        Object.keys(tokenData).forEach(key=>{
            if(params[key]!=undefined) tokenData[key] = params[key]
           
        })
        const setSqlK=`UPDATE Token SET  ${Object.keys(tokenData).map(v=>`${v}=?`).join(",")} where id=${id}`
        const setSqlV  =  Object.keys(tokenData).map(k => tokenData[k])
     
        const insertR = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: setSqlK,
            values:setSqlV
        });
    
        if(languageENData){
            await LanguageHelper.batchSet('Token', multiLanguageList.map(_ => {
                _.id = id;
                return _;
            })).catch(err => {
                return err;
            });
        }
        return insertR;
    }

    
}