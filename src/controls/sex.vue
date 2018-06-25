<template>
  <div class="sex">
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="sex-box">
        <header class="popup-header">
            <header>性别</header>
            <i class="icon icon-close close" @click="closePopup()"></i>
        </header>
        <div class="popup-body">
            <div class="sex-list">
                <label class="sex-item" for="man" @click="sexChange(0)">
                    <span class="sex-text">男</span>
                    <span class="radio">
                        <input id="man" value="0" type="radio" name="sex" class="radio-input" v-model="sex">
                        <label for="man" class="radio-inner"></label>
                    </span>
                </label>
                <label class="sex-item" for="woman" @click="sexChange(1)">
                    <span class="sex-text">女</span>
                    <span class="radio">
                        <input id="woman" value="1" type="radio" name="sex" class="radio-input" v-model="sex" />
                        <label for="woman" class="radio-inner"></label>
                    </span>
                </label>
            </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
  props: ["visible", "close"],
  components: {
    mtPopup: Popup
  },
  data() {
    return {
      popupVisible: false,
      sex: 0
    };
  },
  watch: {
    visible(n) {
      this.popupVisible = n;
    }
  },
  methods: {
    closePopup() {
      this.popupVisible = false;
      this.close && this.close(this.sex);
    },
    sexChange(type) {
      this.sex = type;
      this.popupVisible = false;
      this.close && this.close(this.sex);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/_func.scss";
.popup-header {
  height: pxToRem(80px);
  line-height: pxToRem(80px);
  text-align: center;
  font-size: pxToRem(32px);
  border-bottom: 1px solid #eee;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.popup-body {
  height: pxToRem(500px);
}

.close {
  position: absolute;
  right: pxToRem(20px);
  top: 0;
  bottom: 0;
  margin: auto;
  width: pxToRem(30px);
  height: pxToRem(30px);
}

.sex-list {
  padding-left: pxToRem(20px);
}

.sex-item {
  width: 100%;
  height: pxToRem(72px);
  line-height: pxToRem(72px);
  font-size: pxToRem(30px);
  border-bottom: 1px solid #eee;
  padding: 0 pxToRem(20px);
  overflow: hidden;
  display: block;
}

.sex-text {
  float: left;
  width: 85%;
}

.radio-input {
  display: none;
}

.radio-input + .radio-inner::before {
  content: "\a0";
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: pxToRem(30px);
  height: pxToRem(30px);
  margin-right: pxToRem(40px);
  border-radius: 50%;
  border: 1px solid #26a2ff;
  text-indent: pxToRem(15px);
  line-height: 1;
}

.radio-input:checked + .radio-inner::before {
  background-color: #26a2ff;
  background-clip: content-box;
  margin-right: pxToRem(40px);
}

.sex-box {
  position: absolute;
  width: 100%;
  background-color: #fff;
  bottom: 0px;
}
</style>


