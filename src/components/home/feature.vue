<template>
  <div class="feature">
      <div class="feature-title">
          <div class="feature-link">
          </div>
          <h3>
              特色会场
          </h3>
      </div>
      <div class="feature-content">
          <a v-for="(item,index) in dataList" :key="index" :href="'#/productDetil/'+item.productId+'/'+item.merchantBasicId">
            <img :src="item.imgUrl" onerror="imgError(this);" />
          </a>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.api.home.features().then(data => {
      this.dataList = data;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.feature {
  background-color: #ffffff;
  margin-top: pxToRem(30px);
  padding-top: pxToRem(10px);
  overflow: hidden;
  .feature-title {
    position: relative;
    height: pxToRem(50px);
    h3 {
      font-size: pxToRem(45px);
      display: block;
      width: pxToRem(200px);
      text-align: center;
      margin: 0 auto;
      z-index: 2;
      background-color: #ffffff;
      color: red;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .feature-link {
      height: pxToRem(5px);
      width: 100%;
      position: absolute;
      background-color: red;
      top: 0px;
      bottom: 0px;
      margin: auto;
      z-index: 1;
    }
  }
  .feature-content {
    height: pxToRem(415px);
    margin-top: pxToRem(10px);
    a {
      display: block;
      float: left;
      width: 50%;
      -moz-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
      &:first-child {
        border-right: pxToRem(1px) solid #f9f9f9;
        border-bottom: pxToRem(1px) solid #f9f9f9;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>


