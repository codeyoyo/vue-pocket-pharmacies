<template>
  <div class="advert">
    <div class="swiper-container" :id='aId'>
      <div class="swiper-wrapper">
        <div class="swiper-slide"  v-for="(item,index) in dataList" :key='index'>
          <a class="banar-item" :href="joinTo(item)" >
            <img :src="item.imageUrl" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination" :id="pId"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: ["onlyId"],
  data() {
    return {
      dataList: [],
      pId: "advertpagination",
      aId: "advertswiper"
    };
  },
  methods: {
    joinTo(obj) {
      if (obj.advertisingType == 10) {
        return obj.redirectUrl;
      }
      if (obj.advertisingType == 20) {
        return "#/productDetil/" + obj.productId + "/" + obj.merchantBasicId;
      }
    }
  },
  created() {
    this.pId += this.onlyId;
    this.aId += this.onlyId;
    this.api.home.advertising().then(data => {
      this.dataList = data;
      setTimeout(() => {
        var mySwiper = new Swiper("#" + this.aId, {
          autoplay: true,
          loop: true,
          pagination: {
            el: "#" + this.pId
          }
        });
      }, 300);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.advert {
  height: pxToRem(200px);
  a,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>


