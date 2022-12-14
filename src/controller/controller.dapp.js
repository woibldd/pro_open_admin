const CoreController = require('./controller.core');
const DBhelper = require('../tool/dbhelper');
const NetHelper = require('../tool/nethelper');
const LanguageHelper = require('../tool/langhelper');
const Coinhelper = require('../tool/coinhelper');
const TokenStatus = require('../enum/tokenStatus');
const OperationService = require('../service/service.operation');

module.exports = class TokenController extends CoreController {

	constructor() {
        super('dapp');
        this.tokenStatus = new TokenStatus();
        this.operationService = new OperationService();
    }

    async list (params) {
        this._checkParams(params, ['pageNum', 'pageSize']);
        const { pageNum, pageSize, status, search_key, sort, sortby } = params;

        const offset = (pageNum - 1) * pageSize;
        let where = `WHERE 1=1`;
        if(search_key){
            where += ` AND chains like  '%${search_key}%' OR name like '%${search_key}%'`;
        }
        if (status) {
            where += ` AND status=${status} `;
        } 
        let orderby = `ORDER BY ${sort} ${sortby}`
        


        const totalCount = await DBhelper.queryMysql(MYSQL_OPEN, `SELECT count(*) as count FROM DApp ${where}`);
        const result = await DBhelper.queryMysql(MYSQL_OPEN, {
            // sql: `SELECT * FROM DApp ${where} ORDER BY create_time DESC LIMIT ?,?`,
            sql: `SELECT * FROM DApp ${where} ${orderby} LIMIT ?,?`,
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
            sql: `SELECT * FROM DApp WHERE id = ?`,
            values: [parseInt(id)]
        });
        const token = tokens && tokens[0];
        if (!token) throw new Error('Token not found');
        delete token.owner_eth_address;
        delete token.search_key;

        // token.multiLanguageList = await LanguageHelper.batchGet('Token', [ { id } ]);
        return token;
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
            sql: `SELECT * FROM DApp WHERE id = ?`,
            values: [parseInt(id)]
        });
        // throw new Error(JSON.stringify(result));

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
                sql: `UPDATE DApp SET status=?, remark=? WHERE id=? `,
                values: [ status, remark || '', id ]
            });
            // const rrrr =await DBhelper.queryMysql(MYSQL_OPEN, {
            //     sql: `select * from  DApp WHERE id=? `,
            //     values: [  id ]
            // });
            // throw new Error(JSON.stringify(rrrr));
            return true;  
        } 
 
         
        // ????????????
        // ????????????????????????
        const body = {
            start: 0,
            limit: 1,
            chain: token.chain,
            name: token.name
        };
        const coins = await NetHelper.post({
            url: `${CONFIG.host_dapp}/admin/dappList`,
            json: true,
            body
        });

        // throw new Error(JSON.stringify(coins));
        
        let coin = null;
        // token??????????????????
        if (coins && coins.list && coins.list.length > 0) {
            coin = coins.list[0];
            if (coin.owner_eth_address !== token.owner_eth_address || id !== coin.open_id) 
                throw new Error('??????????????????DApp, ???????????????');
                // throw new Error(`coin.address:${coin.owner_eth_address}, coin.id:${coin.open_id}, token.address:${token.owner_eth_addres}, token:id${id}`);
        }


        const multiLanguageListnew = await LanguageHelper.batchGet('Dapp', [ { id } ]);
        // const multtLangString = JSON.stringify(multiLanguageListnew)
 
        // ????????????
        const data = Object.assign(token, {
            name: token.name || '',
            chain: token.chain || '',
            chainTag: token.chains || '',
            tags: token.tags || '',
            icon: token.icon || '',
            url: token.url || '',
            hostName:  token.website || '',
            telegram: token.telegram || '',
            twitter: token.twitter || '',
            discord: token.discord || '',
            facebook: token.facebook || '',
            discord: token.discord || '',
            version: token.current_version || 0,
            sort: token.sort || 0,
            open_id: id,
            intro: token.introduction || '',
            flag: (token.name || '').toLowerCase(),
            description: token.description || '',
            type: token.type || '', 
            email: token.email || '',
            weibo: token.weibo || '',
            source: token.source || '',
            users: token.users || 0,
            amounts: token.amounts || 0,
            trans: token.trans || 0,
            count: token.count || 0,
            url: token.url || '',
            keywords: token.keywords || 0,
            langList: multiLanguageListnew || [],
            relationDocTitle: '',
            relationDocURL: '', 
            adIcon:  '',
            adUrl:  '',
            adLastTime:  0,
            audit:  1,
            hostName:  '',
            status: 0,                                       // ms_coin???????????????
        }); 
        delete data.id;

        // ???????????????coin??????????????????????????????????????????????????????????????????
        if (coin) data.id = coin.id;
        const updatedCoins = await NetHelper.post({
            url: `${CONFIG.host_dapp}/admin/openSyncDapp`,
            json: true,
            body: data
        });

        let updatedCoin = null;
        if (updatedCoins && updatedCoins.length > 0) {
            updatedCoin = updatedCoins[0];
            
            if (!token.dapp_id) {
                // coin???????????????coin_id
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE DApp SET dapp_id=?, status=?, remark=?, is_online=? WHERE id=?`,
                    values: [ updatedCoin.id, status, remark || '', updatedCoin.status || 0, id ]
                });
            } else {
                // coin?????????
                await DBhelper.queryMysql(MYSQL_OPEN, {
                    sql: `UPDATE DApp SET status=?, remark=?, is_online=? WHERE id=? `,
                    values: [ status, remark || '', updatedCoin.status || 0, id ]
                });
            }
        }

        // ???????????????
        // const multiLanguageList = await LanguageHelper.batchGet('Dapp', [ { id } ]);
        // if (!multiLanguageList || multiLanguageList.length == 0) return true;

        // await LanguageHelper.batchSet('dapp', 'DApps', multiLanguageList.map(_ => {
        //     const data = _.data; 
        //     _.data = data;
        //     return _;
        // }));
        
        return true;
    }

    async getMultiLanguageList(params) {
        const { id } = params; 
        return await LanguageHelper.batchGet('Dapp', [ { id } ]);
    }

    // symbol', 'currency', 'chain', 'contract'
    async getPrice(params){
        return await Coinhelper.getPrice(params);
    }
    async update (params) {
        this._checkParams(params, [ "id", 'sessionId']);

        const { multiLanguageList,  id } = params;
        const tokens = await DBhelper.queryMysql(MYSQL_OPEN, {
            sql: `SELECT * FROM DApp WHERE id = ?`,
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
        const setSqlK=`UPDATE DApp SET  ${Object.keys(tokenData).map(v=>`${v}=?`).join(",")} where id=${id}`
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


    async getTageList(params){
        return await Coinhelper.getTageList(params);
    }

    
}

