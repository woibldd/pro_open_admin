const DBhelper = require('../tool/dbhelper');

module.exports = class OperationService {

    async insertOperation(userId, operation) {
        DBhelper.queryMysql(MYSQL, {
           sql: `INSERT INTO Operation VALUES userId=?,operation=? `,
           values: [ userId, operation ] 
        });
    }

}
