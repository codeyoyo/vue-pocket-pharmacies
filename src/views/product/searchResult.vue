<template>
  <div class="search-result">
      <helmet title="搜索结果" url="/search" show-right="true"></helmet>
      <div class="search">
        <div class="search-text-result">
          <input @click="back();" class="search-input-result" v-model="keyWorld" onfocus="this.value = ''" />
        </div>
        <div class="search-switch">
          <a class="search-switch-btn" :class="switchClass" @click="switchAction()"></a>
        </div>
      </div>
      <div class="no-data" v-if="dataList.length==0">
        <div class="moreTips">
          <p>没有找到想要的商品？</p>
        </div>
        <a class="see-btn" href="#/">去看看</a>
      </div>
      <top-wrap />
      <blocks-list :data-list='dataList' v-show='showType==1' />
      <link-list :data-list='dataList' v-show="showType==2" />
  </div>
</template>

<script>
import helmet from "../../components/public/helmet.vue";
import footerDom from "../../components/public/footer.vue";
import blocksList from "../../components/searchResult/blocks-list";
import topWrap from "../../components/public/top-wrap";
import linkList from "../../components/searchResult/link-list";
import { Toast } from "mint-ui";
export default {
  components: {
    name: "searchResult",
    helmet,
    footerDom,
    blocksList,
    topWrap,
    linkList
  },
  data() {
    return {
      dataList: [],
      switchClass: "search-switch1",
      showType: 1,
      keyWorld: ""
    };
  },
  methods: {
    switchAction() {
      if (this.switchClass == "search-switch1") {
        this.switchClass = "search-switch2";
        this.showType = 2;
      } else {
        this.switchClass = "search-switch1";
        this.showType = 1;
      }
    },
    back() {
      this.$router.push("/search");
    }
  },
  created() {
    this.keyWorld = this.$route.params.keyword;
    this.api.home.search(this.keyWorld).then(data => {
      if (data.code == "200") {
        this.dataList = data.model.products;
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.search {
  padding: pxToRem(20px);
  overflow: hidden;
  background-color: #ffffff;
  .search-text-result {
    width: 87.6%;
    float: left;
    height: pxToRem(63px);
  }

  .search-input-result {
    height: pxToRem(63px);
    border-radius: pxToRem(5px);
    width: 100%;
    background: #eeeeee url(../../assets/search.png) no-repeat pxToRem(22px);
    background-size: 5%;
    text-indent: pxToRem(65px);
    vertical-align: top;
    border: 1px solid #eeeeee;
    font-size: pxToRem(24px);
  }

  .search-switch {
    float: right;
    width: 10%;
    margin: pxToRem(13px) 0 0 2%;
  }

  .search-switch-btn {
    background-repeat: no-repeat;
    background-size: 100%;
    height: pxToRem(40px);
    width: pxToRem(40px);
    margin: 0 auto;
    display: block;
  }
  .search-switch1 {
    background-image: url(../../assets/search_switch1.jpg);
  }
  .search-switch2 {
    background-image: url(../../assets/search_switch2.jpg);
  }
}

.no-data {
  text-align: center;
  font-size: pxToRem(30px);
}

.moreTips {
  text-align: center;
  margin-top: pxToRem(150px);
  color: #999;
  background: #eee;
  p {
    text-align: center;
  }
}
.see-btn {
  height: pxToRem(58px);
  line-height: pxToRem(58px);
  width: pxToRem(173px);
  cursor: pointer;
  border: 1px solid #26a2ff;
  color: #26a2ff;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: inline-block;
  margin-top: pxToRem(33px);
  font-size: pxToRem(30px);
  text-decoration: none;
}
</style>
