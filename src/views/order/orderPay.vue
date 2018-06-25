<template>
  <div class="order-pay">
    <helmet title="确认支付" :show-right="true" />
    <div class="pay-total">
      <p class="total-contain">
        合计金额:
        <span class="total">￥{{orderModel.orderAmountPayable}}</span>
      </p>
    </div>
    <section class="order-list">
      <div  class="order-item">
        <p class="order-header">
          订单号：{{orderModel.ordersCode}}
        </p>
        <p class="order-footer">
          小计:
          <span>￥{{orderModel.orderAmount}}</span>
        </p>
      </div>
    </section>

    <div class="pay-type">
      <p class="pay-header">选择支付方式：</p>
      <label class="type-item" for="alipay" v-for="(item,index) in payList" :key="index">
        <span class="icon-aliPay" v-text="item.name"></span>
        <span class="radio-controls radio-input">
          <input name="pay" id="alipay" type="radio" :value="item.type" v-model="payType" />
          <span class="radio-core"></span>
        </span>
      </label>
    </div>
    <div class="pay-btn">
        <button @click="goPay()">确认支付</button>
    </div>
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import { Toast } from "mint-ui";
import load from "@/components/load/index";
export default {
  name: "orderPay",
  data() {
    return {
      payList: [],
      orderModel: {},
      payType: 0
    };
  },
  methods: {
    goPay() {
      if (this.payType == 0) {
        Toast("请选择支付方式！");
        return;
      }
      if (!this.orderModel.ordersCode) {
        Toast("订单编号不能为空！");
        return;
      }
      let send = {
        returnUrl:
          process.env.NODE_ENV == "development"
            ? "http://localhost:8081/index.html#/userOrder"
            : "http://m.yaojushi.com/#/userOrder",
        ordersCode: this.orderModel.ordersCode,
        paymentType: this.payType
      };
      this.api.orderServer.requestOrderPay(send).then(data => {
        if (data.code == "200") {
          load.show();
          const div = document.createElement("div");
          div.style.display = "none";
          div.innerHTML = data.model;
          document.body.appendChild(div);
          document.forms.alipaysubmit.submit();
          load.hide();
        } else {
          Toast(data.message);
        }
      });
    }
  },
  components: {
    helmet
  },
  created() {
    this.api.order.paymentType().then(data => {
      if (data.code == "200") {
        this.payList = data.model;
        this.payType = this.payList[0].type;
      } else {
        Toast(data.message);
      }
    });
    this.orderModel = this.$store.getters.orderPay;
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.order-pay {
  font-size: pxToRem(24px);
}
.pay-total {
  padding: pxToRem(20px) 0;
  .total-contain {
    font-size: pxToRem(25px);
    padding: 0 pxToRem(30px);
    height: pxToRem(70px);
    line-height: pxToRem(70px);
    background: #fff;
    color: #555;
    border-bottom: 1px solid #eee;
  }
  .total {
    color: #ff4e4e;
    padding-right: pxToRem(5px);
  }
}

.order-list {
  color: #555;
  .order-item {
    background: #fff;
    margin-bottom: pxToRem(20px);
    border-bottom: 1px solid #eee;
  }
  .order-header {
    padding: 0 pxToRem(30px);
    height: pxToRem(70px);
    line-height: pxToRem(70px);
    border-bottom: 1px solid #eee;
  }
  .order-footer {
    padding: 0 pxToRem(30px);
    height: pxToRem(70px);
    line-height: pxToRem(70px);
  }
}

.pay-type {
  overflow: hidden;
  background: #fff;
  .pay-header {
    padding: 0 pxToRem(30px);
    height: pxToRem(60px);
    line-height: pxToRem(60px);
    border-bottom: 1px solid #eee;
  }
  .type-item {
    border-bottom: 1px solid #eee;
    height: pxToRem(70px);
    line-height: pxToRem(70px);
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-left: pxToRem(28px);
    cursor: pointer;
    display: block;
    position: relative;
  }
  .icon {
    background-repeat: no-repeat;
    background-size: pxToRem(35px) 100%;
    background-position: center left;
    padding-left: pxToRem(40px);
  }
  .icon-aliPay {
    @extend .icon;
    background-image: url(../../assets/Alipay.jpg);
    font-size: pxToRem(28px);
  }
  .icon-wx {
    @extend .icon;
    background-image: url(../../assets/wx.jpg);
  }
  .radio-input {
    cursor: pointer;
    color: #39f;
    right: pxToRem(10px);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.pay-btn {
  margin-bottom: pxToRem(20px);
  padding: pxToRem(50px) pxToRem(30px);
  button {
    width: 100%;
    padding: pxToRem(20px);
    background: #ff4e4e;
    color: #fff;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    border: none;
    font-size: pxToRem(24px);
  }
}
</style>


