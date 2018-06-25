<template>
    <div class="nav-footer">
        <div class="tab-bar-ul">
            <li>
                <a :class="activeOpinion(1)" href="#/home">
                    <i class="icon iconfont" :class="activeIcon(1)"></i> 
                        <span class="tab-bar-name">首页</span>
                </a>
            </li> 
            <li>
                <a :class="activeOpinion(2)" href="#/classify">
                    <i class="icon iconfont" :class="activeIcon(2)"></i> 
                    <span class="tab-bar-name">分类</span>
                </a>
            </li> 
            <li>
                <a :class="activeOpinion(3)" href="#/shopingCart">
                    <i class="icon iconfont" :class="activeIcon(3)"></i> 
                    <span class="tab-bar-name">购物车</span>
                </a>
            </li>
            <li>
                <a :class="activeOpinion(4)" href="#/user">
                    <i class="icon iconfont icon-user" :class="activeIcon(4)"></i> 
                    <span class="tab-bar-name">我的</span>
                </a>
            </li>
        </div>
    </div>
</template>

<script>
export default {
  props: ["active"],
  methods: {
    activeOpinion(num) {
      if (this.active == num) {
        return "active";
      } else {
        return "";
      }
    },
    activeIcon(num) {
      let strClass = "";
      switch (num) {
        case 1:
          if (this.active == num) {
            strClass = "icon-home-active";
          } else {
            strClass = "icon-home";
          }
          break;
        case 2:
          if (this.active == num) {
            strClass = "icon-search-active";
          } else {
            strClass = "icon-search";
          }
          break;
        case 3:
          if (this.active == num) {
            strClass = "icon-shopcar-active";
          } else {
            strClass = "icon-shopcar";
          }
          break;
        case 4:
          if (this.active == num) {
            strClass = "icon-user-active";
          } else {
            strClass = "icon-user";
          }
          break;
      }
      return strClass;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.nav-footer {
  height: pxToRem(150px);
}
.tab-bar-ul {
  position: fixed;
  border-top: 1px solid #d8d8d8;
  display: -ms-flexbox;
  display: flex;
  color: #333;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  z-index: 99;
  list-style: none;
  padding-bottom: pxToRem(10px);
  li {
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .active {
    color: #f66;
  }
  a {
    color: #333;
    display: block;
    padding-top: pxToRem(8px);
    text-decoration: none;
  }
}
.tab-bar-name {
  display: block;
  font-size: pxToRem(22px);
}
.iconfont {
  font-size: pxToRem(50px);
  color: #f66;
  width: pxToRem(60px);
  height: pxToRem(60px);
  line-height: pxToRem(60px);
  padding-top: 0;
  padding-bottom: 0;
  font-size: pxToRem(32px);
  margin: 0.10666667rem auto 0;
  display: block;
  background-image: url(../../assets/foot-nav.png);
  background-repeat: no-repeat;
  background-size: pxToRem(900px) auto;
}

.icon-home-active {
  background-position: pxToRem(-86px) pxToRem(-20px);
}

.icon-home {
  background-position: pxToRem(-86px) pxToRem(-138px);
}

.icon-search {
  background-image: url(../../assets/seachList.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.icon-search-active {
  @extend .icon-search;
  background-image: url(../../assets/seachList-active.png);
}

.icon-shopcar {
  background-position: pxToRem(-589px) pxToRem(-140px);
}

.icon-shopcar-active {
  background-position: pxToRem(-589px) pxToRem(-18px);
}

.icon-user {
  background-position: pxToRem(-756px) pxToRem(-140px);
}

.icon-user-active {
  background-position: pxToRem(-756px) pxToRem(-20px);
}
</style>


