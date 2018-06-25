<template>
  <div class="shop-car">
    <helmet title="购物车" :show-right='true' :right-text='actionText' :right-func='actionFuc'/>
    <div class="cart-login-tip" v-if="needLogin">
      <span>登录后将保存购物车商品</span>
      <span class="login-btn" @click="goLogin()">登录</span>
    </div>
    <div v-if="!isNullCart">
      <div class="shop-list" v-for="(m,i) in groupProduct" :key="i">
        <div class="conter-title">
          <div class="title-select">
            <checkbox :checked='merchantChange(m)' :action="merchantSelect" :result-value='m' />
          </div>
          <div class="title-size" v-text="m[0].merchantName"></div>
        </div>
        <div class="shopcart-conter">
          <div class="conter-prod-warp" v-for="(item,index) in m" :key="index">
            <p class="additional-message" v-show="item.isPromotionHit">
              <span>{{item.promotionTag}}</span>
              {{item.promotionInfo}}
            </p>
            <div class="prod-wrap display-box">
              <div class="prod-select prod-fl">
                <checkbox :checked='item.productSelect' :action='changeSelect' :result-value='item' />
              </div>
              <div class="prod-pic prod-fl">
                <a :href="'#/productDetil/'+item.productId+'/'+item.merchantBasicId">
                  <img :src="item.productImg" onerror="imgError(this);" />
                </a>
              </div>
              <div class="prod-right prod-fl">
                <div class="cont-name">
                  <a :href="'#/productDetil/'+item.productId+'/'+item.merchantBasicId">
                    {{item.productName}} 
                  </a>
                  <a class="spec">
                    规格：
                    {{item.productSpecifications}} 
                  </a>
                </div>
                <div class="cont-bottom">
                  <div class="cont-price">
                    ¥{{item.productPrice}}
                  </div>
                  <div class="treatment-input">
                    <a @click="cutProduct(item.productId,item.merchantBasicId)" >
                      <span class="num-not" :class="item.productCount>1?'num-cur':''" style="display: block;width: 100%;height: 100%;"></span>
                    </a>
                    <input class="num-input" type="number" name="number" v-model="item.productCount" readonly>
                    <a class="num-add" @click="addProduct(item.productId,item.merchantBasicId)"></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="shopcart-additional" v-if="hasSales(item.promotions)" @click="salesVisible(item.promotions,item.productId,item.merchantBasicId)">
              <span class="kind-label">
                促销
              </span>
              <span class="kind-item">
                {{item | sloganFined}}
              </span>
              <span class="kind-action">
                {{item | promotionFined}}个可选
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-empty" v-if="isNullCart">
      <div class="cart-ico">
        <i class="iconfont icon-shopcar"></i>
      </div> 
      <div class="empty-warm">购物车还是空的</div> 
      <a class="see-btn" href="#/">去看看</a>
    </div>
    <div class="set-height"></div>
    <div class="order-balance display-box">
        <div class="order-all-price box-flex">
            <div class="all-select">
              <checkbox :checked='selectAll' :action="selectAllFunc" />
            </div>
            <div class="all-select-size">全选</div>
            <div class="all-price-cont" v-if="!showDelete">
                <div class="all-price-top">
                    <span class="all-price-size">总计：</span>
                    <span class="all-price-sale">
                      ￥{{toTalPrice}}
                    </span>
                </div>
                <div class="all-price-bottom clearfix">
                  立减￥{{reductPrice}}
                </div>
            </div>
        </div>
        <a class="order-btn box-flex cur" v-if="!showDelete"
        @click="buyNow()" :class="orderBtnClass"> 
          去结算
        </a>
        <a class="order-btn box-flex delete" v-if="showDelete" @click="deleteProduct()"> 
          删除
        </a>
    </div>
    <!-- <nav-footer active='3' /> -->
    <sales :visible='salesVisibleType' :promotions='promotions' :promotions-id='promotionsId' :close='selesResult' />
  </div>
</template>

<script>
import helmet from "../../components/public/helmet";
import { Checklist, Toast, MessageBox } from "mint-ui";
import navFooter from "../../components/public/navFooter";
import checkbox from "../../controls/checkbox";
import shopCartMatch from "@/func/shopCartMatch";
import sales from "@/controls/sales";
import _ from "lodash";
const Object = require("core-js/library/es6/object");
export default {
  name: "shopCar",
  data() {
    return {
      actionText: "编辑",
      dataList: [],
      toTalPrice: "0.00",
      isNullCart: false,
      selectAll: true,
      showDelete: false,
      orderBtnClass: "order-btn-red",
      firstLoad: true,
      groupProduct: [],
      numCheck: false,
      salesVisibleType: false,
      promotions: [],
      promotionsId: "",
      currentProductId: "",
      currentMerchantBasicId: "",
      reductPrice: "0.00",
      needLogin: false
    };
  },
  filters: {
    sloganFined(item) {
      if (!item.promotionModel) {
        return "";
      }
      if (item.promotionModel.slogan) {
        return item.promotionModel.slogan;
      } else {
        return "";
      }
    },
    promotionFined(item) {
      if (!item.promotionModel) {
        return "";
      }
      if (item.promotionModel.promotionCount) {
        return item.promotionModel.promotionCount;
      } else {
        return "";
      }
    }
  },
  methods: {
    hasSales(obj) {
      return obj != null && obj;
    },
    salesVisible(promotionsList, productId, merchantBasicId) {
      this.promotionsId = shopCartMatch.findPromotionSelect(
        productId,
        merchantBasicId
      );
      this.currentProductId = productId;
      this.currentMerchantBasicId = merchantBasicId;
      this.promotions = promotionsList;
      this.salesVisibleType = !this.salesVisibleType;
    },
    selesResult(seles) {
      shopCartMatch.setPromotionSelect(
        this.promotions,
        seles,
        this.currentProductId,
        this.currentMerchantBasicId
      );
      this.productLoad();
    },
    merchantChange(array) {
      return shopCartMatch.merchantChange(array);
    },
    merchantSelect(array) {
      let selected = shopCartMatch.merchantChange(array);
      let result = shopCartMatch.merchantSelect(
        this.dataList,
        !selected,
        array[0].merchantBasicId
      );
      this.groupProduct = [];
      this.dataList = result;
      this.selectAllFunc();
    },
    buyNow() {
      let productList = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        if (item && item.productSelect) {
          productList.push({
            productId: item.productId,
            productCount: item.productCount,
            merchantBasicId: item.merchantBasicId,
            promotionId: shopCartMatch.findPromotionSelect(
              item.productId,
              item.merchantBasicId
            )
          });
        }
      }
      if (productList.length > 0) {
        this.$store.dispatch("setOrderAffirm", productList);
        this.$router.push("/order");
      }
    },
    actionFuc() {
      this.showDelete = !this.showDelete;
      if (this.showDelete) {
        this.actionText = "完成";
      } else {
        this.actionText = "编辑";
      }
    },
    deleteProduct() {
      MessageBox.confirm("确定执行此操作?").then(
        action => {
          let delGroup = [];
          let delList = [];
          for (let i = 0; i < this.dataList.length; i++) {
            let item = this.dataList[i];
            if (!item.productSelect) {
              delGroup.push(item);
            } else {
              delList.push(item);
            }
          }
          this.matchShopCartPrice(delGroup);
          this.actionFuc();
          for (let i = 0; i < this.dataList.length; i++) {
            let item = this.dataList[i];
            item.productSelect = true;
          }
          let jwt = this.$store.getters.jwt;
          if (jwt) {
            let o = this.$store.dispatch("updateShopCart", delGroup);
            o.then(data => {
              let list = shopCartMatch.productCountMatch(data);
              this.matchPrice(list);
            });
          } else {
            this.$store.dispatch("deleteProduct", delList);
            this.productLoad();
          }
        },
        () => {}
      );
    },
    selectAllFunc() {
      let selecteds = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        item.productSelect = !this.selectAll;
        if (item && item.productSelect) {
          selecteds.push(item.productId + item.merchantBasicId);
        }
      }
      this.selectAll = !this.selectAll;
      this.orderBtnClass =
        selecteds.length > 0 ? "order-btn-red" : "order-btn-gray";
      this.matchShopCartPrice(this.dataList);
    },
    selectJudge() {
      let selectLength = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        if (item.productSelect) {
          selectLength++;
        }
      }
      this.selectAll = selectLength == this.dataList.length;
    },
    changeSelect(productObj) {
      let selecteds = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        if (
          item.productId == productObj.productId &&
          item.merchantBasicId == productObj.merchantBasicId
        ) {
          item.productSelect = !productObj.productSelect;
          if (item && item.productSelect) {
            selecteds.push(item.productId);
          }
        }
      }
      this.orderBtnClass =
        selecteds.length > 0 ? "order-btn-red" : "order-btn-gray";
      this.matchShopCartPrice(this.dataList);
    },
    matchShopCartPrice(list) {
      let productList = [];
      for (let i = 0; i <= list.length; i++) {
        let item = list[i];
        if (item && item.productSelect) {
          productList.push({
            productId: item.productId,
            productCount: item.productCount,
            merchantBasicId: item.merchantBasicId,
            promotionFormId: shopCartMatch.findPromotionSelect(
              item.productId,
              item.merchantBasicId
            )
          });
        }
      }
      this.selectAll = productList.length == list.length;
      if (productList.length > 0) {
        this.api.shopCart.shoppingCartPrice(productList).then(data => {
          if (data.code == "200") {
            this.toTalPrice = data.model.totalPrice + "";
            this.reductPrice = data.model.reductPrice + "";
            this.dataList = list;
            this.isNullCart = this.dataList.length == 0;
          } else {
            Toast(data.message);
          }
        });
      } else {
        this.toTalPrice = "0.00";
      }
    },
    matchPrice(shopcartList) {
      let productList = [];
      let orgDataList = this.dataList;
      for (let i = 0; i < shopcartList.length; i++) {
        let item = shopcartList[i];
        if (item && item.productCount > 0) {
          if (orgDataList.length == 0) {
            productList.push({
              productId: item.productId,
              productCount: item.productCount,
              merchantBasicId: item.merchantBasicId,
              promotionFormId: shopCartMatch.findPromotionSelect(
                item.productId,
                item.merchantBasicId
              )
            });
          } else {
            for (let i = 0; i < orgDataList.length; i++) {
              var temp = orgDataList[i];
              if (
                item.productId == temp.productId &&
                temp.productSelect &&
                item.merchantBasicId == temp.merchantBasicId
              ) {
                productList.push({
                  productId: item.productId,
                  productCount: item.productCount,
                  merchantBasicId: item.merchantBasicId,
                  promotionFormId: shopCartMatch.findPromotionSelect(
                    item.productId,
                    item.merchantBasicId
                  )
                });
                break;
              }
            }
          }
        }
      }
      if (productList.length > 0) {
        this.api.shopCart
          .shoppingCartPrice(productList, this.firstLoad)
          .then(data => {
            if (data.code == "200") {
              this.toTalPrice = data.model.totalPrice + "";
              this.reductPrice = data.model.reductPrice + "";
              let priceList = data.model.priceList;
              let resultData = [];
              for (let j = 0; j < shopcartList.length; j++) {
                let jtem = shopcartList[j];
                let price = priceList.filter(item => {
                  if (jtem != null && jtem) {
                    if (
                      item.productId == jtem.productId &&
                      item.merchantBasicId == jtem.merchantBasicId
                    ) {
                      return item;
                    }
                  }
                });
                if (jtem != null && jtem) {
                  let selectProduct = true;
                  let orgData = orgDataList.filter(item => {
                    if (
                      jtem.productId == item.productId &&
                      jtem.merchantBasicId == item.merchantBasicId
                    ) {
                      selectProduct = item.productSelect;
                      return item;
                    }
                  });
                  let objItem = {};
                  if (price.length > 0) {
                    objItem = Object.assign(jtem, {
                      productPrice: price[0].productPrice,
                      productSelect: selectProduct,
                      promotionInfo: price[0].promotionInfo
                        ? price[0].promotionInfo
                        : "",
                      promotionTag: price[0].promotionTag
                        ? price[0].promotionTag
                        : "",
                      isPromotionHit: price[0].isPromotionHit
                    });
                    resultData.push(objItem);
                  } else if (orgData.length > 0) {
                    objItem = orgData[0];
                    resultData.push(objItem);
                  }
                }
              }
              this.selectJudge();
              this.dataList = [];
              this.dataList = resultData;
            } else {
              Toast(data.message);
            }
            this.isNullCart = this.dataList.length == 0;
            this.numCheck = false;
            this.firstLoad = false;
          });
      } else {
        this.isNullCart = true;
      }
    },
    productLoad() {
      let jwt = this.$store.getters.jwt;
      let shopcartList = [];
      if (jwt) {
        this.userShopCartMatch(shopcartList);
      } else {
        let stateShopCart = this.$store.getters.shopcart;
        let productIds = [];
        for (let i = 0; i < stateShopCart.length; i++) {
          let item = stateShopCart[i];
          if (item) {
            productIds.push({
              productId: item.productId,
              merchantBasicId: item.merchantBasicId
            });
          }
        }
        this.api.goods.product(productIds, this.firstLoad).then(data => {
          if (data.code == "200") {
            for (let i = 0; i < data.model.length; i++) {
              var item = data.model[i];
              stateShopCart.map(v => {
                if (
                  v.productId == item.productId &&
                  v.merchantBasicId == item.merchantBasicId &&
                  v.productCount > 0
                ) {
                  shopcartList.push({
                    productId: item.productId,
                    productCount: v.productCount,
                    merchantBasicId: item.merchantBasicId,
                    productName: item.productName,
                    productImg: item.productImg,
                    productSpecifications: item.productSpecifications,
                    merchantName: item.merchantName,
                    promotions: item.promotions,
                    promotionModel: shopCartMatch.promotionsMatch(
                      item.promotions,
                      item.productId,
                      item.merchantBasicId
                    )
                  });
                  return;
                }
              });
            }
            this.matchPrice(shopcartList);
          } else {
            Toast(data.message);
          }
        });
      }
    },
    userShopCartMatch(shopcartList) {
      let temporary = shopcartList;
      this.api.shopCart.shoppingCart(this.firstLoad).then(data => {
        if (data.code == "200") {
          shopcartList = data.model;
          if (this.firstLoad) {
            for (let i = 0; i < temporary.length; i++) {
              let item = temporary[i];
              let hasItem = false;
              for (let j = 0; j < shopcartList.length; j++) {
                let child = shopcartList[j];
                if (
                  child.productId == item.productId &&
                  item.merchantBasicId == child.merchantBasicId &&
                  item.productCount > 0 &&
                  child.productCount > 0
                ) {
                  child.productCount = item.productCount;
                  child.promotionModel = shopCartMatch.promotionsMatch(
                    child.promotions,
                    child.productId,
                    child.merchantBasicId
                  );
                  shopcartList[j] = child;
                  hasItem = true;
                  break;
                }
              }
              if (!hasItem) {
                shopcartList.push(item);
              }
            }
            let o = this.$store.dispatch("updateShopCart", shopcartList);
            o.then(data => {
              shopcartList = shopCartMatch.buildPromotion(shopcartList);
              this.matchPrice(shopcartList);
            });
          } else {
            shopcartList = shopCartMatch.buildPromotion(shopcartList);
            this.matchPrice(shopcartList);
          }
        } else {
          Toast(data.message);
        }
      });
    },
    cutProduct: _.throttle(
      function(productId, merchantBasicId) {
        if (this.numCheck) {
          return;
        }
        this.numCheck = true;
        let productObj = shopCartMatch.findProduct(
          this.dataList,
          productId,
          merchantBasicId
        );
        this.dataList.filter(item => {
          if (
            item.productId == productId &&
            item.merchantBasicId == merchantBasicId
          ) {
            item.productSelect = true;
          }
        });
        if (productObj) {
          let productCount = parseInt(productObj.productCount);
          if (productCount > 1) {
            productCount--;
            productObj.productCount = productCount;
            this.mapShopCart(productObj);
            this.selectJudge();
          } else {
            this.numCheck = false;
          }
        }
      },
      500,
      { trailing: false }
    ),
    addProduct: _.throttle(
      function(productId, merchantBasicId) {
        if (this.numCheck) {
          return;
        }
        this.numCheck = true;
        let productObj = shopCartMatch.findProduct(
          this.dataList,
          productId,
          merchantBasicId
        );
        if (productObj) {
          let productCount = parseInt(productObj.productCount);
          productCount++;
          productObj.productCount = productCount;
          this.dataList.filter(item => {
            if (
              item.productId == productId &&
              item.merchantBasicId == merchantBasicId
            ) {
              item.productSelect = true;
            }
          });
          this.mapShopCart(productObj);
          this.selectJudge();
        }
      },
      500,
      { trailing: false }
    ),
    mapShopCart(productObj) {
      let updateGroup = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        let upItem = {};
        if (item.productId == productObj.productId) {
          upItem = productObj;
        } else {
          upItem = item;
        }
        updateGroup.push({
          productId: upItem.productId,
          productCount: upItem.productCount,
          merchantBasicId: upItem.merchantBasicId
        });
      }
      let jwt = this.$store.getters.jwt;
      if (jwt) {
        let o = this.$store.dispatch("updateShopCart", updateGroup);
        o.then(data => {
          let list = shopCartMatch.productCountMatch(data);
          this.matchPrice(list);
        });
      } else {
        this.$store.dispatch("changeProductCount", productObj);
        this.productLoad();
      }
    },
    goLogin() {
      this.$router.push({ name: "login" });
    }
  },
  components: {
    helmet,
    mtChecklist: Checklist,
    navFooter,
    checkbox,
    sales
  },
  watch: {
    dataList(n) {
      let selecteds = [];
      for (let i = 0; i < n.length; i++) {
        if (n[i] && n[i].productSelect) {
          selecteds.push(n.productId);
        }
      }
      this.groupProduct = shopCartMatch.match(n);
      this.orderBtnClass =
        selecteds.length > 0 ? "order-btn-red" : "order-btn-gray";
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (!jwt) {
      this.needLogin = true;
    }
    this.productLoad();
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.mint-checkbox-label {
  display: none !important;
}
.shop-car {
  .shop-list {
    margin-bottom: pxToRem(10px);
  }
  .conter-title {
    width: 100%;
    height: pxToRem(100px);
    line-height: pxToRem(100px);
    border-bottom: solid 1px #eee;
    background-color: #fff;
    position: relative;
  }
  .title-select {
    width: pxToRem(92px);
    height: pxToRem(100px);
    float: left;
    background-size: pxToRem(36px);
    line-height: pxToRem(100px);
    text-align: center;
    position: relative;
  }
  .title-size {
    height: pxToRem(100px);
    float: left;
    font-size: pxToRem(32px);
  }

  .shopcart-conter {
    padding: 0 pxToRem(30px) 0 pxToRem(15px);
    background-color: #fff;
    margin-bottom: pxToRem(30px);
    overflow: hidden;
  }
  .conter-prod-warp {
    border-bottom: solid 1px #eee;
    position: relative;
  }
  .prod-fl {
    float: left;
  }
  .prod-wrap {
    padding: pxToRem(30px) 0;
    height: pxToRem(160px);
  }
  .prod-select {
    width: 9.4%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .prod-pic {
    width: 23.2%;
    height: 100%;
    border: solid 1px #eee;
    box-sizing: border-box;
    position: relative;
    a {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      top: 0;
      left: 0;
    }
    img {
      width: 99%;
      padding: 0;
      margin: 0;
      vertical-align: top;
    }
  }
  .prod-right {
    width: 67.4%;
    height: 100%;
    padding-left: pxToRem(20px);
    box-sizing: border-box;
    overflow: hidden;
    font-size: pxToRem(28px);
  }
  .cont-name {
    height: pxToRem(80px);
    line-height: pxToRem(40px);
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: pxToRem(15px);
    a {
      display: block;
      color: #000000;
    }
    .spec {
      font-size: pxToRem(20px);
      color: #999;
    }
  }
  .cont-bottom {
    width: 100%;
    height: pxToRem(100px);
    overflow: hidden;
  }
  .cont-price {
    color: #ff4040;
    float: left;
    margin-top: pxToRem(25px);
    font-family: arial;
  }
}

.treatment-input {
  width: 50%;
  overflow: hidden;
  border-top: solid 1px #000000;
  border-bottom: solid 1px #000000;
  text-align: center;
  float: right;
  height: pxToRem(50px);
  input,
  a {
    height: 100%;
    float: left;
    text-align: center;
    display: block;
    text-decoration: none;
    border-left: solid 1px #000000;
    border-right: solid 1px #000000;
  }
  a {
    width: 30.1%;
  }
  .num-input {
    width: 36.15%;
    font-size: pxToRem(32px);
    overflow: hidden;
    border: none;
  }

  .num-not {
    background: url(../../assets/reduce_not.png) no-repeat center;
    background-size: 100%;
    pointer-events: none;
  }
  .num-cur {
    background: url(../../assets/reduce.png) no-repeat center;
    background-size: 100%;
    pointer-events: none;
  }
  .num-add {
    background: url(../../assets/add.png) no-repeat center;
    background-size: 100%;
  }
}

.order-balance {
  width: 100%;
  height: pxToRem(130px);
  background: #fff;
  overflow: hidden;
  position: fixed;
  left: 0;
  // bottom: pxToRem(100px);
  bottom: 0;
  z-index: 6;
  box-sizing: border-box;
  overflow: hidden;
}

.order-all-price {
  width: 60%;
  height: pxToRem(120px);
  padding: pxToRem(20px);
  box-sizing: border-box;
  float: left;
}

.all-select {
  height: pxToRem(100px);
  width: pxToRem(50px);
  line-height: pxToRem(40px);
  float: left;
  text-align: center;
  position: relative;
}

.checkbox,
.checkbox-active {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.all-select-size {
  height: pxToRem(100px);
  line-height: pxToRem(100px);
  color: #888;
  float: left;
  font-size: pxToRem(32px);
}

.all-price-cont {
  float: left;
  padding-left: pxToRem(20px);
  overflow: hidden;
}

.all-price-top {
  margin-top: pxToRem(20px);
  display: flex;
}

.all-price-size {
  font-size: pxToRem(28px);
  color: #252525;
}
.all-price-sale {
  font-size: pxToRem(32px);
  color: #ff4040;
}

.all-price-bottom {
  height: pxToRem(50px);
  line-height: pxToRem(40px);
  font-size: pxToRem(22px);
  color: #999999;
}

.order-btn {
  width: 40%;
  height: 100%;
  line-height: pxToRem(140px);
  display: block;
  font-size: pxToRem(40px);
  color: #fff;
  text-align: center;
  float: right;
}

.order-btn-red {
  background-color: #ff4040;
}

.order-btn-gray {
  background-color: #999999;
}

.delete {
  @extend .order-btn;
  background-color: #26a2ff;
}

.cart-empty {
  height: pxToRem(400px);
  padding: pxToRem(160px);
  text-align: center;
}

.cart-ico {
  position: relative;
  width: pxToRem(368px);
  height: pxToRem(56px);
  display: inline-block;
  &::after {
    content: "";
    width: pxToRem(368px);
    height: 1px;
    display: inline-block;
    background: #ccc;
    position: absolute;
    top: pxToRem(36px);
    left: 0;
  }
}

.iconfont {
  font-size: pxToRem(50px);
  color: #f66;
  width: pxToRem(60px);
  height: pxToRem(60px);
  line-height: pxToRem(60px);
  padding-top: 0;
  padding-bottom: 0;
  font-size: pxToRem(32px);
  margin: 0.10666667rem auto 0;
  display: block;
  background-image: url(../../assets/foot-nav.png);
  background-repeat: no-repeat;
  background-size: pxToRem(900px) auto;
}

.icon-shopcar {
  background-position: pxToRem(-589px) pxToRem(-140px);
}

.empty-warm {
  font-size: pxToRem(34px);
  margin-top: pxToRem(33px);
  color: #999;
}

.see-btn {
  height: pxToRem(58px);
  line-height: pxToRem(58px);
  width: pxToRem(173px);
  cursor: pointer;
  border: 1px solid #26a2ff;
  color: #26a2ff;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: inline-block;
  margin-top: pxToRem(33px);
  font-size: pxToRem(30px);
  text-decoration: none;
}

.set-height {
  height: pxToRem(180px);
}

.additional-message {
  font-size: pxToRem(25px);
  height: pxToRem(60px);
  line-height: pxToRem(60px);
  border-bottom: 1px solid #eee;
  span {
    background-color: #f66;
    padding: 0 pxToRem(10px);
    padding-top: pxToRem(3px);
    display: initial;
    height: pxToRem(30px);
    line-height: pxToRem(35px);
    color: #fff;
    border-radius: pxToRem(10px);
    font-size: pxToRem(20px);
  }
}

.shopcart-additional {
  font-size: pxToRem(25px);
  background-color: #fef5f5;
  height: pxToRem(70px);
  line-height: pxToRem(70px);
  position: relative;
  margin-bottom: pxToRem(10px);
  width: 68%;
  margin-left: 32%;
  &::after {
    content: "";
    position: absolute;
    background-image: url(../../assets/down.png);
    background-size: 100%;
    background-position: center;
    width: pxToRem(25px);
    height: pxToRem(25px);
    right: pxToRem(2px);
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.kind-label {
  margin-left: pxToRem(10px);
}

.kind-item,
.kind-action {
  font-size: pxToRem(20px);
  color: #666666;
}
.kind-item {
  display: inline-block;
  width: 58%;
  margin-left: pxToRem(10px);
}

.cart-login-tip {
  background: #fff;
  margin-bottom: pxToRem(30px);
  text-align: center;
  padding: pxToRem(20px) pxToRem(30px);
  font-size: pxToRem(25px);
  color: #666;
}

.login-btn {
  padding: pxToRem(4px) pxToRem(18px);
  color: #fff;
  margin-left: pxToRem(30px);
  background: #61b1f4;
  border-radius: 8px;
}
</style>