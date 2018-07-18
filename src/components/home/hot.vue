<template>
    <div class="hot">
      <div class="hot-title">
          热门推荐<span>GOOD</span>
      </div>
      <div class="swiper-container" id="hotSwiper">
        <ul class="clearfix swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in dataList" :key="index">                            
            <a :href="'#/productDetil/'+item.productId+'/'+item.merchantBasicId"><img :src="item.imageUrl" /></a>
          </li>
        </ul>
      </div>
      <div class="space"></div>
      <advert :only-id='id' />
    </div>
</template>

<script>
import productList from "../public/product-list";
import { Lazyload } from "mint-ui";
import { Swiper, swiperSlide } from "vue-awesome-swiper";
import advert from "./advert";
export default {
  components: {
    productList,
    advert
  },
  data() {
    return {
      dataList: [],
      id: ""
    };
  },
  created() {
    let d = new Date();
    this.id =
      d.getHours() +
      "" +
      d.getMinutes() +
      "" +
      d.getSeconds() +
      "" +
      d.getMilliseconds();
    this.api.home.hotProduct().then(data => {
      this.dataList = data;
      setTimeout(() => {
        var mySwiper = new Swiper("#hotSwiper", {
          slidesPerView: "auto",
          slidesPerGroup: 1,
          normalizeSlideIndex: true,
          centeredSlides: true,
          slidesOffsetBefore: -80
        });
      }, 300);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.hot {
  margin-top: pxToRem(30px);
  background-color: #ffffff;
  padding-top: pxToRem(20px);
  .hot-title {
    text-align: center;
    color: #222;
    font-size: pxToRem(40px);
    font-weight: bold;
    padding-bottom: pxToRem(10px);
    border-bottom: 1px #eee solid;
    span {
      color: #b9e1f0;
      font-size: pxToRem(30px);
      margin-left: pxToRem(15px);
    }
  }
  #hotSwiper {
    li {
      width: 53.33% !important;
      height: pxToRem(240px);
      padding-top: pxToRem(30px);
      padding-bottom: pxToRem(30px);
      float: left;
      margin-left: pxToRem(30px);
    }
    a,
    img {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .space {
    height: pxToRem(30px);
    background-color: #eee;
  }
}
</style>