<template>
  <div class="user-like">
    <advert :only-id='id' />
    <div class="like-top">
        <div class="top-name">猜你喜欢</div>
        <div class="top-like"></div>
    </div>
    <div class="like-content" infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" v-infinite-scroll="loadMore">
      <div v-for="(item,index) in dataList" class="like-row" :key="index">
        <a class="like-item" v-for="(temp,idx) in item" :key="idx" :href="'#/productDetil/'+temp.productId+'/'+temp.merchantId">
          <div class="like-img">
            <img v-lazy="temp.productImg"/>
          </div>
          <p class="likepro-name">
            {{temp.productName}}{{temp.productSpecifications}}
          </p>                                            
          <div class="likepro-price">
            <span class="fl">
              ￥<span v-text="temp.sellingPrice"></span>
            </span>
            <span class="fr">
              ￥{{temp.discountPrice}}
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
import { Swipe, SwipeItem, InfiniteScroll, Lazyload, Toast } from "mint-ui";
import advert from "./advert";
function buildData(dataList) {
  let temArray = [];
  let resultArray = [];
  for (let i = 0; i < dataList.length; i++) {
    let item = dataList[i];
    temArray.push(item);
    if (temArray.length == 2) {
      resultArray.push(temArray);
      temArray = [];
    }
  }
  if (temArray.length > 0) {
    resultArray.push(temArray);
  }
  return resultArray;
}
export default {
  data() {
    return {
      loading: false,
      pageCount: 1,
      pageIndex: 1,
      dataList: [],
      id: ""
    };
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem,
    InfiniteScroll,
    advert
  },
  methods: {
    loadMore() {
      if (this.pageCount > this.pageIndex) {
        this.loading = true;
        this.api.home.recomendProduct(this.pageIndex).then(data => {
          this.loading = false;
          this.pageIndex = data.pageeIndex;
          this.pageCount = data.pageCount;
          let list = buildData(data.dataList);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            this.dataList.push(item);
          }
        });
      }
    }
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
    this.api.home.recomendProduct(this.pageIndex).then(data => {
      this.pageIndex = data.pageeIndex;
      this.pageCount = data.pageCount;
      this.dataList = buildData(data.dataList);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.user-like {
  overflow: hidden;
  margin-top: pxToRem(30px);
  .like-top {
    position: relative;
    height: pxToRem(80px);
    color: #888888;
    .top-name,
    .top-like {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      margin: auto;
    }
    .top-name {
      font-size: pxToRem(30px);
      width: 50%;
      text-align: right;
      height: pxToRem(40px);
      width: 23%;
      background: #eeeeee
        url(http://res4.360kad.com/theme/mobile/img/m_index/likestar.png)
        no-repeat pxToRem(10px) pxToRem(5px);
      background-size: pxToRem(30px);
      z-index: 2;
    }
    .top-like {
      height: pxToRem(5px);
      background-color: #e0e0e0;
      position: absolute;
      z-index: 1;
      width: 80%;
    }
  }
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
      height: pxToRem(355px);
      &:last-child {
        margin-left: 2%;
      }
      &:first-child {
        margin-left: 0;
      }
      .like-img {
        width: pxToRem(238px);
        height: pxToRem(238px);
        margin: pxToRem(10px) auto 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .likepro-name {
        margin-top: pxToRem(20px);
        font-size: pxToRem(25px);
        color: #222;
        height: pxToRem(35px);
        line-height: pxToRem(35px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
}
</style>


