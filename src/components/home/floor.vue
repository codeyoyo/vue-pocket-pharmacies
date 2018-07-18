<template>
  <div class="floor">
      <div v-for='(item,index) in floorList' :key="index" class="floor-item">
          <div class="floor-title" :class="'f'+(index+1)">
              <h3 v-text="item.name"></h3>
          </div>
          <div class="floor-products">
            <product-list>
              <a class="product-item" v-for="(temp,idx) in item.floorList" :key="idx" :href="'#/productDetil/'+temp.productId">
                <img v-lazy="temp.imgUrl" />
              </a>
            </product-list>
          </div>
          <div class="floor-ad">
              <div class="ad-item" v-for="(temp,idx) in item.adList" :key="idx" :href="'#/productDetil/'+temp.productId">
                <img v-lazy="temp.imgUrl" />
              </div>
          </div>
          <div class="floor-answer">
              <div class="answer-row">
                  <span>问答</span>
                  <a v-text="item.answers"></a>
              </div>
              <div class="answer-row">
                  <span>头条</span>
                  <a v-text="item.headline"></a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Lazyload, Toast } from "mint-ui";
import productList from "../public/product-list";
export default {
  data() {
    return {
      floorList: []
    };
  },
  components: {
    productList
  },
  created() {
    this.api.home.floor().then(data => {
      this.floorList = data;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
@mixin each-floor() {
  $stars: (
     (background-color: #bfeafd, color: #077fac),
     (background-color: #ffd3e4, color: #fc4468),
     (background-color: #baece0, color: #047e62),
     (background-color: #ede9bc, color: #887b09),
     (background-color: #dacccc, color: #6c3c3c),
     (background-color: #5484ec, color: #e9e2da),
     (background-color: #8ceb4d, color: #504e4f),
     (background-color: #e97a7a, color: #534945),
  );
  @for $i from 1 through length($stars) {
    $item: nth($stars, $i);
    .f#{$i} {
      background-color: map-get($item, background-color);
      h3 {
        color: map-get($item, color);
      }
    }
  }
}
.floor {
  .floor-item {
    margin-top: pxToRem(30px);
    background-color: #fff;
    padding-bottom: pxToRem(10px);
  }
  @include each-floor();
  .floor-title {
    text-align: center;
    height: pxToRem(70px);
    line-height: pxToRem(70px);
    h3 {
      font-size: pxToRem(40px);
    }
  }
  .floor-products {
    height: pxToRem(255px);
    overflow: hidden;
  }
  .product-item {
    height: pxToRem(250px);
    display: inline-block;
    width: pxToRem(200px);
    overflow: hidden;
    border-left: pxToRem(1px) solid #f0f0f0;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .floor-ad {
    border-top: pxToRem(1px) solid #f0f0f0;
    height: pxToRem(130px);
    .ad-item {
      width: 48%;
      height: 100%;
      float: left;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .floor-answer {
    overflow: hidden;
    .answer-row {
      margin-top: pxToRem(20px);
      width: 100%;
      overflow: hidden;
      span {
        border-radius: pxToRem(20px);
        border: 1px solid #94d48e;
        color: #94d48e;
        font-size: pxToRem(20px);
        padding: pxToRem(8px);
        float: left;
        margin-left: pxToRem(20px);
      }
      a {
        float: left;
        font-size: pxToRem(25px);
        color: #020202;
        margin-left: pxToRem(20px);
        margin-top: pxToRem(5px);
        height: pxToRem(30px);
        line-height: pxToRem(30px);
        width: 85%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

