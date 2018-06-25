<template>
    <div class="blocks-list">
      <div class="like-content" infinite-scroll-disabled="loading"
infinite-scroll-distance="10" v-infinite-scroll="loadMore">
        <div v-for="(item,index) in productList" class="like-row" :key="index">
          <a class="like-item" v-for="(i,idx) in item" :key="idx" :href="'#/productDetil/'+i.productId+'/'+i.merchantId">
            <div class="like-img">
              <img :src="i['productImg']" onerror="imgError(this);"/>
            </div>                                            
            <p class="likepro-name" v-text="i['productName']+i['productSpecifications']">
            </p>                                            
            <div class="likepro-price">
              <span class="fl">
                ￥<span v-text="i['discountPrice']"></span>
              </span>
              <span class="fr">
                ￥{{i['sellingPrice']}}
              </span>
            </div>                                       
          </a>
        </div>
        <div v-show="loading" class="load">
          <div class="load-box">
            <span>
              正在努力为你加载更多...
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
export default {
  props: ["loading", "dataList", "loadMore"],
  components: {
    InfiniteScroll
  },
  data() {
    return {
      productList: []
    };
  },
  watch: {
    dataList(list) {
      let tempGroup = [];
      for (let i = 0; i < list.length; i++) {
        if (tempGroup.length >= 2) {
          tempGroup = [];
        }
        let item = list[i];
        tempGroup.push(item);
        this.productList.push(tempGroup);
      }
    }
  },
  created() {}
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.blocks-list {
  .like-content {
    .like-row {
      margin-top: pxToRem(10px);
      overflow: hidden;
    }
    .like-item {
      background-color: #ffffff;
      overflow: hidden;
      float: left;
      width: 46%;
      padding: 0 pxToRem(10px);
      text-align: center;
      text-decoration: none;
      &:last-child {
        margin-left: 2%;
      }
      .like-img {
        img {
          width: pxToRem(238px);
          height: pxToRem(238px);
        }
      }
      .likepro-name {
        font-size: pxToRem(25px);
        color: #222;
      }
      .likepro-price {
        overflow: hidden;
        height: pxToRem(50px);
        line-height: pxToRem(50px);
      }
      .fl {
        float: left;
        color: #fd3f3f;
        font-size: pxToRem(22px);
        margin-left: pxToRem(20px);
        span {
          font-size: pxToRem(32px);
        }
      }
      .fr {
        float: right;
        font-size: pxToRem(20px);
        color: #b5b5b5;
        text-decoration: line-through;
        margin-right: pxToRem(20px);
      }
    }
  }
}
.load {
  padding-top: pxToRem(20px);
  .load-box {
    width: 40%;
    margin: 0 auto;
    position: relative;
    height: pxToRem(40px);
  }
  .load-ionic {
    width: pxToRem(30px);
    overflow: hidden;
    display: inline-block;
  }
  span {
    font-size: pxToRem(23px);
    display: inline-block;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    color: #b8b8b8;
  }
}
</style>