global.CONFIG = require('./config.json');

(function(){
	if(!CONFIG.redis) return;
	var redis = require("redis");
	CONFIG.redis.retry_strategy = function(options){
	    if (options.error && options.error.code === 'ECONNREFUSED') {
	        return new Error('The server refused the connection');
	    }
	    if (options.total_retry_time > 1000 * 60 * 60) {
	        return new Error('Retry time exhausted');
	    }
	    if (options.attempt > 10) {
	        return undefined;
	    }
	    return Math.min(options.attempt * 100, 3000);
	};
	global.REDIS = redis.createClient(CONFIG.redis); 
})();

(async function(){
	if(!CONFIG.mysql) return;
	const mysql = require('promise-mysql');
	global.MYSQL = await mysql.createPool(CONFIG.mysql);
})();

(function(){
	if(!CONFIG.mongo) return;
	const mongoose = require('mongoose');
	mongoose.connect(CONFIG.mongo.uri, CONFIG.mongo.options);
	mongoose.set('debug', CONFIG.debug);
	global.MONGO = mongoose;
})();