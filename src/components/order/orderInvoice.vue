<template>
  <div class="invoice">
    <a class="invoice-info">
      <p class="invoice-title">
        发票信息
        <i class="icon iconfont icon-arrows-right"></i>
      </p>           
    </a>
    <div class="orderNote-info">
        <textarea type="text" placeholder="备注" maxlength="60"></textarea>
    </div>
    <div class="express-type">
        <p class="express-title">配送方式</p>
        <div class="express-right" @click="popupHover()">
            顺丰快递 包邮
            <i class="icon-arrows-right"></i>
        </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
        <div  class="expressType-list">
          <label  class="expressType-item jk-radio-wrapper jk-radio-group-item">
              <span  class="jk-radio">
              <span class="jk-radio-inner"></span>
              <input  type="radio" name="" class="jk-radio-input"></span>
              <span  class="expressType-text">普通快递 包邮</span>
          </label>
          <label  class="expressType-item jk-radio-wrapper jk-radio-group-item jk-radio-wrapper-checked">
              <span class="jk-radio jk-radio-checked">
              <span  class="jk-radio-inner"></span>
              <input  type="radio" name="" class="jk-radio-input"></span>
              <span  class="expressType-text">顺丰快递 包邮</span>
          </label>
        </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
  components: {
    mtPopup: Popup
  },
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    popupHover() {
      this.popupVisible = !this.popupVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.express-type,
.invoice-info {
  padding: 0 pxToRem(20px);
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  display: block;
  height: pxToRem(80px);
  line-height: pxToRem(80px);
  color: #333;
}
.invoice-title {
  height: pxToRem(80px);
  i {
    height: 100%;
    width: pxToRem(25px);
    background: url(../../assets/right.png) no-repeat;
    background-size: 100%;
    float: right;
    display: block;
    background-position: center;
  }
}
.orderNote-info {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  padding: pxToRem(16px) px(20px);
  textarea {
    background-color: #fff;
    width: 100%;
    border: none;
    height: pxToRem(80px);
    line-height: pxToRem(80px);
    font-size: pxToRem(24px);
    text-indent: pxToRem(10px);
  }
}

.express-title,
.express-right {
  float: left;
}

.express-title {
  width: 20%;
}
.express-right {
  width: 80%;
  text-align: right;
}
.icon-arrows-right {
  height: 100%;
  width: pxToRem(25px);
  background: url(../../assets/right.png) no-repeat;
  background-size: 100%;
  float: right;
  display: block;
  background-position: center;
}
</style>


