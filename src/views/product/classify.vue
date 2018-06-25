<template>
    <div class="classify">
      <helmet title="全部分类" :show-right="true"></helmet>
      <!-- <search :nofixed='true' /> -->
      <div class="search">
        <div class="class-search-box">
          <div class="search-content" @click="goSearch()">
            <i class="mintui mintui-search"></i>
            <input type="text" placeholder="请输入药品名称" readonly>
          </div>
          <div class="search-btn" @click="goSearch()">搜索</div>
        </div>
      </div>
      <!-- <div class="categories-banner">
        <a>
          <img src="http://m.111.com.cn/yyw/wap/category/static/img/categorie_bannr.de2a6a8.png" onerror="imgError(this);" />
        </a>
      </div> -->
      <div class="categories-content">
          <ul class="categories-list">
            <li v-for="(item,index) in classNameList" :key="index">
                <a :class="item.departmentCategoryId==departmentCategoryId?'active':''" v-text="item.name" @click="setDepar(item.departmentCategoryId)"></a>
            </li>
          </ul>
          <div class="categories-box">
            <div class="categories-box-innner">
              <div class="classify-ad" >
                <a :href="adHref">
                  <img :src="adImg" />
                </a>
              </div>
              <ul>
                <li v-for="(item,index) in getChildren()" :key="index">
                  <a class="categories-link" :href="checkItem(item)">
                    <div class="categories-img">
                      <img :src="item.adImageUrl" onerror="imgError(this);" />
                    </div> 
                    <span v-text="item.name"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <!-- <nav-footer active='2' /> -->
    </div>
</template>

<script>
import search from "@/components/home/search";
import navFooter from "@/components/public/navFooter";
import helmet from "@/components/public/helmet.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      classNameList: [],
      departmentCategoryId: "",
      adImg: "",
      adHref: ""
    };
  },
  components: {
    search,
    navFooter,
    helmet
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" });
    },
    setDepar(categoryId) {
      this.departmentCategoryId = categoryId;
    },
    getChildren() {
      let arr = [];
      for (let i = 0; i < this.classNameList.length; i++) {
        let item = this.classNameList[i];
        if (item.departmentCategoryId == this.departmentCategoryId) {
          arr = item.children;
          this.adImg = item.adImageUrl;
          if (item.adType == 10) {
            this.adHref = item.adUrl;
          } else {
            this.adHref = `#/productDetil/${item.adProductId}/${
              item.adMerchantBasicId
            }`;
          }
          break;
        }
      }
      return arr;
    },
    checkItem(item) {
      let href = "";
      if (item.adType == 10) {
        href = item.adUrl;
      } else {
        href = `#/productDetil/${item.adProductId}/${item.adMerchantBasicId}`;
      }
      return href;
    }
  },
  created() {
    this.api.home.departmentCategory().then(data => {
      // if (data.code == "200") {
      this.classNameList = data;
      if (this.classNameList.length > 0) {
        this.departmentCategoryId = this.classNameList[0].departmentCategoryId;
      }
      // } else {
      //   Toast(data.message);
      // }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.classify {
  background-color: #ffffff;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  .categories-banner {
    //padding-top: pxToRem(73px);
    a,
    img {
      display: block;
      width: 100%;
    }
  }
  .active {
    color: #26a2ff;
    background: #fff;
    border-left: 2px solid #26a2ff;
  }
  .categories-content {
    zoom: 1;
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    position: absolute;
    // bottom: pxToRem(105px);
    bottom: 0;
    top: pxToRem(165px);
  }
  .categories-list {
    height: 100%;
    overflow: auto;
    padding-bottom: pxToRem(117px);
    width: 25%;
    float: left;
    -webkit-overflow-scrolling: touch;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    font-size: pxToRem(27px);
    background-color: #f3f3f3;
    li {
      height: pxToRem(85px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    a {
      height: pxToRem(85px);
      line-height: pxToRem(85px);
      padding: 0 pxToRem(26px);
      color: #333;
      display: block;
      overflow: hidden;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .categories-box {
    width: 70%;
    height: 100%;
    overflow-y: auto;
    padding: 0 0 0 pxToRem(19px);
    background: #fff;
    h3 {
      color: #333;
      height: pxToRem(100px);
      line-height: pxToRem(100px);
      font-size: pxToRem(36px);
      padding: 0;
      border-bottom: 1px solid #f3f3f3;
    }
    ul {
      overflow: hidden;
      background: #fff;
      padding: pxToRem(16px) pxToRem(26px) 0 0;
      font-size: pxToRem(25px);
    }
    li {
      float: left;
      width: 33.33333%;
      text-align: center;
      margin-bottom: pxToRem(20px);
      display: block;
      overflow: hidden;
      span {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: pxToRem(50px);
        line-height: pxToRem(50px);
      }
    }
    .categories-img {
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .classify-ad {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.categories-link {
  color: #000;
}

.search {
  position: relative;
  background: #f0f0f0;
}

.class-search-box {
  overflow: hidden;
  background: #f0f0f0;
  z-index: 1;
  height: pxToRem(90px);
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.search-content {
  flex: 0.8;
  height: pxToRem(60px);
  width: 60%;
  margin: auto;
  text-align: center;
  background: #fff;
  border-radius: pxToRem(90px);
  overflow: hidden;
  line-height: pxToRem(20px);
  position: relative;
  & > input {
    height: 90%;
    font-size: pxToRem(25px);
    border: none;
    width: 85%;
    outline: none;
    margin-top: pxToRem(5px);
  }
  i {
    font-size: pxToRem(25px);
    position: absolute;
    left: pxToRem(10px);
    top: pxToRem(25px);
  }
}

.search-btn {
  margin-top: pxToRem(15px);
  flex: 0.2;
  margin-left: pxToRem(15px);
  width: pxToRem(100px);
  height: pxToRem(60px);
  text-align: center;
  color: #fff;
  line-height: pxToRem(60px);
  border-radius: 4px;
  background: #28b2f9;
  font-size: pxToRem(25px);
}
</style>

