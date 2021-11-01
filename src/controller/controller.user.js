const MD5 = require("md5");
const jwt = require("jsonwebtoken");

const OperationService = require("../service/service.operation");
const CoreController = require("./controller.core");
const DBhelper = require("../tool/dbhelper");

module.exports = class UserController extends CoreController {
  constructor() {
    super("user");
    this.operationService = new OperationService();
  }

  async login(params) {
    this._checkParams(params, ["loginName", "password"]);

    const { loginName, password } = params;

    const users = await DBhelper.queryMysql(MYSQL, {
      sql: `SELECT * FROM User WHERE loginName=? `,
      values: [loginName],
    });
    if (!users || users.length === 0) {
      throw new Error("用户不存在");
    }

    const user = users[0];
    if (!user || !user.password || user.password !== MD5(password)) {
      throw new Error("密码错误");
    }

    const jwtToken = jwt.sign(
      {
        userId: user.id,
      },
      "aejael",
      {
        expiresIn: "10h",
      }
    );
    return {
      jwtToken,
      permssion: user.permission,
      expires: 60000 * 60 * 9.8 + Date.now(),
    };
  }

  async list(params) {
    this._checkParams(params, ["sessionId", "pageNum", "pageSize"]);
    const { pageNum, pageSize } = params;

    const offset = (pageNum - 1) * pageSize;

    const totalCount = await DBhelper.queryMysql(
      MYSQL,
      `SELECT count(*) as count FROM User`
    );
    const result = await DBhelper.queryMysql(MYSQL, {
      sql: `SELECT * FROM User ORDER BY create_time DESC LIMIT ?,?`,
      values: [parseInt(offset), parseInt(pageSize)],
    });

    return {
      total: totalCount[0].count,
      list: result.map((_) => {
        delete _.password;
        return _;
      }),
    };
  }

  async detail(params) {
    this._checkParams(params, ["sessionId"]);
    const { sessionId } = params;

    const result = await DBhelper.queryMysql(MYSQL, {
      sql: `SELECT * FROM User WHERE id=?`,
      values: [sessionId],
    });
    if (!result || result.length == 0) {
      throw new Error("User not found");
    }

    return result[0];
  }

  async update(params) {
    this._checkParams(params, [
      "sessionId",
      "loginName",
      "password",
      "permission",
    ]);

    const { id, sessionId, loginName, password, permission } = params;

    if (!id) {
      await DBhelper.queryMysql(MYSQL, {
        sql: `INSERT INTO User(loginName, password, permission)
                    VALUES(?, ?, ?)`,
        values: [loginName, MD5(password), `${permission}`],
      });

      await this.operationService.insertOperation(
        sessionId,
        `添加新用户[${loginName}]`,
        'user'
      );
    } else {
      if (params.password) params.password = MD5(params.password);
      const result = await DBhelper.queryMysql(MYSQL, {
        sql: `SELECT * FROM User WHERE id=?`,
        values: [id],
      });
      if (!result || result.length == 0) {
        throw new Error("User not found");
      }

      const filterKeys = [ "password", "permission"].filter((v) => params[v] && params[v] != "undefined");
      if(filterKeys.length==0) return true
      const nUser = await DBhelper.queryMysql(MYSQL, {
        sql: `UPDATE User set ${filterKeys.map((v) =>`${v}=?`).join(",")} WHERE id=${sessionId} `,
        values: filterKeys.map((k) => params[k]),
      });

      await this.operationService.insertOperation(
        sessionId,
        `更新用户${JSON.stringify(result)} to ${JSON.stringify(nUser)}`,
        'user'
      );
    }

    return true;
  }

  async updateself(params) {
    this._checkParams(params, ["sessionId", "loginName", "password"]);
    if (params.password) params.password = MD5(params.password);
    const result = await DBhelper.queryMysql(MYSQL, {
      sql: `SELECT * FROM User WHERE id=?`,
      values: [sessionId],
    });
    if (!result) {
      throw new Error("User not found");
    }

    const filterKeys = ["loginName", "password"].filter(
      (v) => params[v] && params[v] != "undefined" && params[v] != undefined
    );
    const nUser = await DBhelper.queryMysql(MYSQL, {
      sql: `UPDATE User set ${filterKeys.map((v) => `${v}=?`).join(",")} WHERE id=${sessionId} `,
      values: filterKeys.map((k) => params[k]),
    });
    return nUser;
  }
};
