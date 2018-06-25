<template>
<div class="order-item" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
  <div class="order-item-content" v-for="(item,index) in dataList" :key='index'>
    <div class="item-head" @click="goDeils(item.ordersCode)">
      <p class="order-name">{{item.ordersProductList[0].merchantName}}</p>
      <p class="order-type">{{item.ordersStateDesc}}</p>
    </div>
    <div class="item-body">
      <div class="product-item" v-for="(temp,idx) in item.ordersProductList" :key="idx" @click="goDeils(item.ordersCode)">
        <div class="item-single">
          <span class="info-image">
            <img :src="temp.productImg" />
          </span>
          <span class="info-name">
            <p class="name" v-text="temp.productName"></p>
            <p class="packing">规格：{{temp.specifications}}</p>
          </span>
          <span class="info-price">
            <p class="price">￥{{temp.productPrice}}</p>
            <p class="num">x{{temp.quantity}}</p>
          </span>
        </div>
      </div>
      <div class="item-bar">
        <span class="item-num">
          总共
          {{item.ordersProductList.length}}
          件商品
        </span>
        <span class="item-total">合计{{item.orderAmount}}</span>
      </div>
    </div>
    <div class="item-foot">
      <div class="action-bar">
        <button v-if="item.ordersState==10" @click="orderCancel(item.ordersCode)">取消订单</button>
        <button @click="payNow(item)" class="pay" v-if="item.ordersState==10">立即支付</button>
        <button class="buy" v-if="item.ordersState==200 || item.ordersState==30" @click="buyAgin(item.ordersProductList)">再次购买</button>
      </div>
    </div>
  </div>
  <div class="no-data" v-if="dataList.length==0">
    <img src="../../assets/no-data.png" />
    <p>暂无相关订单</p>
    <a href="#/home" class="btn">去首页看看吧</a>
  </div>
</div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
export default {
  props: ["type"],
  data() {
    return {
      dataList: [],
      pageIndex: 1
    };
  },
  methods: {
    loadMore() {
      // this.pageIndex++;
      // this.loadOrderData();
    },
    loadOrderData() {
      let search = {
        OrdersState: this.type,
        PageIndex: this.pageIndex,
        PageSize: 10
      };
      this.api.orderServer.ordersSearch(search).then(data => {
        if (data.code == "200") {
          this.dataList = [];
          this.dataList.push(...data.model);
        } else {
          Toast(data.message);
        }
      });
    },
    goDeils(ordersCode) {
      this.$router.push({ name: "userOrderItem", params: { ordersCode } });
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
    },
    payNow(obj) {
      this.$store.dispatch("saveOrderPay", obj);
      this.$router.push({ name: "orderPay" });
    },
    buyAgin(ordersProductList) {
      this.$store.dispatch("moreAddShopcart", ordersProductList).then(() => {
        this.$router.push({ name: "shopingCart" });
      });
    }
  },
  watch: {
    type(n) {
      this.pageIndex = 1;
      this.dataList = [];
      this.loadOrderData();
    }
  },
  created() {
    this.loadOrderData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";

.order-item {
  margin: pxToRem(20px) auto;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}

.order-item-content {
  background: #fff;
  margin-bottom: pxToRem(30px);
}

.item-head {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: pxToRem(80px);
  line-height: pxToRem(80px);
  padding: 0 pxToRem(20px);
  color: #555;
}

.order-name {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding-right: pxToRem(20px);
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: pxToRem(25px);
}

.order-type {
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  text-align: right;
  color: #ff5252;
  font-size: pxToRem(25px);
}

.item-body {
  color: #555;
}

.product-item {
  padding: pxToRem(20px);
  position: relative;
  overflow: hidden;
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

.info-name {
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  padding: 0 pxToRem(10px);
  display: inline-block;
  width: 100%;
  .name {
    margin-bottom: pxToRem(10px);
    font-size: pxToRem(23px);
    line-height: pxToRem(28px);
    color: #555;
    display: block;
  }
  .packing {
    font-size: pxToRem(23px);
    margin-bottom: pxToRem(10px);
    word-wrap: break-word;
    word-break: break-all;
    color: #555;
  }
  .type {
    background: #06a6f8;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    padding: pxToRem(5px) pxToRem(12px);
    font-size: pxToRem(24px);
    color: #fff;
  }
}
.info-price {
  flex: 0 0 pxToRem(120px);
  display: inline-block;
  text-align: right;
  color: #555;
  p {
    margin-bottom: pxToRem(10px);
    font-size: pxToRem(25px);
  }
  .num {
    font-size: pxToRem(22px);
  }
}

.item-bar {
  background: #fff;
  border-top: 1px solid #e3e3e3;
  color: #555;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: pxToRem(80px);
  line-height: pxToRem(80px);
  padding: 0 pxToRem(20px);
  font-size: pxToRem(25px);
  .item-num {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .item-total {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    text-align: right;
  }
}

.action-bar {
  height: pxToRem(90px);
  background: #fff;
  border-top: 1px solid #e3e3e3;
  width: 100%;
  text-align: right;
  line-height: pxToRem(90px);
  button {
    font-size: pxToRem(25px);
    border: 1px solid #e3e3e3;
    padding: pxToRem(10px) pxToRem(10px);
    border-radius: 4px;
    background-color: #fff;
    margin-right: pxToRem(20px);
  }
  .pay {
    background-color: #06a6f8;
    color: #fff;
  }
  .buy {
    background-color: #f19325;
    color: #fff;
  }
}

.no-data {
  text-align: center;
  padding: pxToRem(150px) 0;
  font-size: pxToRem(30px);
  p {
    line-height: pxToRem(40px);
  }
  .btn {
    display: inline-block;
    margin: pxToRem(10px);
    padding: pxToRem(16px) pxToRem(20px);
    background: #77c4f4;
    color: #fff;
  }
  img {
    width: pxToRem(120px);
  }
}
</style>
