
module.exports = class CoreController {

	constructor(pathPrefix){
		this._pathPrefix = pathPrefix;
	}

	_checkParams(params, arr){
        for(var i = 0; i < arr.length; i++){
            var it = arr[i];
            if(params[it] === undefined) throw new Error('Lost params: ' + it);
        }
    }

    _getClientIp(req) {
        return (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).replace('::ffff:', '');
    }


}