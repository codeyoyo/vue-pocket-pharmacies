import ajax from "@/func/fetch";

/**
 * 获取商品详情
 * @param {String} goodsId 商品ID
 */
const goods = (goodsId) => {
  return ajax.getData(`Goods?goodsId=${goodsId}`);
}

/**
 * 获取商品信息
 * @param {Array} data 商品数据
 */
const product = (data, load) => {
  return ajax.postData(`BatchProductDetails`, data, "", load);
}

/**
 * 获取商品详情
 * @param {String} productId 商品ID
 * @param {String} merchantId 商家ID
 */
const productDetails = (productId, merchantId) => {
  return ajax.getData(`ProductDetails?productId=${productId}&merchantId=${merchantId}`);
}

/**
 * 获取商品图文详情
 * @param {String} productId 商品ID
 */
const productImages = (productId) => {
  return ajax.getData(`ProductImages?productId=${productId}`);
}

/**
 * 商品说明书
 * @param {String} productId 商品ID
 */
const productManual = (productId) => {
  return ajax.getData(`ProductManual?productId=${productId}`);
}

export default {
  goods,
  product,
  productDetails,
  productImages,
  productManual
}
