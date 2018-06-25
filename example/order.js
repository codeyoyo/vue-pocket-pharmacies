/**
 * @api {get} /path 订单信息
 * @apiName 1
 * @apiGroup order
 * @apiSuccess {Object} orderModel 订单实体
 * @apiSuccess {String} order.type 订单状态
 * @apiSuccess {String} order.orderId 订单编号
 * @apiSuccess {Number} order.productCount 订单商品数量
 * @apiSuccess {Float}  order.totalPrice 订单总价
 * @apiSuccess {Array}  productList 订单商品集合
 * @apiSuccess {String} productList.productImg 商品图片
 * @apiSuccess {String} productList.productId 商品ID
 * @apiSuccess {String} productList.productName 商品名称
 * @apiSuccess {Float}  productList.productPrice 商品单价
 * @apiSuccess {Number} productList.productCount  商品购买总数
 * @apiSuccess {String} productList.productSpecifications  商品规格
 */

/**
 * @api {post} /path 订单价格计算接口
 * @apiName 2
 * @apiGroup order
 * @apiSuccess {Float} orderTotalPrice 订单总价
 * @apiSuccess {Float} priceTotalPrice 商品总价
 * @apiSuccess {Float} freight 运费
 */

/**
 * @api {get} /path 订单信息详情接口
 * @apiName 3
 * @apiGroup order
 * @apiSuccess {String} addressId 地址ID
 * @apiSuccess {Object} orderModel 订单实体
 * @apiSuccess {String} order.type 订单状态
 * @apiSuccess {String} order.orderId 订单编号
 * @apiSuccess {Number} order.productCount 订单商品数量
 * @apiSuccess {Float}  order.totalPrice 订单总价
 * @apiSuccess {String}  order.payType 支付方式
 * @apiSuccess {String}  order.orderTime 下单时间
 * @apiSuccess {String}  order.cancelTime 订单取消时间
 * @apiSuccess {Array}  productList 订单商品集合
 * @apiSuccess {String} productList.productImg 商品图片
 * @apiSuccess {String} productList.productId 商品ID
 * @apiSuccess {String} productList.productName 商品名称
 * @apiSuccess {Float}  productList.productPrice 商品单价
 * @apiSuccess {Number} productList.productCount  商品购买总数
 * @apiSuccess {String} productList.productSpecifications  商品规格
 */

/**
 * @api {get} /path 订单跟踪
 * @apiName 4
 * @apiGroup order
 * @apiSuccess {String} orderCode 订单编号
 * @apiSuccess {String} delivery 配送方式
 * @apiSuccess {Array} logisticsList 物流信息集合 ['物流信息实体','物流信息实体']
 * @apiSuccess {Array} logisticsList.place 物流所在地点
 * @apiSuccess {Array} logisticsList.message 物流信息
 * @apiSuccess {Array} logisticsList.datetime 时间
 */

/**
 * @api {get} /path 申请退款
 * @apiName 5
 * @apiGroup order
 * @apiSuccess {Float} money 退款金额
 * @apiSuccess {Array} regardList 退款理由集合 ["退款理由","退款理由"]
 */

/**
 * @api {get} /path 查看退款
 * @apiName 6
 * @apiGroup order
 * @apiSuccess {Object} refundObj 退款状态实体 
 * @apiSuccess {Number} refundObj.type 退款状态 0、审核中 1、退款成功 2、已审核待退款 3、退款失败
 * @apiSuccess {String} refundObj.money 退款金额
 * @apiSuccess {String} refundObj.regard 退款理由
 * @apiSuccess {String} refundObj.remarks 退款说明
 * @apiSuccess {String} refundObj.orderCode 订单编号
 * @apiSuccess {Array} rateList 退款进度 ["退款进度实体","退款进度实体"]
 * @apiSuccess {String}  rateList.text 退款状态描述
 * @apiSuccess {String}  rateList.datetime 时间
 */

/**
 * @api {get} /path 取消订单接口
 * @apiName 7
 * @apiGroup order
 */
