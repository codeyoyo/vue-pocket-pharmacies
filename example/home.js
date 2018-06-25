/**
 * @api {get} /path 首页轮播图接口
 * @apiName 1
 * @apiGroup home
 * @apiSuccess dataList [{imgUrl:'',productId:''}]
 * @apiSuccess {String} imgUrl 图片地址
 * @apiSuccess {String} productId  跳转的商品Id
 */

/**
 * @api {get} /path 秒杀商品接口
 * @apiName 2
 * @apiGroup home
 * @apiSuccess dataList [{imgUrl:'',productId:'',discount:0,currentPrice:0.00,originalCost:0.00}]
 * @apiSuccess {String} imgUrl 图片地址
 * @apiSuccess {String} productId  跳转的商品Id
 * @apiSuccess {Double} discount 折扣
 * @apiSuccess {Double} currentPrice 现价
 * @apiSuccess {Double} originalCost 原价
 */

/**
 * @api {get} /path 特色会场
 * @apiName 3
 * @apiGroup home
 * @apiSuccess dataList [{imgUrl:'',productId:''}]
 * @apiSuccess {String} imgUrl 图片地址
 * @apiSuccess {String} productId  跳转的商品Id
 * 
 */

/**
 * @api {get} /path 热门推荐
 * @apiName 4
 * @apiGroup home
 * @apiSuccess dataList [{imgUrl:'',productId:''}]
 * @apiSuccess {String} imgUrl 图片地址
 * @apiSuccess {String} productId  跳转的商品Id
 * 
 */

/**
 * @api {get} /path 广告
 * @apiName 5
 * @apiGroup home
 * @apiSuccess dataList [{imgUrl:'',productId:''}]
 * @apiSuccess {String} -imgUrl 图片地址
 * @apiSuccess {String} -productId  跳转的商品Id
 * 
 */

/**
 * @api {get} /path 楼层
 * @apiName 6
 * @apiGroup home
 * @apiSuccess {String} name 楼层名字
 * @apiSuccess {Array} floorList  楼层商品[{imgUrl:'',productId:''}]
 * @apiSuccess {String} -imgUrl 图片地址
 * @apiSuccess {String} -productId  跳转的商品Id
 * @apiSuccess {Array} adList  广告[{imgUrl:'',productId:''}]
 * @apiSuccess {String} -imgUrl 图片地址
 * @apiSuccess {String} -productId  跳转的商品Id
 * @apiSuccess {String} answers 问答
 * @apiSuccess {String} headline  头条
 */

/**
 * @api {get} /path 猜你喜欢
 * @apiName 7
 * @apiGroup home
 * @apiSuccess {Number} pageIndex 页码
 * @apiSuccess {Number} pageSise 每页数量
 * @apiSuccess {Number} pageCount 总页数
 * @apiSuccess {Array} dataList  商品列表[{imgUrl:'',productId:''}]
 * @apiSuccess {String} dataList.imgUrl 图片地址
 * @apiSuccess {String} dataList.productId  跳转的商品Id
 * @apiSuccess {String} dataList.productName  商品名称
 * @apiSuccess {String} dataList.productSpecifications  商品规格
 * @apiSuccess {Float} dataList.nowPrice    现价
 * @apiSuccess {Float} dataList.oldPrice    原价
 */
