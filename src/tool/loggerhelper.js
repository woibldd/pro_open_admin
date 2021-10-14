
const NetHelper = require('./nethelper');

module.exports = class Helper {
    constructor(){
        
    }

    static async post(type, name, content){
        const service = 'open';
        try {
            await NetHelper.post({
                'url': `${CONFIG.host_logger}/post`,
                'json': true,
                'body': {
                    'type': type.toLowerCase(),
                    'service': service.toLowerCase(),
                    'name': name.toLowerCase(),
                    'content': typeof content == 'object' ? JSON.stringify(content) : content,
                }
            });
        } catch(e){
            console.log(e);
        }
        return true;

    }

    static async error(name, content){
        return this.post('error', name, content);
    }

    static async warn(name, content){
        return this.post('warn', name, content);
    }

    static async log(name, content){
        return this.post('log', name, content);
    }
    
}