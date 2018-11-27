let express = require('express');

let user = require('../controls/user');
let customer = require('../controls/customer');
let receiptor = require('../controls/receiptor');
let logistics = require('../controls/logistics');
let member =require('../controls/member');
let goodstype = require('../controls/goodstype');
let goods = require('../controls/goods');
let order = require('../controls/order');

let api = require('../api');
let upload = require('../utils/upload');

const routerRejHandler = require('./routerRejHandler');
const router = routerRejHandler(express.Router());
// let router = express.Router();



// user
router.post(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

//客户
router.post(api.customerAdd, customer.addCustomer);
router.post(api.customerList, customer.listCustomer);
router.post(api.customerDetail, customer.detailCustomer);
router.post(api.customerUpdate, customer.updateCustomer);

//收货方
router.post(api.customerAdd, receiptor.addReceiptor);
router.post(api.customerList, receiptor.listReceiptor);
router.post(api.customerDetail, receiptor.detailReceiptor);
router.post(api.customerUpdate, receiptor.updateReceiptor);


//物流 
router.post(api.logisticsAdd, logistics.addLogistics);
router.post(api.logisticsList, logistics.listLogistics);


// order
router.post(api.orderAdd, order.addOrder);
router.post(api.orderList, order.listOrder);
router.post(api.orderDetail, order.detailOrder);
router.post(api.orderUpdate, order.updateOrder);
router.post(api.orderDelete, order.deleteOrder);
router.post(api.orderGetDict, order.getDictOrder);
router.post(api.orderGetReceiptorList, order.getReceiptorList);
router.post(api.orderGetLogisticsMsg, order.getLogisticsMsg);
router.post(api.orderUpdateLogisticsMsg, order.updateLogisticsMsg);



module.exports = router;