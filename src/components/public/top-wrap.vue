<template>
    <div class="top-wrap" v-show="show" @click="goTop()">
        <div class="top-arrows">↑</div>
        <div class="top-cont">顶部</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    handleScroll() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 200) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.handleScroll();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.top-wrap {
  position: fixed;
  top: 45%;
  right: pxToRem(30px);
  font-size: pxToRem(30px);
  background-color: #c8c4c4;
  color: #ffffff;
  border-radius: 100%;
  width: pxToRem(100px);
  height: pxToRem(100px);
  text-align: center;
  box-sizing: border-box;
  padding-top: pxToRem(10px);
  opacity: 0.8;
  z-index: 100;

  .top-cont {
    margin-top: pxToRem(5px);
    font-size: pxToRem(25px);
  }

  .top-arrows {
    width: pxToRem(40px);
    height: pxToRem(40px);
    border-radius: 100%;
    margin: 0 auto;
    border: pxToRem(3px) solid #ffffff;
    line-height: pxToRem(40px);
  }
}
</style>


