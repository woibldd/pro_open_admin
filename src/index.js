require('./conf');

const como = require('como');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./tool/loggerhelper');

const app = express();
app.set('env', CONFIG.debug ? 'development' : 'production');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const router = express.Router();
router.use(express.static(__dirname + '/dist'));
router.use(function(req, res, next) {
	var ts = new Date().getTime();
	console.log('\n');
    console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));
	res.callback = function(status, data){
		if(status) {
			console.log('BKERROR', req.url, JSON.stringify(req.body), status, JSON.stringify(data));
			Logger.error('api', { url: req.url, body: req.body, info: data || status });
		}
		if(data == null){
			if(typeof status == 'number') {
				res.json({'status': status, 'data': null});
			} else if(typeof status == 'object') {
				res.json({'status': 1, 'data': JSON.stringify(status)});
			} else {
				res.json({'status': 1, 'data': status.toString()});
			}
		} else {
			res.json({'status': status || 0, 'data': data});
		}
		console.log('***** Monitor ***** %s from %s:【%s】', req.url, req.ip, new Date().getTime() - ts);
	}
    next();
});

app.use((req, res, next) => {
	const url = req.url;
	const openApiRegexStrs = ['^/open_admin/status/', '^/open_admin/user/login', '^/' ];
	
	let needCheck = true;
	for (const regex of openApiRegexStrs) {
		if (new RegExp(regex).test(url)) {
			needCheck = false;
			break;
		}
	}

	if (needCheck) {
		jwt.verify(req.headers.token, 'aejael', (err, decode) => {
			if (err) {
				console.log(err);
				res.send({
					status: 40001,
					data: err.message
				});
			} else {
				req.body['sessionId'] = decode.userId || '';
				next();
			}
		});
	} else {
		next();
	}
});

function registerController(lib){
	const Controller = require(lib);
	const instance = new Controller();

	const fun = (req, res) => {
		(async() => {
			try {
				const method = req.params.method;
				const params = como.extend(req.query, req.body);
				if(instance[method]){
					const result = await instance[method](params, req, res);
					return res.callback(0, result);
				} else {
					return res.callback(404);					
				}
			} catch(e){
				if(CONFIG.debug) console.log(e);
				if(e instanceof Error){
                    return res.callback(e.message);
                } else {
                    return res.callback(e);
                }
			}
		})();
	};
	let path = '/open_admin/' + instance._pathPrefix + '/:method';
	router.get(path, fun);
	router.post(path, fun);
}

registerController('./controller/controller.status');
registerController('./controller/controller.user');
registerController('./controller/controller.token');
registerController('./controller/controller.operation');

router.use(function(req, res){
  res.status(404).send('404');
});

app.use(router);

process.setMaxListeners(0);

app.listen(CONFIG.port, function(){
    console.log('Server listening for http on ' + CONFIG.port);
});
