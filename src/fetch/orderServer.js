import ajax from '@/func/fetch.js'
let url = 'http://120.78.69.215:10012/api/v1/'

/**
 * 添加订单
 * @param {Objdect} data 订单添加数据
 */
const ordersAdd = (data) => {
  /* [
     {
       "productId": 0,
        "quantity": 0,
        "merchantBasicId": 0,
        "isGroup": true
     }
   ]*/
  let send = {
    'paymentType': data.paymentType, //付款方式 1、货到付款，2、款到发货
    'deliveryType': data.deliveryType, //配送方式
    'invoiceType': data.invoiceType, //发票类型0-无、1-电子发票、2-纸质发票
    'invoiceTitleType': data.invoiceTitleType, //发票抬头类型 1-个人、2-单位
    'taxpayerId': data.taxpayerId, //纳税人识别号 
    'invoiceContentType': data.invoiceContentType, //发票内容类型
    'deliveryId': data.deliveryId, //收货人信息Id
    'regionId': data.regionId, //地区编码Id
    'clientIp': '',
    'surveyedAddress': 'http://m.yaojushi.com',
    'equipmentCode': 2,
    'remark': data.remark,
    'ordersList': data.ordersList
  }
  return ajax.postData('OrderAdd', send, url)
}

/**
 * 订单查询
 * @param {Object} data 订单查询实体 
 */
const ordersSearch = (data) => {
  let send = {
    'OrdersState': data.OrdersState,
    'PageIndex': data.PageIndex,
    'PageSize': data.PageSize
  }
  return ajax.postData('OrderSearch', send, url)
}

/**
 * 取消订单
 * @param {String} data 订单号
 */
const orderCancel = (data) => {
  let send = {
    "ordersCode": data
  };
  return ajax.postData('OrderCancel', send, url);
}

/**
 * 支付接口
 * @param {Objdect} data 数据 
 */
const requestOrderPay = (data) => {
  let send = {
    "returnUrl": data.returnUrl,
    "ordersCode": data.ordersCode,
    "paymentType": data.paymentType
  };
  let payUrl = 'http://120.78.69.215:1100/api/v1/';
  return ajax.postData("requestOrderPay", send, payUrl);
}

/**
 * 待提交订单价格计算
 * @param {Array} data 数据集合 
 */
const orderPriceCalculation = (data) => {
  let send = {
    "ordersList": data
  };
  return ajax.postData("OrderPriceCalculation", send, url);
}

/**
 * 订单详情
 * @param {String} data 订单编号 
 */
const ordersDetails = (data) => {
  let send = {
    "ordersCode": data
  }
  return ajax.postData("OrderDetails", send, url);
}

/**
 * 订单列表查询
 * @param {String} data 订单编号
 */
const orderTracking = (data) => {
  let send = {
    "ordersCode": data
  }
  return ajax.postData("OrderTracking", send, url);
}

export default {
  ordersAdd,
  ordersSearch,
  requestOrderPay,
  orderCancel,
  orderPriceCalculation,
  ordersDetails,
  orderTracking
}
