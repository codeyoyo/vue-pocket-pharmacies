/**
 * @api {get} /path 热门搜索
 * @apiName 1
 * @apiGroup search
 * 
 * @apiSuccess {Array} dataList 数据集合
 * @apiSuccess {String} dataList.productName 商品名称
 * @apiSuccess {String} dataList.ProductId   商品Id
 */

/**
 * @api {get} /path 搜索结果
 * @apiName 2
 * @apiGroup search
 * 
 * @apiSuccess {Number} pageIndex 页码
 * @apiSuccess {Number} pageCount 总页数
 * @apiSuccess {Number} pageSize 每页条数
 * @apiSuccess {Array} dataList 数据集合
 * @apiSuccess {String} dataList.productName 商品名称
 * @apiSuccess {String} dataList.descript   商品简介
 * @apiSuccess {String} dataList.ProductId   商品Id
 * @apiSuccess {String} dataList.imgUrl      商品图片
 * @apiSuccess {String} dataList.nowPrice    现价
 * @apiSuccess {String} dataList.oldPrice    原价
 */
