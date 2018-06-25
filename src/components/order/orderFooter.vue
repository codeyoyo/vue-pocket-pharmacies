<template>
  <div class="order-footer">
    <!-- <div class="order-tip" style="display: block;" v-show="addressShow">
        <span class="order-tip-text">
          地址：{{model.province}}{{model.area}}{{model.city}}{{model.deliveryAddress}}
        </span>
    </div> -->
    <div class="order-bar">
        <div class="order-bar-text">
          合计：
          <span class="total-price">
          ￥<a v-text="price"></a>
          </span>
        </div>
        <a class="order-bar-btn" @click="orderSubmit()">
          提交订单
        </a>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["totalPrice"],
  data() {
    return {
      price: 0,
      model: {},
      addressShow: false
    };
  },
  methods: {
    orderSubmit() {
      let productList = this.$store.getters.orderAffirm;
      if (productList.length == 0) {
        Toast("您没有任何商品！");
        return;
      }
      if (!this.model.regionId) {
        Toast("请求填写收货地址！");
        return;
      }
      let ordersList = [];
      for (let i = 0; i < productList.length; i++) {
        let item = productList[i];
        ordersList.push({
          productId: item.productId,
          quantity: item.productCount,
          merchantBasicId: item.merchantBasicId,
          isGroup: true,
          promotionId: item.promotionId,
          promotionFormId: item.promotionId
        });
      }
      let invoice = this.$store.getters.invoice;
      let data = {
        paymentType: this.$store.getters.payType, //付款方式 1、货到付款，2、款到发货
        deliveryType: 1, //配送方式
        invoiceType: invoice.invoiceType, //发票类型0-无、1-电子发票、2-纸质发票
        invoiceTitleType: invoice.invoiceTitleType, //发票抬头类型 1-个人、2-单位
        taxpayerId: invoice.taxpayerId, //纳税人识别号
        invoiceContentType: invoice.invoiceContentType, //发票内容类型
        invoiceReceiveMail: invoice.invoiceReceiveMail,
        deliveryId: this.model.id, //收货人信息Id
        regionId: this.model.regionId, //地区编码Id
        remark: this.$store.getters.orderRemark,
        ordersList: ordersList
      };
      this.api.orderServer.ordersAdd(data).then(result => {
        if (result.code == "200") {
          this.$store.dispatch("deleteProduct", productList);
          this.$store.dispatch("removeOrderAffirm");
          if (data.paymentType == 1) {
            this.$router.push({ name: "orderEnd" });
            this.$store.dispatch("saveOrderEnd", result.model);
          } else {
            this.$router.push({ name: "orderPay" });
            this.$store.dispatch("saveOrderPay", result.model);
          }
        } else {
          Toast(result.message);
        }
      });
    }
  },
  watch: {
    totalPrice(n) {
      this.price = n;
    }
  },
  created() {
    if (this.totalPrice) {
      this.price = this.totalPrice;
    }
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.addressShow = true;
      this.api.order.defaultAddress().then(data => {
        if (data.code == "200") {
          this.model = data.model;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.order-footer {
  width: 100%;
  height: pxToRem(100px);
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 9;
}

.order-tip {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: pxToRem(36px);
  line-height: pxToRem(36px);
  font-size: pxToRem(22px);
  position: absolute;
  top: pxToRem(-36px);
  width: 100%;
}

.order-tip-text {
  width: 90%;
  text-align: center;
  display: block;
  margin: 0 auto;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.order-bar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
}

.order-bar-text {
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  height: 100%;
  line-height: pxToRem(100px);
  padding: 0 pxToRem(20px);
  color: #333;
  font-size: pxToRem(28px);
  border-top: 1px solid #e5e5e5;
}

.total-price {
  color: #ff6464;
}

.order-bar-btn {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 1;
  -ms-flex: 0 0 1;
  flex: 0 0 1;
  background: #26a2ff;
  line-height: pxToRem(100px);
  text-align: center;
  color: #fff;
  font-size: pxToRem(26px);
  padding: 0 pxToRem(30px);
  border: none;
}
</style>


