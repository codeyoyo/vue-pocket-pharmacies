<template>
  <div class="banar">
    <mt-swipe :auto="4000" :show-indicators="true">
      <mt-swipe-item v-for="(item,index) in banarList" :key='index'>
        <a :href="'#/productDetil/'+item.productId+'/'+item.merchantBasicId">
          <img v-lazy="item.imageName" onerror="imgError(this);" />
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Lazyload, Toast } from "mint-ui";
export default {
  data() {
    return {
      banarList: []
    };
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem
  },
  created() {
    this.api.home.carousel().then(data => {
      if (data.code == "200") {
        this.banarList = data.model;
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.banar {
  overflow: hidden;
  height: pxToRem(325px);
  img {
    width: 100%;
    height: 100%;
  }
}
</style>


