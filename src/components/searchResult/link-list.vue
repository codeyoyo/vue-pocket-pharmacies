<template>
    <div class="link-list">
        <div infinite-scroll-disabled="loading"
    infinite-scroll-distance="10" v-infinite-scroll="loadMore">
            <a class="like-item" v-for="(item,index) in dataList" :key="index" :href="'#/productDetil/'+item.productId+'/'+item.merchantId">
                <div class="like-img">
                    <img :src="item['productImg']"/>
                </div>
                <div class="like-content">         
                    <p class="likepro-name" v-text="item['productName']">
                    </p>
                    <p class="pro-ad">
                        规格：{{item['productSpecifications']}}
                    </p>
                    <p class="pro-ad">
                        厂商：{{item['merchantName']}}
                    </p>
                    <div class="likepro-price">
                        <span class="fl">
                            ￥<span v-text="item['discountPrice']"></span>
                        </span>
                        <span class="fr">
                            ￥{{item['sellingPrice']}}
                        </span>
                    </div>                    
                </div>                   
            </a>
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
    dataList(list){
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        this.productList.push(item);
      }
      console.log(this.productList);
    }
  },
  created () {
    let list=this.dataList;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      this.productList.push(item);
    }
    console.log(this.productList);
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.link-list {
  background-color: #ffffff;
  margin-top: pxToRem(10px);
  .like-item {
    display: block;
    overflow: hidden;
    border-bottom: 1px solid #b8b8b8;
    padding: pxToRem(10px) 0 pxToRem(30px) 0;
  }
  .like-content {
    float: right;
    width: 67.6%;
  }
  .like-img {
    width: 28.16%;
    height: pxToRem(180px);
    float: left;
    text-align: center;
    overflow: hidden;
    img {
      width: 98%;
      height: 100%;
    }
  }
  .likepro-name {
    font-size: pxToRem(24px);
    height: pxToRem(28px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #404040;
  }
  .pro-ad {
    color: #969494;
    margin: pxToRem(1px) 0;
    line-height: pxToRem(31px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: pxToRem(22px);
  }
  .likepro-price {
    overflow: hidden;
    margin-top: pxToRem(20px);
    .fl {
      float: left;
      font-weight: bold;
      color: #e4393c;
      font-size: pxToRem(36px);
    }
    .fr {
      float: right;
      color: #999;
      text-decoration: line-through;
      font-size: pxToRem(30px);
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
</style>