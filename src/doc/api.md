# 一、用户
### 1. 用户登录
POST {{host}}/user/login HTTP/1.1
content-type: {{content-json-type}}

request:
```json
{
    "loginName": String,
    "password": String
}
```

response:
```json
// fail
{
  "status": 1,
  "data": "用户名或密码错误"
}

// success
{
  "status": 0,
  "data": {
    "jwtToken": Stirng
  }
}
```

### 2. 更新用户
POST {{host}}/user/update HTTP/1.1
content-type: {{content-json-type}}
token: {{token}}

request:
```json
{
    "id": Number,
    "loginName": String,
    "password": String
}
```

response:
```json
{
  "status": 0,
  "data": true
}
```

### 3. 新增用户
POST {{host}}/user/update HTTP/1.1
content-type: {{content-json-type}}
token: {{token}}

request:
```json
{
    "loginName": String,
    "password": String
}
```


response:
```json
{
  "status": 0,
  "data": true
}
```

# 二、Token

### ENUM Token审核状态
```javascript
module.exports = class TokenStatus {

    constructor () {
        this.REVIEWING = 0;     // 审核中
        this.LISTED = 1;        // 审核通过
        this.FAILED = 2;        // 审核未通过
    }

    getKey (value) {
        switch (value) {
            case this.REVIEWING:
                return 'Reviewing';
            case this.LISTED:
                return 'Listed';
            case this.FAILED:
                return 'Failed';
        }
    }

}
```

### 1. 获取token列表
GET {{host}}/token/list HTTP/1.1
content-type: {{content-json-type}}
token: {{token}}

request:
```json
{
    "pageNum": Number,
    "pageSize": Number
}
```

response: 
```json
{
  "status": 0,
  "data": {
    "total": Number,
    "list": [
      {
        "id": Number,
        "owner_eth_address": String,
        "status":String,
        "search_key":String,
        "language":String,
        "name":String,
        "coin":String,
        "chain":String,
        "contract":String,
        "icon":String,
        "price_from":String,
        "about":String,
        "supply_total":String,
        "decimals":String,
        "website":String,
        "whitepaper":String,
        "twitter":String,
        "github":String,
        "telegram":String,
        "facebook":String,
        "remark":String,
        "tools":String,
        "create_time": String,
        "update_time": String
      }
    ]
  }
}
```

### 2. 审核Token
GET {{host}}/token/verify HTTP/1.1
content-type: {{content-json-type}}
token: {{token}}

```json
{
    "id": 1,
    "status": 2,                   // 审核拒绝
    "remark": "token名称错误"       // 拒绝原因
}
```

# 三、 操作记录

### 1. 获取操作记录列表
GET {{host}}/operation/list HTTP/1.1
content-type: {{content-json-type}}
token: {{token}}

request:
```json
{
    "pageNum": Number,
    "pageSize": Number
}
```

response: 
```json
{
  "status": 0,
  "data": {
    "total": Number,
    "list": [
      {
        "id": Number,
        "userId":String,
        "operation":String,
        "create_time":String,
        "update_time":String
      }
    ]
  }
}
```