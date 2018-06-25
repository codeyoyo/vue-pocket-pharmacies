<template>
  <div class="product-show">
    <div class="img-show">
      <div class="swiper-container" id='productImgShow'>
        <div class="swiper-wrapper">
          <div class="swiper-slide imgItem"  v-for="(item,index) in productObj.imgList" :key='index'>
            <a>
              <img :src="item" />
            </a>
          </div>
        </div>
        <div class="swiper-pagination" id="productImgShowpagination"></div>
      </div>
    </div>
    <div class="product-message">
        <div class="information-wrap">
            <div class="information-wrap-cont">
                <p class="information-product-name">
                  {{productObj.productName}} 
                </p>
                <p id="collection" class="information-product-collection"></p>
            </div>
        </div>
        <div class="information-wrap">
            <div class="price-box">
                <span class="skill-size skill-price">
                  <span>￥</span>
                  {{productObj.sellingPrice}}
                </span>
                <!-- <span class="skill-size sale-price">￥2.50</span>
                <span class="skill-size save-price">立省1.50元</span> -->
            </div>
        </div>
        <div class="info-box-item">
          <dl>
            <dt class="special">功效：</dt>
            <dd>
              {{productObj.directionsAuxiliary}}
            </dd>
          </dl>
          <dl>
            <dt class="special">厂商：</dt>
            <dd>{{productManual.manufacturerName}}</dd>
          </dl>
        </div>
    </div>

    <div class="promotion-info info-box">
      <div class="info-box-item" v-if="promotionShow">
        <dl class="product-promotion">
          <dt>促销：</dt>
          <dd class="hide-part" :class="partShow?'':'part-height'">
            <div class="show2line" v-for="(item,index) in productObj.promotions" :key="index">
              <i class="tag">{{item.tag}}</i>{{item.slogan}}
            </div>
            <span class="promotion-icon" :class="partShow?'top':'down'" @click="partChange()"></span>
          </dd>
        </dl>
      </div>
      <div class="info-box-item item-therapy">
        <dl>
          <dt>用药需知：</dt>
          <dd class="hide-part">
            <div class="need-know" :class="needShow?'':'need-overflow'">{{dosage}}</div>
            <span class="treatment-icon" :class="needShow?'top':'down'" @click="needChange()"></span>
          </dd>
        </dl>
      </div>
      <div class="info-box-item">
        <dl class="product-sizes"><dt>规格：</dt>
          <dd>
            <ul>
              <li class="product-size active">
                <a class="router-link-exact-active router-link-active">
                  {{productManual.specifications}}
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>

    <div class="information-product-treatment">
        <div class="treatment-title">
            <a>数量</a>
        </div>
        <div class="information-treatment-price">
            <div class="treatment-price-cont">
                <div class="treatment-size">
                    <div class="allTreatment-num">
                        合计<i class="all-treat">￥{{totalPrice}}</i>
                    </div>
                    <div class="saveTreatment-num">
                        <span>立省
                        <i>0.00</i>元 
                        </span> 
                    </div>
                </div>
                <div class="treatment-input">
                    <a @click="cut()">
                      <span style="display: block;width: 100%;height: 100%;" :class="curClass"></span>
                    </a>
                    <input class="num-input" type="number" v-model="productNum">
                    <a class="num-add" @click="add()"></a>
                </div>
            </div>
        </div>
    </div>
    <div class="product-detil">
      <detil :product-id='productId' :get-dosage='getDosage' />
    </div>
    <div class="sale-banner">
      <a>
        <img :src="productObj.adImg" onerror="imgError(this);" />
      </a>
    </div>
    <div id='buyProduct' class="hide">
      <img :src="hidImg" />
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast } from "mint-ui";
import { Swiper, swiperSlide } from "vue-awesome-swiper";
import detil from "./detil";
export default {
  props: ["func", "getPromotion", "setPrescription"],
  data() {
    return {
      curClass: "num-not",
      productNum: 1,
      productId: "",
      merchantId: "",
      productObj: {},
      productManual: {},
      totalPrice: 0,
      hidImg: "",
      partShow: false,
      needShow: false,
      promotionShow: false,
      dosage: ""
    };
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem,
    detil
  },
  watch: {
    productNum(n, o) {
      if (n == 0) {
        this.productNum = 1;
      }
      this.func && this.func(this.productNum);
    }
  },
  methods: {
    cut() {
      if (this.productNum > 1) {
        this.productNum--;
      }
      if (!this.productNum || this.productNum == 1) {
        this.curClass = "num-not";
      } else {
        this.curClass = "num-cur";
      }
      this.matchPrice();
    },
    add() {
      this.productNum++;
      this.curClass = "num-cur";
      this.matchPrice();
    },
    matchPrice() {
      let productList = [];
      productList.push({
        productId: this.productObj.productId,
        productCount: this.productNum,
        merchantBasicId: this.productObj.merchantBasicId
      });
      this.api.shopCart.shoppingCartPrice(productList).then(data => {
        if (data.code == "200") {
          this.totalPrice = data.model.totalPrice;
        } else {
          Toast(data.message);
        }
      });
    },
    partChange() {
      this.partShow = !this.partShow;
    },
    needChange() {
      this.needShow = !this.needShow;
    },
    getDosage(d) {
      this.dosage = d;
    }
  },
  created() {
    this.$store.dispatch("setProductError", false);
    this.productId = this.$route.params.productId;
    let merchantId = this.$route.params.merchantId;
    if (merchantId) {
      this.merchantId = merchantId;
    }
    this.api.goods
      .productDetails(this.productId, this.merchantId)
      .then(data => {
        if (data.code == "200") {
          this.productObj = data.model;
          this.matchPrice();
          this.hidImg =
            this.productObj.imgList.length > 0
              ? this.productObj.imgList[0]
              : "";
          this.promotionShow =
            this.productObj.promotions && this.productObj.promotions.length > 0;
          if (this.promotionShow && this.getPromotion) {
            let promotionId = this.productObj.promotions[0].promotionId;
            this.getPromotion(promotionId);
          }
          this.setPrescription(this.productObj.isPrescription);
          setTimeout(() => {
            var mySwiper = new Swiper("#productImgShow", {
              autoplay: false,
              loop: true,
              pagination: {
                el: "#productImgShowpagination"
              }
            });
          }, 300);
        } else {
          this.$store.dispatch("setProductError", true);
          Toast("message");
        }
      });
    this.api.goods.productManual(this.productId).then(data => {
      if (data.code == "200") {
        this.productManual = data.model;
      } else {
        this.$store.dispatch("setProductError", true);
        Toast(data.message);
      }
    });
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.img-show {
  overflow: hidden;
  height: pxToRem(600px);
  img {
    width: 100%;
    height: 100%;
  }
}

.product-message {
  margin-top: pxToRem(10px);
  border: 1px solid #eeeeee;
  .information-wrap {
    padding: 0 pxToRem(20px);
    position: relative;
    background-color: #fff;
    font-size: pxToRem(28px);
    overflow: hidden;
  }
  .information-wrap-cont {
    padding: pxToRem(25px) 0 0 0;
  }
  .information-product-collection {
    margin-top: pxToRem(18px);
  }
  .information-product-name {
    width: 80%;
    line-height: pxToRem(40px);
    font-size: pxToRem(32px);
  }
  .information-product-collection {
    width: pxToRem(85px);
    height: pxToRem(62px);
    border-left: solid 1px #d3d3d3;
    position: absolute;
    top: pxToRem(1px);
    right: pxToRem(2px);
    background: url(../../assets/share_not.png) no-repeat 74% center;
    background-size: pxToRem(50px) pxToRem(42px);
  }
  .information-wrap {
    padding: 0 pxToRem(30px);
    position: relative;
    background-color: #fff;
    font-size: pxToRem(28px);
    padding-bottom: pxToRem(20px);
    border-bottom: solid 1px #eeeeee;
  }
  .price-box {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    float: left;
    padding-top: pxToRem(20px);
  }
  .skill-size {
    height: pxToRem(40px);
    line-height: pxToRem(50px);
    float: left;
    margin: 0 pxToRem(30px) pxToRem(20px) pxToRem(5px);
  }
  .skill-price {
    line-height: pxToRem(40px);
    font-size: pxToRem(48px);
    color: #ff4040;
    span {
      font-size: pxToRem(30px);
    }
  }
  .sale-price {
    color: #b5b5b5;
    text-decoration: line-through;
  }
  .save-price {
    color: #ff4040;
  }
}

.information-product-treatment {
  border-top: solid 1px #eeeeee;
  border-bottom: solid 1px #eeeeee;
  background: #fff;
  box-sizing: border-box;
  margin-top: pxToRem(30px);

  .treatment-title {
    border-bottom: solid 1px #eeeeee;
    overflow: hidden;
    position: relative;
    height: pxToRem(84px);
    a {
      height: pxToRem(48px);
      line-height: pxToRem(48px);
      padding-left: pxToRem(30px);
      display: inline-block;
      font-size: pxToRem(32px);
      color: #888888;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .information-treatment-price {
    padding: pxToRem(0px);
  }
  .treatment-price-cont {
    padding: pxToRem(44px);
    height: pxToRem(168px);
    box-sizing: border-box;
    display: flex;
  }
  .treatment-size {
    width: 55%;
    overflow: hidden;
    flex: 1;
  }
  .allTreatment-num,
  .saveTreatment-num {
    line-height: pxToRem(40px);
    font-size: pxToRem(26px);
    i {
      font-weight: normal;
      font-style: normal;
    }
  }
  .all-treat {
    color: #ff4040;
    font-size: pxToRem(34px);
  }

  .treatment-input {
    width: 45%;
    overflow: hidden;
    font-size: pxToRem(32px);
    border-top: solid 1px #000000;
    border-bottom: solid 1px #000000;
    text-align: center;
    height: pxToRem(70px);
    input,
    a {
      height: pxToRem(70px);
      float: left;
      text-align: center;
      display: inline-block;
      text-decoration: none;
      border-left: solid 1px #000000;
      border-right: solid 1px #000000;
    }
    a {
      width: 29.5%;
    }
    .num-input {
      width: 38%;
      border: none;
      font-size: pxToRem(32px);
      overflow: hidden;
    }
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

.sale-banner {
  margin: pxToRem(30px) 0;
  height: pxToRem(90px);
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.hide {
  display: none;
}
.car-animal {
  position: fixed;
  width: pxToRem(0px);
  height: pxToRem(0px);
  bottom: pxToRem(0px);
  overflow: hidden;
  left: 0;
  right: 0;
  margin: auto;
  animation: carfunc 1s;
  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes carfunc {
  0% {
    display: block;
    width: pxToRem(300px);
    height: pxToRem(300px);
    bottom: pxToRem(500px);
  }
  100% {
    width: pxToRem(0px);
    height: pxToRem(0px);
    bottom: pxToRem(0px);
    display: none;
  }
}

.info-box-item {
  position: relative;
  padding: pxToRem(15px) 0 pxToRem(12px) pxToRem(10px);
  background-color: #fff;
  overflow: hidden;
  line-height: pxToRem(35px);
  dl {
    color: #666;
    font-size: pxToRem(24px);
    overflow: hidden;
  }
  dt {
    float: left;
    width: pxToRem(130px);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .special {
    width: pxToRem(75px);
  }
}

.product-detil {
  margin-top: pxToRem(30px);
}

.info-box {
  background-color: #fff;
  margin-top: pxToRem(30px);
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.hide-part {
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.tag {
  text-align: center;
  margin-right: 3px;
  background: #ff6464;
  font-style: normal;
  padding: pxToRem(1px) pxToRem(5px);
  color: #fff;
  -webkit-border-radius: pxToRem(4px);
  border-radius: 5px;
}

.show2line {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -o-text-overflow: initial;
  text-overflow: clip;
  white-space: normal;
  overflow: hidden;
  width: 75%;
  font-size: pxToRem(25px);
  margin-bottom: pxToRem(10px);
}

.gift-title {
  width: pxToRem(80px);
  text-align: center;
  float: left;
  background: #ff6464;
  font-style: normal;
  color: #fff;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-right: pxToRem(10px);
}

.product-gift {
  overflow: hidden;
  margin-top: pxToRem(10px);
  ul {
    width: 60%;
    float: left;
  }
  p {
    font-size: pxToRem(22px);
    color: #666;
    overflow: hidden;
  }
  .icon-number {
    float: right;
  }
  a {
    font-size: pxToRem(22px);
    color: #666;
    overflow: hidden;
  }
}

.promotion-icon {
  position: absolute;
  right: pxToRem(28px);
  top: 50%;
  width: pxToRem(18px);
  height: pxToRem(18px);
  border-left: 1px solid #bebebe;
  border-top: 1px solid #bebebe;
  border-bottom: transparent;
  border-right: transparent;
}

.treatment-icon {
  @extend .promotion-icon;
}

.down {
  transform: translateY(pxToRem(-12px)) rotate(225deg);
}

.top {
  transform: translateY(pxToRem(-20px)) rotate(45deg);
}

.need-know {
  float: left;
  width: 70%;
  white-space: initial;
}

.router-link-active {
  background: #ff6464;
  border: 1px solid #ff6464;
  color: #fff;
  padding: pxToRem(2px) pxToRem(10px);
  border-radius: pxToRem(8px);
  font-size: pxToRem(25px);
}

.part-height {
  height: pxToRem(40px);
}

.need-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.imgItem,
#productImgShow {
  height: pxToRem(600px) !important;
}
</style>