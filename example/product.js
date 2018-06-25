/**
 * @api {get} /path 商品信息详情
 * @apiName 1
 * @apiGroup product
 * 
 * @apiSuccess {String} adImg 广告图片
 * @apiSuccess {Array} imgList 商品图片集合[' ',' ',' ']
 * @apiSuccess {Object} productInfo 商品对象
 * @apiSuccess {String} productInfo.productName 商品名称
 * @apiSuccess {String} productInfo.descript   商品简介
 * @apiSuccess {String} productInfo.ProductId   商品Id
 * @apiSuccess {Float} productInfo.nowPrice    现价
 * @apiSuccess {Float} productInfo.oldPrice    原价
 * @apiSuccess {Number} productInfo.stockCount  库存总数量
 * @apiSuccess {String} productInfo.Manufacturer 厂家
 * @apiSuccess {String} productInfo.Efficacy 功效
 * @apiSuccess {String} productInfo.needKonw 用药需知
 */

/**
 * @api {get} /path 商品说明书
 * @apiName 2
 * @apiGroup product
 * 
 * @apiSuccess {Array} InstructionList 说明书数据结合
 * @apiSuccess {String} InstructionList.Directory 目录
 * @apiSuccess {String} InstructionList.Content 内容
 */

/**
 * @api {get} /path 商品图文详情
 * @apiName 3
 * @apiGroup product
 * 
 * @apiSuccess {Array} GraphictextList 商品图文详情集合 ['图片地址','图片地址']
 */

/**
 * @api {get} /path 商品评论
 * @apiName 4
 * @apiGroup product
 * 
 * @apiSuccess {Objdect} CommentsModel 商品评论实体 
 * @apiSuccess {String} CommentsModel.PositiveRate 商品好评率
 * @apiSuccess {Number} CommentsModel.PositiveCount 商品评论数
 * @apiSuccess {Number} CommentsModel.PositiveOverall 整体评论几星
 * @apiSuccess {Array} PositiveList 评论数据集合
 * @apiSuccess {Number} PositiveList.Score 评论分数几星
 * @apiSuccess {String} PositiveList.Text 评论内容
 * @apiSuccess {String} PositiveList.UserName 评论用户名
 * @apiSuccess {String} PositiveList.Date 评论日期
 */

 /**
  * @api {get} /path 促销信息
  * @apiName 5
  * @apiGroup product
  * 
  * @apiSuccess {Objdect} salesPromotion 促销信息实体
  * @apiSuccess {String} salesPromotion.title 促销信息标题
  * @apiSuccess {String} salesPromotion.content 促销信息描述
  * @apiSuccess {String} salesPromotion.premiumDescript 赠品描述
  * @apiSuccess {Arrary} salesPromotion.premium 赠品集合['赠品实体','赠品实体','赠品实体']
  * @apiSuccess {String} salesPromotion.premium.productName 赠品名称
  * @apiSuccess {String} salesPromotion.premium.productId 赠品ID
  * @apiSuccess {String} salesPromotion.premium.merchantId 赠品商家ID
  * @apiSuccess {Number} salesPromotion.premium.productCount 赠品数量
  */