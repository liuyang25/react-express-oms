let path = '/api';

module.exports = {
   

    // user
    userList: path + '/user/list',
    userDelete: path + '/user/delete',
    userAdd: path + '/user/add',
    userDeleteMulti: path + '/user/delete-multi',
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAutoLogin: path + '/user/auto-login',
    userChangeRole: path + '/user/change-role',
	
	
	
 // member
    memberList: path + '/member/list',
    memberDetail: path + '/member/detail',
    memberDelete: path + '/member/delete',
    memberAdd: path + '/member/add',
    memberDeleteMulti: path + '/member/delete-multi',
    memberChangeRole: path + '/member/change-role',

	
	 // goodstype
    goodstypeList: path + '/goodstype/list',
    goodstypeDetail: path + '/goodstype/detail',
   	goodstypeDelete: path + '/goodstype/delete',
    goodstypeAdd: path + '/goodstype/add',
    goodstypeDeleteMulti: path + '/goodstype/delete-multi',
   
	

	
	 // goods
    goodsList: path + '/goods/list',
	goodsType:path + '/goods/fetchType',	
    goodsDetail: path + '/goods/detail',
    goodsDelete: path + '/goods/delete',
    goodsAdd: path + '/goods/add',
    goodsDeleteMulti: path + '/goods/delete-multi',
    goodsUploadImg: path + '/goods/upload-img',
	
	
	
	
		
     // order
    orderAdd: path + '/order/add',
    orderList: path + '/order/list',
    orderDetail: path + '/order/detail',
	orderUpdate:path + '/order/Update',	
    orderDelete: path + '/order/delete',
    orderGetDict: path + '/order/getDict',
    orderGetReceiptorList: path + '/order/getReceiptorList',
    orderGetLogisticsMsg: path + '/order/getLogisticsMsg',
    orderUpdateLogisticsMsg: path + '/order/updateLogisticsMsg',

    customerAdd: path + '/customer/add',
    customerList: path + '/customer/list',
    customerDetail:path + '/customer/detail',
    customerUpdate:path + '/customer/update',

    receiptorAdd: path + '/receiptor/add',
    receiptorList: path + '/receiptor/list',
    receiptordetail: path + '/receiptor/detail',
    receiptorupdate: path + '/receiptor/update',


    logisticsAdd: path + '/logistics/add',
    logisticsList: path + '/logistics/list',
};