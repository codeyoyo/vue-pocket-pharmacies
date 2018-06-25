<template>
  <div class="tracking">
        <helmet title="物流跟踪" :show-right='true' />
        <div class="head">
          <p><span>订单编号：</span>{{orderTracking.ordersCode}}</p>
          <!-- <p><span>配送方式：</span>圆通快递 812873702618</p> -->
        </div>
        <ul class="list">
          <li v-for="(item,index) in orderTracking.orderTrackingModels" :key="index">
            <i></i>
            <div class="msg_box">
              <p> 
                {{item.flowDesc}}
              </p>
            </div>
            <small>{{item.flowDateTime}}</small>
          </li>
        </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import helmet from "@/components/public/helmet";
export default {
  name: "tracking",
  components: {
    helmet
  },
  data() {
    return {
      orderTracking: {}
    };
  },
  created() {
    let orderCode = this.$route.params.ordersCode;
    this.api.orderServer.orderTracking(orderCode).then(data => {
      if (data.code == "200") {
        this.orderTracking = data.model;
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@import "../../sass/_func.scss";
.tracking {
  background-color: #ffffff;
}
.head {
  position: relative;
  padding: pxToRem(10px);
  font-size: pxToRem(25px);
  p {
    position: relative;
    margin: pxToRem(5px) 0;
  }
  span {
    color: #999;
  }
}

.list {
  padding: pxToRem(5px) pxToRem(25px) pxToRem(15px) pxToRem(38px);
  border-top: 1px solid #c0c0c0;
  li {
    position: relative;
    padding: pxToRem(10px) 0;
    color: #999;
    i {
      z-index: 1;
      position: absolute;
      left: pxToRem(-28px);
      top: pxToRem(13px);
      display: block;
      width: pxToRem(15px);
      height: pxToRem(15px);
      background: #fff;
      border-radius: 8px;
      border: 1px solid #3985ff;

      &:after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        content: "\20";
        display: block;
        width: pxToRem(8px);
        height: pxToRem(8px);
        background: #3985ff;
        border-radius: 6px;
      }
    }
    &:first-child {
      color: #333;
      i {
        border-color: #fb8a00;
      }
    }
    &:after {
      content: "\20";
      display: block;
      width: 1px;
      height: 100%;
      background: #3985ff;
      position: absolute;
      left: pxToRem(-20px);
      top: pxToRem(20px);
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  p {
    line-height: pxToRem(30px);
  }
  small {
    font-size: pxToRem(25px);
    color: #999;
    display: block;
    margin-top: pxToRem(10px);
  }
}
.msg_box {
  position: relative;
  font-size: pxToRem(25px);
}
</style>

