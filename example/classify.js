/**
 * @api {get} /path 分类
 * @apiName 1
 * @apiGroup classify
 * @apiSuccess {String} advertising 广告
 * @apiSuccess {String} advertising.imgUrl 广告图片
 * @apiSuccess {String} advertising.productId  跳转的商品Id
 * @apiSuccess {Array} classifyList  分类集合
 * @apiSuccess {String} classifyList.Name  分类名称
 * @apiSuccess {String} classifyList.Id  分类ID
 * @apiSuccess {Array} classifyList.Content  分类内容
 * @apiSuccess {String} classifyList.Content.Name  子分类名称
 * @apiSuccess {Array} classifyList.Content.ProductList  子分类商品
 * @apiSuccess {String} classifyList.Content.ProductList.ProductId  商品ID
 * @apiSuccess {String} classifyList.Content.ProductList.ProductImg  商品图片
 * @apiSuccess {String} classifyList.Content.ProductList.ProductName  商品名称
 */