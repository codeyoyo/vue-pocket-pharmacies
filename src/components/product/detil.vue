<template>
    <div class="detil">
        <div id="detilHead" :class="headClass">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">说明书</mt-tab-item>
                <mt-tab-item id="2">图文详情</mt-tab-item>
                <mt-tab-item id="3">用户评论(83)</mt-tab-item>
            </mt-navbar>
        </div>
        
        <div id="deilContent" :class="contentClass">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="instruction-manual">
                        <dl>
                            <dt>药品名称：</dt>
                            <dd>通用名称：{{data.commonName}}</dd>
                            <dd>商品名称：{{data.productName}}</dd>
                            <dd>拼音全码：{{data.pinyinFullCode}}</dd>
                        </dl>
                        <dl>
                            <dt>主要成分：</dt>
                            <dd>{{data.mainIngredients}}</dd>
                        </dl>
                        <dl>
                            <dt>性状：</dt>
                            <dd>
                                {{data.character}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>适应症/功能主治：</dt>
                            <dd>{{data.majorFunction}}</dd>
                        </dl>
                        <dl>
                            <dt>规格型号：</dt>
                            <dd>{{data.specifications}}</dd>
                        </dl>
                        <dl>
                            <dt>用法用量：</dt>
                            <dd>{{data.dosage}}</dd>
                        </dl>
                        <dl>
                            <dt>不良反应：</dt>
                            <dd>
                                {{data.reactions}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>禁忌：</dt>
                            <dd>
                                {{data.contraindication}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>注意事项：</dt>
                            <dd>
                                {{data.precautions}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>药物相互作用：</dt>
                            <dd>
                                {{data.drugInteractions}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>贮藏：</dt>
                            <dd>
                                {{data.storageCondition}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>包装：</dt>
                            <dd>
                                {{data.packageSpecification}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>有效期：</dt>
                            <dd>
                                {{data.validDate}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>批准文号：</dt>
                            <dd>
                                {{data.approvalCode}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>生产企业：</dt>
                            <dd>
                                {{data.manufacturerName}}
                            </dd>
                        </dl>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="detil-imgs" v-for="(item,index) in imgList" :key="index">
                        <img :src="item">
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div class="comments">
                        <div class="evalute-all">
                            <p class="evalute-good">93%
                            <a>好评率</a>
                            </p>
                            <p class="evalute-whole">
                                整体评价：
                                <ul class="evalute-star">
                                    <li>
                                        <i class="icon icon-star-score-on"></i></li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i>
                                    </li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i>
                                    </li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i></li>
                                    <li>
                                        <i class="icon icon-star-score-off"></i>
                                    </li>
                                </ul>
                            </p>
                        </div>
                        <ul class="comment-list">
                            <li class="comment-item" v-for="(item,index) in 10" :key="index">
                                <ul class="comment-star">
                                    <li>
                                        <i class="icon icon-star-score-on"></i></li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i>
                                    </li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i>
                                    </li>
                                    <li>
                                        <i class="icon icon-star-score-on"></i></li>
                                    <li>
                                        <i class="icon icon-star-score-off"></i>
                                    </li>
                                </ul>
                                <p class="comment-text">好大一罐，这次喝完下次还来买</p>
                                <div class="comment-autor">
                                    <span>DAISY</span>
                                    <span>2017-11-17 15:55</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="tabs-footer">
            <button id='moreBtn' class="footer-text" v-show="!isMore" @click="down()">
                <span>更多内容</span>
                <i class="icon icon-detail-down" ></i>
            </button>
            <button class="footer-text" v-show="isMore" @click="up()">
                <span>点击收回</span>
                <i class="icon icon-detail-up" ></i>
            </button>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["getDosage"],
  data() {
    return {
      selected: "1",
      isMore: true,
      contentClass: "",
      headTop: 0,
      headClass: "",
      data: {},
      imgList: [],
      hTop: 0
    };
  },
  watch: {
    selected(n) {
      this.down();
    }
  },
  methods: {
    down() {
      this.isMore = true;
      this.contentClass = "";
      setTimeout(() => {
        let forTop = this.headTop - 100;
        document.getElementById("mainContent").scrollTop = forTop;
        document.documentElement.scrollTop = document.body.scrollTop = forTop;
      }, 100);
    },
    up() {
      this.isMore = false;
      this.contentClass = "detil-up";
    },
    handleScroll() {
      let scrollTop = document.getElementById("mainContent").scrollTop;
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      let matchTop = this.hTop - 50;
      if (scrollTop >= matchTop || osTop >= matchTop) {
        this.headClass = "head-fixed";
      } else {
        this.headClass = "";
      }
    }
  },
  mounted() {
    this.hTop = document.getElementById("detilHead").offsetTop;
    let head = document.getElementById("deilContent");
    this.headTop = head.offsetTop;
    window.onscroll = () => {
      this.handleScroll();
    };
    document.getElementById("mainContent").onscroll = () => {
      this.handleScroll();
    };
  },
  created() {
    this.productId = this.$route.params.productId;
    this.api.goods.productManual(this.productId).then(data => {
      if (data.code == "200") {
        this.data = data.model;
        this.getDosage && this.getDosage(this.data.dosage);
      } else {
        Toast(data.message);
      }
    });
    this.api.goods.productImages(this.productId).then(data => {
      if (data.code == "200") {
        this.imgList = data.model;
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.detil {
  background-color: #ffffff;
}

.instruction-manual {
  padding-top: (30px);
  dl {
    padding: 0 pxToRem(20px);
    margin-top: pxToRem(20px);
  }
  dt {
    font-size: pxToRem(24px);
    color: #666;
  }
  dd {
    font-size: pxToRem(22px) !important;
    color: #999;
    padding: pxToRem(15px) 0;
  }
}

.tabs-footer {
  width: 100%;
  height: pxToRem(76px);
  line-height: pxToRem(76px);
  margin-top: 10px;
  border-top: 1px solid #eee;
  font-size: pxToRem(25px);
  text-align: center;
  color: #666;
  user-select: none;
  .footer-text {
    width: 100%;
    border: none;
    background: #fff;
    height: 100%;
    user-select: none;
    span {
      font-size: pxToRem(25px);
    }
  }
}

.detil-up {
  overflow: hidden;
  height: pxToRem(320px);
}

.detil-dow {
  overflow: hidden;
}
.head-fixed {
  position: fixed;
  top: pxToRem(70px);
  left: 0;
  z-index: 555;
  width: 100%;
}

.detil-imgs {
  margin-top: pxToRem(20px);
  img {
    width: 100%;
  }
}

.evalute-all {
  margin-left: 10px;
  color: #6b6868;
  overflow: hidden;
  height: pxToRem(90px);
  line-height: pxToRem(90px);
  border-bottom: 1px solid #eee;
}

.evalute-good {
  color: #ff6464;
  font-weight: 700;
  font-size: pxToRem(25px);
  float: left;
  a {
    color: #666;
  }
}

.evalute-whole {
  float: right;
  padding-right: 10px;
  font-size: pxToRem(25px);
  line-height: pxToRem(80px);
}

.evalute-star {
  display: inline-block;
  vertical-align: top;
  margin-top: pxToRem(10px);
  li {
    float: left;
  }
  .icon {
    width: pxToRem(40px);
    height: pxToRem(40px);
  }
}

.comment-list {
  padding-left: pxToRem(20px);
}

.comment-item {
  border-bottom: 1px solid #e2e2e2;
  padding: 0 pxToRem(20px) pxToRem(30px) 0;
}

.comment-star {
  width: 100%;
  overflow: hidden;
  margin-bottom: pxToRem(20px);
  li {
    float: left;
    i {
      width: pxToRem(30px);
      height: pxToRem(30px);
    }
  }
}

.comment-text {
  font-size: pxToRem(25px);
  color: #666;
  margin-bottom: 5px;
}

.comment-autor {
  color: #666;
  font-size: pxToRem(22px);
  overflow: hidden;
  margin-top: pxToRem(10px);
  span {
    &:first-of-type {
      float: left;
    }
    &:last-of-type {
      float: right;
    }
  }
}
</style>

