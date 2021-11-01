CREATE TABLE IF NOT EXISTS `User` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `loginName` varchar(100) NOT NULL DEFAULT '' COMMENT '登录名称',
    `password` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
    `roleId` varchar(100) NOT NULL DEFAULT '' COMMENT '角色id',
	`permission` text NOT NULL DEFAULT '' COMMENT '权限',
	`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	`update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	PRIMARY KEY (`id`),
	UNIQUE KEY `loginName` (`loginName`),
	KEY `create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Operation` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `userId` varchar(100) NOT NULL DEFAULT '' COMMENT '用户Id',
    `module` varchar(100) NOT NULL DEFAULT '' COMMENT '模块',
    `operation` text NOT NULL COMMENT '操作内容',
	`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	`update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	PRIMARY KEY (`id`),
	KEY `create_time` (`create_time`),
	KEY `module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;