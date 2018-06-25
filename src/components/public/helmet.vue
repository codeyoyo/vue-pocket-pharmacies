<template>
    <div class="helmet">
      <div class="helmet-box">
          <mt-header :title="title">
            <mt-button slot="left" @click="go()" :icon="icon">{{leftText}}</mt-button>
            <mt-button slot="right" v-show="showRight">
              <a v-if="homeShow" class="home" href="#/"></a>
              <a v-if="rightShow" @click="rightAction()"  v-text="rightText"></a>
            </mt-button>
          </mt-header>
      </div>
    </div>
</template>

<script>
import { Header, Button } from "mint-ui";
export default {
  props: [
    "title",
    "rightText",
    "rightUrl",
    "showRight",
    "rightFunc",
    "backText",
    "backUrl"
  ],
  data() {
    return {
      rightShow: false,
      homeShow: true,
      leftText: "",
      icon: "back"
    };
  },
  components: {
    mtHeader: Header,
    mtButton: Button
  },
  methods: {
    go() {
      if (this.backUrl) {
        this.$router.push(this.backUrl);
      } else {
        this.$router.go(-1); //返回上一层
      }
    },
    rightAction() {
      if (this.rightUrl) {
        this.$router.push(this.rightUrl);
      }
      if (this.rightFunc) {
        this.rightFunc();
      }
    }
  },
  created() {
    if (!this.showRight) {
      this.rightShow = false;
      this.homeShow = false;
    } else {
      if (this.rightText != "" && this.rightText) {
        this.rightShow = true;
        this.homeShow = false;
      } else {
        this.rightShow = false;
        this.homeShow = true;
      }
    }
    if (this.backText) {
      this.leftText = this.backText;
      this.icon = "";
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../sass/_func.scss";
.helmet {
  height: pxToRem(70px);
  .helmet-box {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .mint-header {
    height: pxToRem(70px);
    font-size: pxToRem(30px);
  }
  .home {
    display: inline-block;
    background: url(../../assets/home2.png) no-repeat;
    background-size: 100%;
    width: pxToRem(40px);
    height: pxToRem(40px);
    margin-right: pxToRem(10px);
    margin-top: pxToRem(5px);
  }
  a {
    color: #ffffff;
    text-decoration: none;
  }
}
</style>