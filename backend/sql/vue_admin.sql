
SET FOREIGN_KEY_CHECKS=0;




DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(40) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `role` tinyint(3) NOT NULL DEFAULT '0' COMMENT '用户权限',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` timestamp COMMENT '更新时间',

  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_code` varchar(50) NOT NULL ,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomation` varchar(300) COMMENT '信息描述',
  `comment` varchar(300) COMMENT '备注',
  `creator` varchar(300) COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 comment='物流信息表';




-- DROP TABLE IF EXISTS `members`;
-- CREATE TABLE `members` (
--   `members_id` int(11) NOT NULL AUTO_INCREMENT,
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
--    `update_time` timestamp COMMENT '更新时间',
--   `member_name` varchar(50) NOT NULL DEFAULT 'noname',
--   `member_phone` varchar(100) NOT NULL DEFAULT '',
--   `remarks` varchar(100) NOT NULL DEFAULT '',
--   `recommendation_code` varchar(100) NOT NULL DEFAULT '',
--   `membership_level` tinyint(3) NOT NULL DEFAULT '0' COMMENT '会员等级',
--   `member_address1` varchar(100) NOT NULL DEFAULT '',		
--   `member_address2` varchar(100) NOT NULL DEFAULT '',	
--   `member_address3` varchar(100) NOT NULL DEFAULT '',	
	
	
--   PRIMARY KEY (`members_id`),
--   UNIQUE KEY `members_id` (`members_id`) USING BTREE
-- ) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;



-- DROP TABLE IF EXISTS `goodstype`;
-- CREATE TABLE `goodstype` (
--   `goodstype` int(11) NOT NULL AUTO_INCREMENT,
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
--    `update_time` timestamp COMMENT '更新时间',
--   `goods_typename` varchar(100) NOT NULL DEFAULT '',
--   `remarks` varchar(100) NOT NULL DEFAULT '',
--   PRIMARY KEY (`goodstype`),
--   UNIQUE KEY `goodstype` (`goodstype`) USING BTREE
-- ) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;


-- DROP TABLE IF EXISTS `goods`;
-- CREATE TABLE `goods` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
--   `update_time` timestamp COMMENT '更新时间',
--   `goods_name` varchar(50) NOT NULL DEFAULT 'noname',
--   `goods_price` float(10,2) NOT NULL DEFAULT '0.00',
--   `inventory` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '库存',
--   `goods_typename` varchar(50) DEFAULT '' COMMENT '分类',
--   `imgs` varchar(50) DEFAULT '',
--   `onsale` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '是否上架',
--   `goods_details` varchar(50) DEFAULT '' COMMENT '详情',
--   PRIMARY KEY (`goods_id`),
--   UNIQUE KEY `goods_id` (`goods_id`) USING BTREE
-- ) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_code` varchar(100) NOT NULL COMMENT '订单号（唯一）',
  `customer_id` varchar(50) NOT NULL comment '客户代码',
  `good_name` varchar(50) ,
  `good_num` int(11) ,
  `good_weight` int(11) ,
  `good_volume` int(11) ,
  `good_volume_detail` varchar(100) comment '具体尺寸',
  `good_type` varchar(50) ,
  `good_attr` varchar(50) ,
  `customs_code` varchar(50) comment '海关编码',
  `declared_value` int(11) comment '申报价值',
  `receiving_time` timestamp COMMENT '收货时间',
  `receiving_name` varchar(50) COMMENT '收货方',
  `receiving_address` varchar(150),
  `receiving_company` varchar(150),
  `receiving_comment` varchar(200),
  `carriage` int(11) comment '运费',
  `additional_fee` int(11) comment '附加费',
  `recieved_fee` int(11) comment '已收费用',
  `concerted_pay_date` timestamp COMMENT '协议付款日期',
  `reparations` int(11) comment '赔款',
  `logistics_company` varchar(150) comment '物流公司',
  `logistics_orderid` varchar(50) comment '物流单号',
  `logistics_cost` int(11) comment '物流成本',
  `logistics_reparations` int(11) comment '物流赔款',
  `comment` varchar(250) comment '备注',
  `logistics_completed` tinyint comment '物流是否完结',
  `order_closed` tinyint comment '订单是否关闭',
  `creator` varchar(300) COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 comment='货单表';

 

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(50) NOT NULL COMMENT '客户代码',
  `compony_name` varchar(200) COMMENT '公司名称',
  `address` varchar(250) COMMENT '地址',
  `principal` varchar(30) COMMENT '负责人',
  `contact` varchar(250) COMMENT '联系方式',
  `main_business` varchar(300) COMMENT '主要营业方向',
  `comment` varchar(300) COMMENT '备注',
  `creator` varchar(300) COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='客户信息表';


INSERT INTO user(user_name, password,role) VALUES('hehe', 'hehe', 100);




