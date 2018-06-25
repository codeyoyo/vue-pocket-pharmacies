<template>
  <div class="order-item">
    <helmet :show-right='true' title="订单详情" />
    <section class="code-and-address">
        <div class="code-row">
            <span class="code">
                订单号：
                <i>{{orderDetail.ordersCode}}</i>
            </span>
            <span class="type">{{orderDetail.ordersStateDesc}}</span>
        </div>
        <div class="address-row">
            <div class="person">
                <span>
                    收货人：{{addressObj.consignee}}
                </span>
                <span>{{addressObj.mobilePhone}}</span>
            </div>
            <div class="address">
                <span class="tip">地址</span>
                <span class="text">{{addressObj.province}}{{addressObj.city}}{{addressObj.area}}{{addressObj.deliveryAddress}}</span>
            </div>
        </div>
    </section>

    <section class="products">
        <div class="list">
            <div class="product-item" v-for="(item,index) in orderDetail.ordersProductList" :key="index" @click="goProduct(item)">
              <div class="item-single">
                <a class="info-image">
                  <img :src="item.productImg" alt="">
                </a>
                <span class="info-name">
                  <a class="name">
                    {{item.productName}}
                  </a>
                  <p class="packing">
                    规格：{{item.specifications}}
                  </p>
                </span>
                <span class="info-price">
                    <p class="price">￥{{item.productPrice}}</p>
                    <p class="num">x{{item.quantity}}</p>
                </span>
              </div>
            </div>
        </div>
    </section>

    <section class="order-info">
        <ul class="info-type">
            <li class="info-item">
                <span class="item-label">支付方式</span>
                <span class="item-text">{{orderDetail.paymentTypeDesc}}</span>
            </li>
            <!-- <li class="info-item">
                <span class="item-label">发票抬头</span>
                <span class="item-text">不开发票</span>
            </li> -->
        </ul>
        <ul class="info-time">
            <li class="info-item">
                <span class="item-label">生成时间</span>
                <span class="item-text">{{orderDetail.orderTime | filtersDate}}</span>
            </li>
            <!-- <li class="info-item">
                <span class="item-label">取消时间</span>
                <span class="item-text">2018-1-26 22:11</span>
            </li> -->
        </ul>
        <div class="order-total">
            <div class="total-item">
                <span class="item-label">实付款：</span>
                <span class="item-text">￥{{orderDetail.orderAmountPayable}}</span>
            </div>
            <div class="time-item number">
                <span class="item-label">数量：</span>
                <span class="item-text">x {{ordersProductCount}}</span>
            </div>
        </div>
    </section>

    <div class="detail-height"></div>
    <div class="detail-bar">
      <button v-if="orderDetail.ordersState==10" @click="orderCancel(orderDetail.ordersCode)">取消订单</button>
      <button v-if="orderDetail.ordersState>=10" @click="routerGo('tracking')">订单跟踪</button>
      <!-- <button v-if="orderDetail.ordersState==30 && orderDetail.paymentType==2" @click="routerGo('drawback')">申请退款</button>
      <button v-if="false" @click="routerGo('checkRefund')">查看退款</button> -->
      <button v-if="orderDetail.ordersState==200" @click="buyAgin(orderDetail.ordersProductList)">再次购买</button> 
      <button v-if="orderDetail.ordersState==10" @click="payNow()" class="pay">立即支付</button>
    </div>
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import { Toast } from "mint-ui";
export default {
  components: {
    helmet
  },
  data() {
    return {
      orderDetail: {},
      addressObj: {},
      ordersProductCount: 0
    };
  },
  methods: {
    routerGo(routerName) {
      this.$router.push({
        name: routerName,
        params: {
          ordersCode: this.orderDetail.ordersCode
        }
      });
    },
    buyAgin(ordersProductList) {
      this.$store.dispatch("moreAddShopcart", ordersProductList).then(() => {
        this.$router.push({
          name: "shopingCart",
          params: {
            productId: obj.productId,
            merchantId: obj.merchantBasicId
          }
        });
      });
    },
    payNow() {
      this.$store.dispatch("saveOrderPay", this.orderDetail.ordersProductList);
      this.$router.push({ name: "orderPay" });
    },
    matchCount(array) {
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        count += item.quantity;
      }
      return count;
    },
    goProduct(obj) {
      this.$router.push({
        name: "productDetil",
        params: {
          productId: obj.productId,
          merchantId: obj.merchantBasicId
        }
      });
    },
    orderCancel(orderCode) {
      MessageBox.confirm("确定执行此操作?").then(
        action => {
          this.api.orderServer.orderCancel(orderCode).then(data => {
            if (data.code == "200") {
              this.loadOrderData();
            } else {
              Toast(data.message);
            }
          });
        },
        () => {}
      );
    }
  },
  filters: {
    filtersDate(value) {
      if (!value || value == "") {
        return "";
      }
      let d = new Date(value);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    }
  },
  created() {
    let ordersCode = this.$route.params.ordersCode;
    this.api.orderServer.ordersDetails(ordersCode).then(data => {
      if (data.code == 200) {
        let model = data.model;
        this.orderDetail = model;
        this.ordersProductCount = this.matchCount(model.ordersProductList);
        this.api.order.getOneDeliveryAddress(model.deliveryId).then(result => {
          if (result.code == 200) {
            this.addressObj = result.model;
          } else {
            Toast(result.message);
          }
        });
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";

.code-and-address {
  font-size: pxToRem(25px);
}

.code-row {
  display: flex;
  background: #fff;
  margin-bottom: pxToRem(20px);
  padding: pxToRem(30px) pxToRem(20px);
  border-bottom: 1px solid #e3e3e3;
}

.code {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  i {
    font-style: normal;
    color: #555;
  }
}

.type {
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  color: #ff6464;
}

.address-row {
  background: #fffbf2;
  margin-bottom: pxToRem(20px);
  padding: pxToRem(30px) pxToRem(20px);
  border-bottom: 3px solid #e3e3e3;
  border-top: 3px solid transparent;
  border-image: url("../../assets/link.png")10 10 round;
  font-size: pxToRem(28px);
}

.person {
  margin-bottom: pxToRem(20px);
  font-weight: 700;
}

.address {
  color: #555;
  .tip {
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
    background: #bc6464;
    color: #fff;
    height: pxToRem(50px);
    line-height: pxToRem(50px);
    padding: 0 pxToRem(5px);
  }
}

.products {
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: pxToRem(20px);
}

.product-item {
  padding: pxToRem(20px);
  position: relative;
  overflow: hidden;
  .type {
    background: #06a6f8;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    padding: 0 pxToRem(12px);
    font-size: pxToRem(24px);
    color: #fff;
  }
}

.item-single {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.info-image {
  flex: 0 0 pxToRem(116px);
  display: inline-block;
  width: pxToRem(116px);
  height: pxToRem(116px);
  border: 1px solid #e3e3e3;
  img {
    width: 100%;
  }
}

.name {
  margin-bottom: pxToRem(10px);
  font-size: pxToRem(23px);
  line-height: pxToRem(18px);
  color: #555;
  display: block;
}

.packing {
  font-size: pxToRem(22px);
  margin-bottom: pxToRem(10px);
  word-wrap: break-word;
  word-break: break-all;
}

.info-name {
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  padding: 0 pxToRem(10px);
  display: inline-block;
  width: 100%;
  a {
    margin-top: pxToRem(10px);
  }
}

.info-price {
  flex: 0 0 pxToRem(120px);
  display: inline-block;
  text-align: right;
  color: #555;
  font-size: pxToRem(25px);
  p {
    margin-top: pxToRem(10px);
  }
}

.order-info {
  margin-bottom: pxToRem(20px);
  font-size: pxToRem(25px);
}

.info-type {
  margin-bottom: pxToRem(20px);
  border-bottom: 1px solid #e3e3e3;
}

.info-item {
  border-top: 1px solid #e3e3e3;
  background: #fff;
  padding: 0 pxToRem(20px);
  display: flex;
  color: #333;
  height: pxToRem(80px);
  line-height: pxToRem(80px);
}

.item-label {
  flex: 0 1 pxToRem(200px);
}

.item-text {
  flex: 1 auto;
  text-align: right;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.order-total {
  margin-top: pxToRem(30px);
  padding: pxToRem(20px);
  text-align: right;
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
  font-size: pxToRem(28px);
}

.total-item {
  margin-bottom: pxToRem(10px);
}

.detail-height {
  height: pxToRem(100px);
}

.detail-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  height: pxToRem(100px);
  line-height: pxToRem(100px);
  text-align: right;
  background-color: #fff;

  button {
    height: pxToRem(60px);
    margin-right: pxToRem(20px);
    border: 1px solid #e3e3e3;
    padding: 0 pxToRem(10px);
    font-size: pxToRem(30px);
    border-radius: pxToRem(5px);
    background: #fff;
    &:last-child {
      background: #ff6464;
      color: #fff;
    }
  }
}
</style>