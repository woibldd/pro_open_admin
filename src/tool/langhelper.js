
const Nethelper = require('./nethelper');
const MODULE = 'open';

module.exports = class Helper {

    static async get(lang, table, data){
        const ids = [];
        if(!data || data.length == 0) return data;
        if(!lang) return data;
        if(!table) return data;
        for(var it of data){
            if(!it.id) throw new Error('Lost id for language');
            ids.push(it.id);
        }
        const reply = await Nethelper.get(`${CONFIG.host_language}/get?lang=${lang}&module=${MODULE}&table=${table}&id=${ids.join(',')}`);
        for (var it of data) {
            if(it.id && reply[it.id.toString()]){
                for(var key in reply[it.id.toString()]) it[key] = reply[it.id.toString()][key];
            }
        }
        return data;
    }

    static async set(lang, table, id, data){
        return await Nethelper.post({
            url: `${CONFIG.host_language}/post`,
            json: true,
            body: {
                lang: lang,
                module: MODULE,
                table: table,
                id: id,
                data: JSON.stringify(data)
            }
        });
    }

    static async batchSet(module, table, data){
        return await Nethelper.post({
            url: `${CONFIG.host_language}/batchPost`,
            json: true,
            body: {
                module: module || MODULE,
                table: table,
                data: JSON.stringify(data)
            }
        });
    }
    
    static async batchGet(table, data){
        const ids = [];
        if(!data || data.length == 0) return data;
        if(!table) return data;
        for(var it of data){
            if(!it.id) throw new Error('Lost id for language');
            ids.push(it.id);
        }
        return await Nethelper.get(`${CONFIG.host_language}/batchGet?module=${MODULE}&table=${table}&id=${ids.join(',')}`);
    }

}