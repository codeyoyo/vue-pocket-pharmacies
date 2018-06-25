<template>
    <div class="evaluate">
        <helmet title="评价" :show-right='true' />
        <section>
          <div class="product-item">
            <div>
              <div class="item-contain">
                  <span class="info-image">
                      <img src="https://img.jianke.com/suo//upload/prodimage/201710/20171028104531171!100x100.jpg" alt="" />
                  </span>
                  <span class="info-name">
                    <p class="name">医用棉签(恩惠)</p>
                    <p class="type">规格：10cm/支*50支</p>
                    <p class="rate">评分：
                      <a class="rate-link">
                        <span class="star" v-for="(item,index) in startGroup" :key="index" @click="startChange(item)">
                          <i class="icon" :class="startNum>=item?'icon-star-score-on':'icon-star-score-off'"></i>
                        </span>
                      </a>
                    </p>
                  </span>
              </div>
              <textarea placeholder="欢迎吐槽~" class="evaluate-text" v-model="evaluateVal"></textarea>
            </div>
          </div>
        </section>
        <div class="bar"><button>评价</button></div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import helmet from "@/components/public/helmet";
export default {
  name: "evaluate",
  components: {
    helmet
  },
  data() {
    return {
      startGroup: 5,
      startNum: 0,
      evaluateVal: ""
    };
  },
  methods: {
    startChange(index) {
      if (this.startNum >= index) {
        this.startNum = index - 1;
      } else {
        this.startNum = index;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.evaluate {
  background-color: #fff;
  section {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    padding: pxToRem(24px);
    padding-bottom: pxToRem(100px);
  }

  .product-item {
    width: 100%;
    overflow: hidden;
    margin-bottom: pxToRem(30px);
  }

  .item-contain {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: pxToRem(10px);
  }

  .info-image {
    flex: 0 0 pxToRem(140px);
    display: inline-block;
    width: pxToRem(140px);
    height: pxToRem(140px);
    border: 1px solid #e3e3e3;
    img {
      width: 100%;
    }
  }

  .info-name {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    padding: 0 pxToRem(15px);
    display: inline-block;
    width: 100%;

    p {
      margin-bottom: pxToRem(10px);
      color: #555;
    }

    .name {
      height: pxToRem(40px);
      line-height: pxToRem(40px);
    }

    .type {
      font-size: pxToRem(25px);
      word-wrap: break-word;
      word-break: break-all;
    }
  }

  .evaluate-text {
    width: 100%;
    height: pxToRem(180px);
    background: #eee;
    border-radius: 3px;
    box-sizing: border-box;
    padding: pxToRem(20px);
    border: none;
    font-size: pxToRem(28px);
    outline: none;
  }

  .bar {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: pxToRem(60px);
    line-height: pxToRem(60px);
    border-top: 1px solid #e3e3e3;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: pxToRem(15px) 0;
    button {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: #fff;
      background: #26a2ff;
      border: none;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      margin: 0 pxToRem(20px);
      font-size: pxToRem(30px);
    }
  }

  .rate {
    height: pxToRem(50px);
    line-height: pxToRem(50px);
  }
  .star {
    i {
      vertical-align: middle;
      width: pxToRem(30px);
      height: pxToRem(30px);
    }
  }
}
</style>