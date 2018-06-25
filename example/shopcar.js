/**
 * @api {post} /path 购物车商品数据
 * @apiName 1
 * @apiGroup shoppingCart
 * 
 * @apiSuccess {Array} productList 商品数据集合
 * @apiSuccess {String} productList.productName 商品名称
 * @apiSuccess {String} productList.productImg   商品图片
 * @apiSuccess {String} productList.productId   商品ID
 * @apiSuccess {String} productList.productSpecifications  商品规格
 * @apiSuccess {Number} productList.productCount   商品购买总数
 */

/**
 * @api {post} /path 购物车商品价格数据
 * @apiName 2
 * @apiGroup shoppingCart
 * 
 * @apiSuccess {Float} totalPrice 购物车中的所有商品总价格
 * @apiSuccess {Array} priceList 价格数据集合
 * @apiSuccess {String} priceList.productId 商品ID
 * @apiSuccess {Float} priceList.productPrice 商品单价
 * @apiSuccess {Float} productList.priceTotal   商品总价
 */
