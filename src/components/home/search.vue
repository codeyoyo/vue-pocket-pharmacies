<template>
  <div id="search">
    <div class="search-box" :class="searchClass">
      <div class="name">药道士</div>
      <div class="search-input">
        <i class="mintui mintui-search"></i>
        <input type="text" v-model="searchValue" @click="goSearch()" readonly />
      </div>
      <a class="user" :href="isLogin?'#/user':'#/login'" >
        <span v-if="!isLogin">登录</span>
        <img v-if="isLogin" src='../../assets/user-png.png' onerror="imgError(this);" />
      </a> 
    </div>
  </div>
</template>

<script>
export default {
  props: ["nofixed"],
  data() {
    return {
      searchValue: "请输入药品名称",
      searchClass: "top",
      isLogin: false
    };
  },
  methods: {
    goSearch() {
      this.$router.push("/search");
    },
    handleScroll() {
      var scrollTop = document.getElementById("mainContent").scrollTop;
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 100 || osTop > 100) {
        this.searchClass = "dow";
      } else {
        this.searchClass = "top";
      }
    }
  },
  mounted() {
    if (this.nofixed) {
      this.searchClass = "dow";
    } else {
      document.getElementById("mainContent").onscroll = () => {
        this.handleScroll();
      };
      window.onscroll = () => {
        this.handleScroll();
      };
    }
    let jwt = this.$store.getters.jwt;
    this.isLogin = jwt != "" && jwt != undefined;
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.top {
  background-color: rgba(253, 253, 253, 0);
}
.dow {
  background-color: rgba(17, 159, 243, 0.9);
}
.search-box {
  overflow: hidden;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 100;
  padding: pxToRem(10px) pxToRem(0px) pxToRem(10px) pxToRem(10px);
  .name {
    text-align: center;
    font-size: pxToRem(36px);
    float: left;
    width: 15%;
    color: #fff;
    font-weight: bold;
    height: pxToRem(40px);
    line-height: pxToRem(40px);
    padding: pxToRem(5px);
    user-select: none;
  }
  .search-input {
    position: relative;
    float: left;
    background-color: #fff;
    border: none;
    border-radius: pxToRem(30px);
    padding: pxToRem(5px);
    width: 65%;
    margin-left: pxToRem(20px);
    height: pxToRem(45px);
    overflow: hidden;
    input[type="text"] {
      border: none;
      width: 90%;
      height: 80%;
      left: pxToRem(40px);
      position: absolute;
      font-size: pxToRem(25px);
      color: #979595;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    i {
      font-size: pxToRem(30px);
      position: absolute;
      left: pxToRem(10px);
      top: pxToRem(13px);
      height: pxToRem(30px);
      vertical-align: top;
    }
  }
  .user {
    float: right;
    color: #fff;
    width: 13%;
    text-align: center;
    height: pxToRem(40px);
    overflow: hidden;
    font-size: pxToRem(28px);
    display: block;
    line-height: pxToRem(40px);
    padding: pxToRem(5px);
    text-decoration: none;
    img {
      height: 100%;
    }
  }
}
</style>



