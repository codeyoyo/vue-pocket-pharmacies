<template>
    <div class="confine" v-show="showSpike">
        <div class="confine-title">
          <!-- <div class="skillt-l fl">
            <img src="http://res.360kad.com/theme/mobile/img/m_index/skill-logo1.png" alt="" onerror="imgError(this);"/>
          </div> -->
          <div class="skillt-m fl" id="skill_timeout">
            {{model.name}}
          </div>
          <a class="skillt-r fr">
            {{word}}倒计时 <span>{{hours}}</span>:<span>{{minutes}}</span>:<span>{{seconds}}</span>
          </a>
        </div>
        <product-list>
            <a v-for="(item,index) in model.promotionProductInfos" class="confine-item" :key="index" :href="'#/productDetil/'+item.productCode+'/'+item.merchantBasicId">
                <div class="skill-img">
                    <img :src="item.img" />
                    <!-- <span class="skill-promotion">{{item.discount}}折</span> -->
                </div>
                <div class="skill-productName">
                  {{item.productName}}
                </div>
                <div class="skill-vipprice">
                    ￥<span v-text="item.promotionPrice"></span>
                </div>
                <div class="skill-marprice">
                  ￥{{item.sellingPrice}}
                </div>
            </a>
        </product-list>
    </div>
</template>

<script>
import productList from "../public/product-list";
import { Toast } from "mint-ui";
export default {
  components: {
    productList
  },
  data() {
    return {
      model: {},
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      word: "开始",
      showSpike: true
    };
  },
  methods: {
    leftTimer() {
      let startTime = new Date(this.model.startTime);
      let endTime = new Date(this.model.endTime);
      let now = new Date();
      let leftTime = 1;
      let hasMatch = false;
      if (startTime > now) {
        leftTime = startTime - now; //计算剩余的毫秒数
        this.word = "开始";
        hasMatch = true;
      } else {
        if (endTime > now) {
          leftTime = endTime - now; //计算剩余的毫秒数
          this.word = "结束";
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        this.days = "00";
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
      } else {
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
        var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
        var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
        this.days = this.checkTime(days);
        this.hours = this.checkTime(hours);
        this.minutes = this.checkTime(minutes);
        this.seconds = this.checkTime(seconds);
      }
    },
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    matchTime() {
      setInterval(() => {
        this.leftTimer(this.model.startTime);
      }, 1000);
    }
  },
  created() {
    this.api.home.spikeProduct().then(data => {
      if (data.code == 500) {
        this.showSpike = false;
        return;
      }
      if (data.code == "200") {
        this.model = data.model;
        this.matchTime();
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.confine {
  margin-top: pxToRem(30px);
  background: white;
  overflow: hidden;
  padding-top: pxToRem(5px);
  .confine-title {
    height: pxToRem(80px);
    padding: pxToRem(10px);
    overflow: hidden;
    line-height: pxToRem(60px);
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .skillt-l,
  .skillt-m,
  .skillt-r {
    height: pxToRem(60px);
    font-size: pxToRem(30px);
  }
  .skillt-r {
    height: pxToRem(60px);
    font-size: pxToRem(30px);
    color: #000;
    font-size: pxToRem(28px);
    margin-right: pxToRem(15px);
    margin-top: pxToRem(3px);
    span {
      font-size: pxToRem(25px);
      border-radius: pxToRem(5px);
      background-color: #000;
      color: #ffffff;
      text-align: center;
      box-sizing: border-box;
      display: inline-block;
      height: pxToRem(40px);
      line-height: pxToRem(40px);
      padding: 0px pxToRem(5px);
      margin-left: pxToRem(5px);
      margin-right: pxToRem(5px);
    }
  }
  .skillt-l {
    img {
      width: pxToRem(150px);
      height: pxToRem(50px);
    }
  }
  .skillt-m {
    margin-left: pxToRem(10px);
  }
  .confine-item {
    width: pxToRem(170px);
    height: pxToRem(285px);
    display: inline-block;
    text-align: center;
    overflow: hidden;
    margin-left: pxToRem(20px);
    padding-right: pxToRem(5px);
    border-right: 1px solid #eee;
    &:first-child {
      margin-left: pxToRem(10px);
    }
  }

  .skill-img {
    position: relative;
    overflow: hidden;
    width: pxToRem(166px);
    height: pxToRem(190px);
    img {
      width: 100%;
      height: 100%;
    }
    .skill-promotion {
      background-color: #ff970f;
      color: white;
      font-size: pxToRem(14px);
      width: pxToRem(55px);
      height: pxToRem(22px);
      line-height: pxToRem(22px);
      text-align: center;
      position: absolute;
      bottom: pxToRem(25px);
      right: 0;
      border-top-left-radius: pxToRem(50px);
      border-bottom-left-radius: pxToRem(50px);
      background: linear-gradient(left, #fe5d3a 0%, #ff2b67 100%);
    }
  }
  .skill-vipprice {
    color: #fd3f3f;
    font-size: pxToRem(18px);
    margin-top: pxToRem(10px);
    span {
      font-size: pxToRem(25px);
    }
  }
  .skill-marprice {
    font-size: pxToRem(20px);
    color: #b5b5b5;
    text-decoration: line-through;
  }
}

.skill-productName {
  width: pxToRem(166px);
  overflow: hidden;
  color: #000;
  margin-top: pxToRem(5px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: pxToRem(30px);
  line-height: pxToRem(30px);
}
</style>


