<template>
    <div class="banar">
        <div class="swiper-container" id='swiper'>
            <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="(item,index) in banarList" :key='index'>
                  <a class="banar-item" :href="joinTo(item)" >
                    <img :src="item.imageUrl" />
                  </a>
                </div>
            </div>
        </div>
        <div class="swiper-pagination" id="pagination"></div>
    </div>
</template>

<script>
import { Lazyload, Toast } from "mint-ui";
import { Swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {},
  data() {
    return {
      banarList: []
    };
  },
  methods: {
    joinTo(obj) {
      if (obj.actionType == 10) {
        return obj.actionContent;
      }
      if (obj.actionType == 20) {
        return "#/productDetil/" + obj.productId + "/" + obj.merchantBasicId;
      }
    }
  },
  watch: {},
  created() {
    this.api.home.carousel().then(data => {      
      this.banarList = data;
      setTimeout(() => {
        var mySwiper = new Swiper("#swiper", {
          autoplay: true,
          loop: true,
          pagination: {
            el: "#pagination"
          }
        });
      }, 300);
    });
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.banar {
  height: pxToRem(325px);
  overflow: hidden;
  position: relative;
  .banar-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    img {
      width: 100%;
    }
  }
}
</style>