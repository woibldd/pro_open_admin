module.exports = class Helper {
    constructor(){}

    static async insertMongo(mongoInstance, modelName, obj){
        return new Promise((resolve, reject) => {
            const Model = mongoInstance.model(modelName);
            const data = new Model(obj);
            data.save(function(err, reply){
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async queryMongo(mongoInstance, modelName, query, offset = 0, limit = 20, sort = null){
        return new Promise((resolve, reject) => {
            const Model = mongoInstance.model(modelName);
            Model.find(query).sort(sort).skip(offset).limit(limit).exec(function(err, reply){
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async oneMongo(mongoInstance, modelName, query){
        return new Promise((resolve, reject) => {
            const Model = mongoInstance.model(modelName);
            Model.findOne(query, function(err, reply){
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async countMongo(mongoInstance, modelName, query){
        return new Promise((resolve, reject) => {
            const Model = mongoInstance.model(modelName);
            Model.count(query, function(err, reply){
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async queryMysql(mysqlInstance, sql){
        return await mysqlInstance.query(sql);
    }

    static async getRedis(redisInstance, key){
        return new Promise((resolve, reject) => {
            redisInstance.get(key, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async setRedis(redisInstance, key, value){
        return new Promise((resolve, reject) => {
            redisInstance.set(key, value, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async delRedis(redisInstance, key){
        return new Promise((resolve, reject) => {
            redisInstance.del(key, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async expireRedis(redisInstance, key, ts){
        return new Promise((resolve, reject) => {
            redisInstance.expire(key, ts, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async hgetRedis(redisInstance, key, field){
        return new Promise((resolve, reject) => {
            redisInstance.hget(key, field, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async hgetAllRedis(redisInstance, key){
        return new Promise((resolve, reject) => {
            redisInstance.hgetall(key, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async hsetRedis(redisInstance, key, field, value){
        return new Promise((resolve, reject) => {
            redisInstance.hset(key, field, value, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async hdelRedis(redisInstance, key, field){
        return new Promise((resolve, reject) => {
            redisInstance.hdel(key, field, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async lpopRedis(redisInstance, key){
        return new Promise((resolve, reject) => {
            redisInstance.lpop(key, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async rpopRedis(redisInstance, key){
        return new Promise((resolve, reject) => {
            redisInstance.rpop(key, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async lpushRedis(redisInstance, key, value){
        return new Promise((resolve, reject) => {
            redisInstance.lpush(key, value, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }

    static async rpushRedis(redisInstance, key, value){
        return new Promise((resolve, reject) => {
            redisInstance.rpush(key, value, (err, reply) => {
                if(err) return reject(err);
                return resolve(reply);
            });
        });
    }
}