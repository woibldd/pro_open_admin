
const request = require('request');
const {exec} = require('child_process'); 

function formatOptions(options){
	if(typeof options == 'string'){
		options = {
			url: options,
			timeout: 30000
		};
	} else {
		if(!options.timeout) 
			options.timeout = 30000;
	}
	options.strictSSL = false;
	options.rejectUnauthorized = false;
	return options;
}
    
module.exports = class Helper {
    constructor(){}

    static async curl(url){
        return new Promise((resolve, reject) => {
        	const cmd = 'curl ' + url;
            exec(cmd, function(err, stdout){
                if(err) return reject(err);
                return resolve(stdout);
            });
        });
    }

    static async get(options, noNeedCheckStatus){
    	options = formatOptions(options);
    	return new Promise((resolve, reject) => {
    		request.get(options, function(err, res) {
    			if(err) return reject(err);
		        if (res && (res.statusCode == 200 || res.statusCode == 201)) {
		        	let body = res.body;
		            if(typeof res.body == 'string' && (res.body.startsWith('{') || res.body.startsWith('['))){
		        		body = JSON.parse(res.body);
		        	}
		        	if(noNeedCheckStatus){
		        		return resolve(body);
		        	}
		        	if(body.status !== undefined && body.data !== undefined){
	        			if(body.status == 0 || body.status == '0' || body.error == 0) 
	        				return resolve(body.data);
	        			if(typeof body.status == 'string' && ['ok','success'].indexOf(body.status) >= 0) 
	        				return resolve(body.data);

	        			if(CONFIG.debug) console.log('\r\n*************** Request Failure 1 ***', body);
	        			return reject(body.data || body.status);
	        		} else {
	        			return resolve(body);
	        		}
		        } else {
		        	if(CONFIG.debug) console.log('\r\n*************** Request Failure 2 ***', res.body || res.statusCode);
		            return reject(res.body || res.statusCode);
		        }
		    });
        });
    }

    static async post(options, noNeedCheckStatus){
    	options = formatOptions(options);
    	return new Promise((resolve, reject) => {
    		request.post(options, function(err, res) {
    			if(err) return reject(err);
		        if (res && (res.statusCode == 200 || res.statusCode == 201)) {
		        	let body = res.body;
		            if(typeof res.body == 'string' && (res.body.startsWith('{') || res.body.startsWith('['))){
		        		body = JSON.parse(res.body);
		        	}
		        	if(noNeedCheckStatus){
		        		return resolve(body);
		        	}
		        	if(body.status !== undefined && body.data !== undefined){
	        			if(body.status == 0 || body.status == '0') 
	        				return resolve(body.data);
	        			if(typeof body.status == 'string' && ['ok','success'].indexOf(body.status) >= 0) 
	        				return resolve(body.data);

	        			if(CONFIG.debug) console.log('\r\n*************** Request Failure 1 ***', body);
	        			return reject(body.data || body.status);
	        		} else {
	        			return resolve(body);
	        		}
		        } else {
		        	if(CONFIG.debug) console.log('\r\n*************** Request Failure 2 ***', res.body || res.statusCode);
		            return reject(res.body || res.statusCode);
		        }
		    });
        });
    }

    static async delete(options, noNeedCheckStatus){
    	options = formatOptions(options);
    	return new Promise((resolve, reject) => {
    		request.delete(options, function(err, res) {
    			if(err) return reject(err);
		        if (res && (res.statusCode == 200 || res.statusCode == 201)) {
		        	let body = res.body;
		            if(typeof res.body == 'string' && (res.body.startsWith('{') || res.body.startsWith('['))){
		        		body = JSON.parse(res.body);
		        	}
		        	if(noNeedCheckStatus){
		        		return resolve(body);
		        	}
		        	if(body.status !== undefined && body.data !== undefined){
	        			if(body.status == 0 || body.status == '0') 
	        				return resolve(body.data);
	        			if(typeof body.status == 'string' && ['ok','success'].indexOf(body.status) >= 0) 
	        				return resolve(body.data);

	        			if(CONFIG.debug) console.log('\r\n*************** Request Failure 1 ***', body);
	        			return reject(body.data || body.status);
	        		} else {
	        			return resolve(body);
	        		}
		        } else {
		        	if(CONFIG.debug) console.log('\r\n*************** Request Failure 2 ***', res.body || res.statusCode);
		            return reject(res.body || res.statusCode);
		        }
		    });
        });
    }

}