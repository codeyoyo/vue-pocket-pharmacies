<template>
  <section class="order-address">
      <a class="address"  v-if='!hasAddress' href="#/addressManage">
          <span class="address-btn">+添加收货地址</span>
      </a>
       <a class="address-box" href="#/addressManage" v-if="hasAddress">
           <ul class="address-contain">
            <li class="address-icon">
              <i class="icon icon-position"></i>
            </li>
            <li class="address-info">
              <div class="name-and-phone">
                <p class="address-name">收货人:{{model.consignee}}</p>
                <p class="address-phone">{{model.mobilePhone==''?model.landlinePhone:model.mobilePhone}}</p>
              </div>
              <p class="address-text">
                  {{model.province}}{{model.area}}{{model.city}}{{model.deliveryAddress}}
              </p>
            </li>
            <li class="address-more">
              <i class="icon iconfont icon-arrows-right"></i>
            </li>
         </ul>
      </a>
  </section>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      model: {},
      hasAddress: false
    };
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.api.order.defaultAddress().then(data => {
        if (data.code == "200") {
          this.model = data.model;
          this.hasAddress = true;
        }
      });
    }
    let orderAffirm = this.$store.getters.orderAffirm;
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.address {
  padding: pxToRem(20px) pxToRem(30px);
  margin: 0 auto pxToRem(20px);
  background: url(../../assets/link.png) repeat-x #fff;
  background-position: bottom;
  -webkit-background-size: auto 4px;
  background-size: auto 4px;
  text-align: center;
  display: block;
}

.address-box {
  @extend .address;
  padding: 0;
  margin: 0;
  height: pxToRem(130px);
  overflow: hidden;
}

.address-btn {
  display: inline-block;
  color: #61b1f4;
  font-size: pxToRem(24px);
  line-height: pxToRem(36px);
  padding: pxToRem(40px) 0;
}

.address-contain {
  overflow: hidden;
  height: 100%;
  width: 100%;
  li {
    float: left;
  }
}

.address-icon {
  width: 10%;
  text-align: center;
  height: 100%;
  position: relative;
  i {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}

.icon-address {
  color: #999;
  font-family: iconfont !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  width: pxToRem(25px);
  height: pxToRem(25px);
  background: url(../../assets/address.png) no-repeat;
  background-size: 100%;
  display: inline-block;
}

.address-info {
  padding: pxToRem(30px) pxToRem(16px);
  color: #333;
  width: 75%;
  font-size: pxToRem(28px);
}

.name-and-phone {
  overflow: hidden;
  height: pxToRem(35px);
  line-height: pxToRem(35px);
}

.address-name {
  text-align: left;
  float: left;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-phone {
  text-align: right;
  float: right;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-text {
  text-align: left;
  color: #999;
  width: 100%;
  word-wrap: break-word;
  line-height: pxToRem(50px);
  height: pxToRem(50px);
}

.address-more {
  float: right;
  width: 10%;
  text-align: center;
  height: 100%;
  position: relative;
  .icon-arrows-right {
    display: inline-block;
    background: url(../../assets/right.png) no-repeat;
    background-size: 100%;
    width: pxToRem(25px);
    height: pxToRem(25px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>


