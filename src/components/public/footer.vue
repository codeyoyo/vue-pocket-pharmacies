<template>
  <div id="pfooter" class="footer" v-show="footerShow">
    <div class="footer-row">
        <a href="#/login">登录</a>
        <a href="#/register">注册</a>
        <a>用药问答</a>
        <a>关于药道士</a>
    </div>
    <div class="footer-attestation">
        <span>正品保证</span>
        <span>隐私配送</span>
        <span>专业药师</span>
        <span>货到付款</span>
    </div>
    <div class="footer-copyright">
        copyright&nbsp;&nbsp;©2017-2018 药道士网上药店 版权所有
    </div>
  </div>
</template>

<script>
export default {
  props: ["needMatch"],
  data() {
    return {
      oHeight: 0,
      footerShow: true
    };
  },
  created() {
    if (this.needMatch) {
      this.oHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      window.onresize = () => {
        var nHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (nHeight + 100 < this.oHeight) {
          this.footerShow = false;
        } else {
          this.footerShow = true;
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.footer {
  margin-top: pxToRem(10px);
  background-color: #ffffff;
  overflow: hidden;
  padding-bottom: pxToRem(10px);
  .footer-row {
    font-size: pxToRem(28px);
    color: #898989;
    text-align: center;
    margin-top: pxToRem(20px);
    a {
      color: #898989;
      display: inline-block;
      padding-right: pxToRem(10px);
      border-right: pxToRem(1px) solid #898989;
      &:last-child {
        border: none;
      }
    }
  }
  .footer-attestation {
    font-size: pxToRem(23px);
    text-align: center;
    margin-top: pxToRem(30px);
    span {
      display: inline-block;
      text-indent: pxToRem(30px);
      position: relative;
      display: inline-block;
      color: #43bcfa;
      background: url(http://res4.360kad.com/theme/mobile/image/index3.0/sevice_icon.png)
        no-repeat left center;
      background-size: pxToRem(25px);
    }
  }
  .footer-copyright {
    font-size: pxToRem(23px);
    text-align: center;
    margin-top: pxToRem(5px);
    color: #898989;
  }
}
</style>


