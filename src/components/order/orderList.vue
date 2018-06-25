<template>
  <div class="order-list">
    <div class="order-item" v-for="(m,i) in productGroup" :key="i">
      <div class="order-title">
        <span class="order-title-text" v-text="m[0].merchantName"></span>
      </div>
      <div class="order-contain" v-for="(item,index) in m" :key="index">
        <!-- <P class="promotion-row" v-if="item.promotionTag!='' && item.promotionInfo!=''">
          <span>{{item.promotionTag}}</span>
          {{item.promotionInfo}}
        </P> -->
        <dl>
          <dd class="order-body">
            <div class="order-img">
            <img :src="item.productImg"  onerror="imgError(this);" /></div>
            <div class="order-info">
            <a class="order-info-name" v-text="item.productName"></a>
            <p class="order-info-spec">
              规格：{{item.productSpecifications}}
            </p>
            <p class="order-info-price">￥{{item.productPrice}}
              <span class="info-number">
                x{{item.productCount}}
              </span>
            </p>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="order-item">
      <a class="order-title" href="#/invoice">
        <span class="order-title-text">发票信息</span>
        <span class="order-transport">
          <i class="item-icon icon icon-right"></i>
        </span>
      </a>
      <div class="order-contain">
        <textarea type="text" placeholder="备注" maxlength="60" v-model="orderRemark"></textarea>
      </div>
    </div>

    <div class="order-item">
      <a class="order-title">
        <span class="order-title-text">支付方式</span>
      </a>
      <div class="order-contain">
        <div class="radio-pay">
          <mt-radio
            v-model="payEnum"
            :options="payType">
          </mt-radio>
        </div>
      </div>
    </div>

    <div class="order-item">
      <div class="order-title">
        <span class="order-title-text">商品金额</span>
        <span class="order-totalPrice">
          ￥{{productAmount}}
        </span>
      </div>
      <div class="order-contain">
        <dd class="contain-item">
          <span>促销优惠</span>
          <p class="ships">已优惠￥{{discountPrice}}</p>
        </dd>
      </div>
      <div class="order-contain">
        <dd class="contain-item">
          <span>运费</span>
          <p class="ships">￥{{freight}}</p>
        </dd>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import shopCartMatch from "@/func/shopCartMatch";
const Object = require("core-js/library/es6/object");
export default {
  props: ["func"],
  data() {
    return {
      dataList: [],
      orderRemark: "",
      payEnum: "2",
      payType: [
        {
          label: "货到付款",
          value: "1"
        },
        {
          label: "在线支付",
          value: "2"
        }
      ],
      productGroup: [],
      productAmount: 0,
      freight: 0,
      discountPrice: 0
    };
  },
  watch: {
    orderRemark(n) {
      this.$store.dispatch("saveOrderRemark", n);
    },
    payEnum(n) {
      this.$store.dispatch("savePayType", n);
    },
    dataList(n) {
      this.productGroup = shopCartMatch.match(n);
    }
  },
  methods: {
    dataBuild(goodsList) {
      let productList = [];
      for (let i = 0; i < goodsList.length; i++) {
        let item = goodsList[i];
        if (item) {
          productList.push({
            productId: item.productId,
            quantity: item.productCount,
            productCount: item.productCount,
            merchantBasicId: item.merchantBasicId,
            isGroup: true,
            promotionId: item.promotionId,
            promotionFormId: item.promotionId
          });
        }
      }
      this.api.orderServer.orderPriceCalculation(productList).then(data => {
        if (data.code == "200") {
          let obj = data.model;
          this.productAmount = obj.productAmount;
          this.freight = obj.transportCosts;
          this.discountPrice = obj.discountPrice;
          this.func && this.func(obj.orderAmountPayable);
        } else {
          Toast(data.message);
        }
      });
      this.api.shopCart.shoppingCartPrice(productList).then(data => {
        if (data.code == "200") {
          for (let i = 0; i < data.model.priceList.length; i++) {
            let item = data.model.priceList[i];
            if (item) {
              let model = goodsList.filter(m => {
                if (
                  m.productId == item.productId &&
                  m.merchantBasicId == item.merchantBasicId
                ) {
                  return m;
                }
              });
              if (model.length > 0) {
                this.dataList.push(Object.assign(item, model[0]));
              }
            }
          }
        } else {
          Toast(data.message);
        }
      });
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      let productList = this.$store.getters.orderAffirm;
      if (productList.length == 0) {
        this.$router.push({ name: "home" });
        return;
      }
      let productIds = [];
      for (let i = 0; i < productList.length; i++) {
        let item = productList[i];
        productIds.push({
          productId: item.productId,
          merchantBasicId: item.merchantBasicId
        });
      }
      let goodsList = [];
      this.api.goods.product(productIds).then(data => {
        if (data.code == "200") {
          for (let i = 0; i < data.model.length; i++) {
            let item = data.model[i];
            let obj = productList.filter(m => {
              if (
                m.productId == item.productId &&
                m.merchantBasicId == item.merchantBasicId
              ) {
                return m;
              }
            });
            if (obj.length > 0) {
              let assgin = Object.assign(item, obj[0]);
              goodsList.push(assgin);
            }
          }
          this.dataBuild(goodsList);
        } else {
          Toast(data.message);
        }
      });
      this.orderRemark = this.$store.getters.orderRemark;
      this.$store.dispatch("savePayType", this.payEnum);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.order-list {
  margin-top: pxToRem(30px);
  font-size: pxToRem(25px);
  margin-bottom: pxToRem(150px);
}

.order-item {
  margin-top: pxToRem(30px);
}

.order-title {
  border-bottom: none;
  overflow: hidden;
  padding: 0 pxToRem(20px);
  font-size: pxToRem(25px);
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  display: block;
  color: #000;
}

.margin-f {
  margin-top: pxToRem(-2px);
}

.order-title-text {
  overflow: hidden;
  display: inline-block;
  width: 66%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: pxToRem(28px);
  height: pxToRem(65px);
  line-height: pxToRem(65px);
}

.order-transport {
  font-size: pxToRem(22px);
  color: #999;
  float: right;
  height: pxToRem(65px);
  line-height: pxToRem(65px);
}

.order-totalPrice {
  float: right;
  font-size: pxToRem(32px);
  color: #ff6464;
  height: pxToRem(65px);
  line-height: pxToRem(65px);
}

.order-contain {
  background-color: #eee;
  border-top: 1px solid #e5e5e5;
  overflow: hidden;
  textarea {
    background-color: #fff;
    width: 100%;
    border: none;
    height: pxToRem(100px);
    line-height: pxToRem(100px);
    font-size: pxToRem(28px);
    outline: none;
  }
  .radio-pay {
    overflow: hidden;
    width: 100%;
    text-align: center;
    padding: pxToRem(20px) 0;
    background-color: #fff;
    padding-left: 12%;
  }
  .contain-item {
    font-size: pxToRem(24px);
    color: #999;
    background-color: #fff;
    height: pxToRem(50px);
    line-height: pxToRem(50px);
    padding-left: pxToRem(18px);
  }
  .ships {
    float: right;
    color: #ff6464;
    font-size: pxToRem(22px);
    padding-right: pxToRem(20px);
  }
}
.order-body {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: pxToRem(20px);
  position: relative;
  background: #f5f5f5;
}

.order-img {
  flex: 0 0 pxToRem(116px);
  width: pxToRem(116px);
  height: pxToRem(116px);
  padding: pxToRem(10px);
  border: 1px solid #e5e5e5;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}

.order-info {
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  padding-left: pxToRem(10px);
}

.order-info-name {
  line-height: pxToRem(35px);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #666;
}

.order-info-spec {
  color: #999;
  font-size: pxToRem(25px);
  height: pxToRem(50px);
  line-height: pxToRem(50px);
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-info-price {
  color: #ff6464;
  font-size: pxToRem(25px);
  text-align: left;
  span {
    color: #999;
    float: right;
  }
}

.promotion-row {
  padding-left: pxToRem(15px);
  font-size: pxToRem(25px);
  height: pxToRem(40px);
  line-height: pxToRem(40px);
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
</style>


