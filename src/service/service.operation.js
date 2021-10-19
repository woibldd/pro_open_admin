const DBhelper = require('../tool/dbhelper');

module.exports = class OperationService {

    async insertOperation(userId, operation) {
        const users = await DBhelper.queryMysql(MYSQL, {
            sql: `SELECT * FROM User WHERE id=?`,
            values: [ userId ]
        });
        
        const loginName = users && users[0] && users[0].loginName || '';
        const operationContent = `用户[${loginName}]${operation}`;
        await DBhelper.queryMysql(MYSQL, {
           sql: `INSERT INTO Operation (userId, operation) VALUES (?,?) `,
           values: [ userId, operationContent ] 
        });
    }

}
