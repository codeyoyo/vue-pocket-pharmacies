import ajax from "@/func/fetch";

/**
 * 获取购物车
 */
const shoppingCart = (load) => {
  return ajax.getData('ShoppingCart', "", "", false);
}

/**
 * 计算购物车价格
 */
const shoppingCartPrice = (data, load) => {
  return ajax.postData('ShoppingCartPrice', data, "", false);
}

/**
 * 更新购物车
 * @param {Array} data 商品数据
 */
const updateShoppingCart = (data) => {
  return ajax.postData('UpdateShoppingCart', data, "", false);
}

export default {
  shoppingCart,
  shoppingCartPrice,
  updateShoppingCart
}
