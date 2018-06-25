<template>
  <div class="order-pay">
    <helmet title="确认支付" :show-right="true" />
    <div class="end-content">
      <div class="success-icon">
      </div>
      <div class="order-message">
        <div class="order-content">
          <p>
            支付方式：
            <span>{{orderModel.paymentTypeDesc}}</span>
          </p>
          <p>
            订单金额：
            <span>￥{{orderModel.orderAmountPayableSum}}</span>
          </p>
        </div>
      </div>
      <div class="look-order">
        <button @click="goPay()">查看订单</button>
      </div>
    </div>
    <div class="footer-box">
      <foot-box />
    </div>
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import footBox from "@/components/public/footer";
import { Toast } from "mint-ui";
export default {
  name: "orderPay",
  data() {
    return {
      orderModel: {}
    };
  },
  methods: {
    goPay() {
      this.$router.push({ name: "userOrder" });
    }
  },
  components: {
    helmet,
    footBox
  },
  created() {
    this.orderModel = this.$store.getters.ordreEnd;
  },
  mounted() {
    // let inter = setInterval(() => {
    //   this.reciprocal--;
    //   if (this.reciprocal <= 0) {
    //     clearInterval(inter);
    //     this.$router.push({ name: "userOrder" });
    //   }
    // }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.end-content {
  background-color: #fff;
  overflow: hidden;
}

.success-icon {
  background-image: url("../../assets/sprite_success.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  float: left;
  width: 30%;
  height: pxToRem(250px);
}

.order-message {
  float: left;
  width: 65%;
  font-size: pxToRem(30px);
  position: relative;
}

.order-content {
  margin-top: 15%;
  margin-left: pxToRem(30px);
  p {
    margin-top: pxToRem(10px);
    span {
      color: red;
    }
  }
}

.look-order {
  margin-top: pxToRem(20px);
  text-align: center;
  margin-bottom: pxToRem(20px);
  button {
    height: pxToRem(50px);
    width: 80%;
    border: none;
    color: #fff;
    font-size: pxToRem(28px);
    background-color: #26a2ff;
    border-radius: 5px;
  }
}

.footer-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>


