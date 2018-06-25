import dataHelp from "../../func/dataHelp";
import fetch from "@/fetch/index";
import {
  Toast
} from "mint-ui";
const dataKey = 'shop_car';
const orderKey = "order_pay";
let state = {
  shopcart: [],
  orderAffirm: [],
  productError: 0
}

const getters = {
  shopcart(state) {
    let result = dataHelp.getData(dataKey);
    if (result) {
      try {
        state.shopcart = JSON.parse(result);
      } catch (e) {
        state.shopcart = [];
        dataHelp.delData(dataKey);
      }
    }
    return state.shopcart;
  },
  orderAffirm(state) {
    let result = dataHelp.getData(orderKey);
    if (result) {
      state.orderAffirm = JSON.parse(result);
    }
    return state.orderAffirm;
  },
  productError(state) {
    return state.productError;
  }
}

const actions = {
  addshopcart({
    commit,
    state,
    getters
  }, data) {
    if (!data) {
      return;
    }
    let shopcart = getters.shopcart;
    if (shopcart.length == 0) {
      state.shopcart.push(data);
      shopcart = state.shopcart;
    } else {
      let has = false;
      for (let i = 0; i < shopcart.length; i++) {
        let item = shopcart[i];
        if (item) {
          if (item.productId == data.productId && item.merchantBasicId == data.merchantBasicId && item.productCount > 0) {
            item.productCount += data.productCount;
            has = true;
            break;
          }
        }
      }
      if (!has) {
        shopcart.push(data);
      }
      state.shopcart = shopcart;
    }
    let updateGroup = [];
    for (let i = 0; i <= shopcart.length; i++) {
      let item = shopcart[i];
      if (item && item.productCount > 0) {
        updateGroup.push({
          "productId": item["productId"],
          "number": item["productCount"],
          "merchantBasicId": item["merchantBasicId"]
        });
      }
    }
    let jwt = getters.jwt;
    if (jwt) {
      fetch.api.shopCart.updateShoppingCart(updateGroup).then(data => {
        if (data.code == '200') {
          let tempArray = [];
          for (let i = 0; i < data.model.length; i++) {
            var item = data.model[i];
            tempArray.push({
              productId: item.productId,
              merchantBasicId: item.merchantBasicId,
              productCount: item.productCount
            });
          }
          state.shopcart = tempArray;
          dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
          Toast({
            message: "成功加入购物车",
            position: "bottom",
            duration: 3000
          });
        } else {
          Toast(data.message);
        }
      });
    } else {
      dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
      Toast({
        message: "成功加入购物车",
        position: "bottom",
        duration: 3000
      });
    }
  },
  updateShopCart({
    commit,
    state,
    getters
  }, shopcart) {
    let updateGroup = [];
    if (shopcart.length > 0) {
      for (let i = 0; i <= shopcart.length; i++) {
        let item = shopcart[i];
        if (item && item.productCount > 0) {
          updateGroup.push({
            "productId": item["productId"],
            "number": item["productCount"],
            "merchantBasicId": item["merchantBasicId"]
          });
        }
      }
    }
    return new Promise((resolve, reject) => {
      fetch.api.shopCart.updateShoppingCart(updateGroup).then(result => {
        if (result.code == '200') {
          let tempArray = [];
          for (let i = 0; i < result.model.length; i++) {
            var item = result.model[i];
            tempArray.push({
              productId: item.productId,
              merchantBasicId: item.merchantBasicId,
              productCount: item.productCount
            });
          }
          state.shopcart = tempArray;
          dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
          resolve(result.model);
        } else {
          Toast(result.message);
        }
      });
    });
  },
  changeProductCount({
    commit,
    state,
    getters
  }, productObj) {
    let shopcart = getters.shopcart;
    let newShopCart = [];
    for (let i = 0; i < shopcart.length; i++) {
      let item = shopcart[i];
      if (item.productId == productObj.productId && item.merchantBasicId == productObj.merchantBasicId) {
        newShopCart.push({
          productId: item.productId,
          productCount: productObj.productCount,
          merchantBasicId: item.merchantBasicId
        });
      } else {
        newShopCart.push(item);
      }
    }
    state.shopcart = newShopCart;
    dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
  },
  deleteProduct({
    commit,
    state,
    getters
  }, productIds) {
    let shopcart = getters.shopcart;
    let newShopCart = [];
    for (let i = 0; i < shopcart.length; i++) {
      let item = shopcart[i];
      let isDelete = false;
      for (let j = 0; j < productIds.length; j++) {
        let jtem = productIds[j];
        if (jtem) {
          if (jtem.productId == item.productId && jtem.merchantBasicId == item.merchantBasicId) {
            isDelete = true;
            break;
          }
        }
      }
      if (!isDelete) {
        newShopCart.push(item);
      }
    }
    state.shopcart = newShopCart;
    dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
  },
  setOrderAffirm({
    commit,
    state,
    getters
  }, data) {
    state.orderAffirm = data;
    dataHelp.setData(orderKey, JSON.stringify(state.orderAffirm));
  },
  removeOrderAffirm({
    commit,
    state,
    getters
  }, data) {
    dataHelp.delData(orderKey);
    state.orderAffirm = [];
  },
  setProductError({
    commit,
    state,
    getters
  }, data) {
    if (data) {
      state.productError++;
    } else {
      state.productError = 0;
    }
  },
  moreAddShopcart({
    commit,
    state,
    getters
  }, data) {
    if (!data) {
      return;
    }
    let shopcart = getters.shopcart;
    if (shopcart.length == 0) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        state.shopcart.push({
          productId: item.productId,
          merchantBasicId: item.merchantBasicId,
          productCount: item.quantity
        });
      }
    } else {
      let has = false;
      for (let i = 0; i < shopcart.length; i++) {
        let item = shopcart[i];
        for (let j = 0; j < data.length; j++) {
          let temp = data[j];
          if (item && temp) {
            if (item.productId == temp.productId && item.merchantBasicId == temp.merchantBasicId && item.productCount > 0) {
              item.productCount += temp.quantity;
              has = true;
              break;
            }
          }
          if (!has) {
            shopcart.push({
              productId: temp.productId,
              merchantBasicId: temp.merchantBasicId,
              productCount: temp.quantity
            });
          }
        }
      }
      state.shopcart = shopcart;
    }
    let updateGroup = [];
    for (let i = 0; i <= shopcart.length; i++) {
      let item = shopcart[i];
      if (item && item.productCount > 0) {
        updateGroup.push({
          "productId": item["productId"],
          "number": item["productCount"],
          "merchantBasicId": item["merchantBasicId"]
        });
      }
    }
    return fetch.api.shopCart.updateShoppingCart(updateGroup).then(data => {
      if (data.code == '200') {
        let tempArray = [];
        for (let i = 0; i < data.model.length; i++) {
          var item = data.model[i];
          tempArray.push({
            productId: item.productId,
            merchantBasicId: item.merchantBasicId,
            productCount: item.productCount
          });
        }
        state.shopcart = tempArray;
        dataHelp.setData(dataKey, JSON.stringify(state.shopcart));
      } else {
        Toast(data.message);
      }
    });
  }
}

export default {
  state,
  getters,
  actions
}
