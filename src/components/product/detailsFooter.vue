<template>
  <div class="details-footer">
    <div class="clear-height"></div>
    <div class="footer-box">
      <a class="tel-phone">电话咨询</a>
      <a class="shop-cart" href="#/shopingCart">
          购物车<span v-show="carNumShow" class="cart-num"></span>
      </a>
      <div class="buy-btn" v-show="!showPrescription">
        <a class="add-cart" @click="addCar()">加入购物车</a>
        <a @click="buyNow()" class="buy-now">立即购买</a>
      </div>
      <div class="buy-btn" v-show="showPrescription">
        <a href="tel:076912345678" class="use-now">用药咨询</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
function buyAnimation() {
  let buy = document.getElementById("buyProduct");
  if (buy) {
    buy.setAttribute("class", "car-animal");
    setTimeout(() => {
      buy.setAttribute("class", "hide");
    }, 1500);
  }
}
export default {
  props: ["productNum", "promotionId", "isPrescription"],
  data() {
    return {
      carNumShow: false,
      productInfo: {
        productId: "",
        productCount: 0,
        merchantBasicId: ""
      },
      promotions: "",
      showPrescription: false
    };
  },
  watch: {
    productNum(n) {
      this.productInfo.productCount = n;
    },
    promotionId(n) {
      this.promotions = n;
    },
    isPrescription(n) {
      this.showPrescription = n;
    }
  },
  methods: {
    addCar() {
      let productError = this.$store.getters.productError;
      if (productError > 0) {
        Toast("商品信息异常无法进行购买！");
        return;
      }
      buyAnimation();
      this.productInfo.productCount = this.productNum;
      this.$store.dispatch("addshopcart", this.productInfo);
      let array = this.$store.getters.shopcart;
      this.carNumShow = array.length > 0;
    },
    buyNow() {
      let productError = this.$store.getters.productError;
      if (productError > 0) {
        Toast("商品信息异常无法进行购买！");
        return;
      }
      if (this.productInfo.productCount <= 0) {
        Toast("商品数量不能小于等于0");
        return;
      }
      let productList = [];
      productList.push({
        productId: this.productInfo.productId,
        productCount: this.productInfo.productCount,
        merchantBasicId: this.productInfo.merchantBasicId,
        promotionId: this.promotions
      });
      this.$store.dispatch("setOrderAffirm", productList);
      this.$router.push("/order");
    }
  },
  created() {
    let array = this.$store.getters.shopcart;
    this.carNumShow = array.length > 0;
    let jwt = this.$store.getters.jwt;
    if (jwt != "" && jwt) {
      this.api.shopCart.shoppingCart().then(data => {
        if (data.code == "200") {
          this.carNumShow = data.model.length > 0;
        } else {
          Toast(data.message);
        }
      });
    }
    this.productInfo.productId = this.$route.params.productId;
    this.productInfo.productCount = this.productNum;
    let merchantId = this.$route.params.merchantId;
    if (merchantId) {
      this.productInfo.merchantBasicId = merchantId;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.details-footer {
  .clear-height {
    height: pxToRem(100px);
  }
  .footer-box {
    width: 100%;
    height: pxToRem(120px);
    line-height: pxToRem(120px);
    overflow: hidden;
    border-top: solid 1px #eeeeee;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  a {
    width: 18%;
    height: 100%;
    border-right: solid 1px #eeeeee;
    overflow: hidden;
    font-size: pxToRem(20px);
    color: #555555;
    text-align: center;
    padding-top: pxToRem(28px);
    box-sizing: border-box;
    display: block;
    font-weight: normal;
    float: left;
  }
  .tel-phone {
    background: #fff url(../../assets/zixun.png) no-repeat center pxToRem(15px);
    background-size: pxToRem(42px) pxToRem(40px);
  }
  .shop-cart {
    background: #fff url(../../assets/shopCart_2017.png) no-repeat center
      pxToRem(17px);
    background-size: pxToRem(42px) pxToRem(36px);
    position: relative;
  }
  .buy-btn {
    display: inline-block;
    width: 64%;
  }
  .add-cart,
  .buy-now {
    padding: 0;
    width: 50%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    font-size: pxToRem(28px);
    text-align: center;
    color: #fff;
    text-decoration: none;
    line-height: pxToRem(120px);
    border: none;
  }
  .add-cart {
    background: #06a6f8;
  }
  .buy-now {
    background: #ff4040;
  }

  .use-now {
    @extend .buy-now;
    background: #ff4040;
    width: 100%;
    height: 100%;
  }
  .cart-num {
    font-size: pxToRem(20px);
    background: #ff4040;
    color: #fff;
    line-height: pxToRem(30px);
    border-radius: 50%;
    position: absolute;
    top: pxToRem(10px);
    left: pxToRem(90px);
    display: inline-block;
    width: pxToRem(20px);
    height: pxToRem(20px);
  }
}
</style>