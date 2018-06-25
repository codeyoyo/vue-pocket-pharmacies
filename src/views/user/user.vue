<template>
  <div class="user">
        <helmet title="我的药居士" backText="设置" backUrl="account" :show-right='true' :rightShow='true' rightText='退出' :rightFunc='quit' />
        <section class="user-info">
            <div class="user-avatar">
                <a class="" href="#/account">
                    <img src="../../assets/doctor.png" alt="">
                </a>
            </div>
            <p>
                <a class="user-name">{{accoutInfo.nickName}}</a>
            </p>
            <div class="my-num">
                <div class="num-item">
                    <div class="num">0</div>
                    <div class="descript">我的健康币</div>
                </div>
                <div class="num-item">
                    <div class="num">0</div>
                    <div class="descript">我的优惠劵</div>
                </div>
                <div class="num-item">
                    <div class="num">0</div>
                    <div class="descript">我的足迹</div>
                </div>
            </div>
        </section>
        <section class="user-order">
            <div class="my-order">
                <a>我的订单</a>
                <a class="all-order" href="#/userOrder">
                    查看全部订单
                </a>
            </div>
            <ul class="order-type">
                <li>
                    <a class="type-item" href="#/userOrder/10">
                        <i class="icon icon-wait-pay"></i>
                        待付款
                    </a>
                </li>
                <li>
                    <a class="type-item" href="#/userOrder/100">
                        <i class="icon icon-wait-send"></i>
                        待发货
                    </a>
                </li>
                <li>
                    <a class="type-item" href="#/userOrder/200">
                        <i class="icon icon-delivery"></i>
                        待收货
                    </a>
                </li>
                <li>
                    <a class="type-item" href="#/userOrder/4">
                        <i class="icon icon-evaluate"></i>
                        待评价
                    </a>
                </li>
            </ul>
        </section>
        <section class="user-order">
            <ul class="order-type">
                <li>
                    <a class="type-item">
                        <i class="icon icon-collection-color"></i>
                        我的收藏
                    </a>
                </li>
                <li>
                    <a class="type-item">
                        <i class="icon icon-prizes-color"></i>
                        我的奖品
                    </a>
                </li>
                <li>
                    <a class="type-item">
                    <i class="icon icon-hongbao"></i>
                        分享有礼
                    </a>
                </li>
                <li>
                    <a class="type-item">
                    <i class="icon icon-exchange-color"></i>
                        兑换中心
                    </a>
                </li>
            </ul>
             <ul class="order-type">
                <li>
                    <a class="type-item">
                        <i class="icon icon-consultation-color"></i>
                        在线客服
                    </a>
                </li>
                <li>
                    <a class="type-item">
                        <i class="icon icon-feedback"></i>
                        意见反馈
                    </a>
                </li>
                <li>
                    <a class="type-item">
                        <i class="icon icon-common-problem"></i>
                        常见问题
                    </a>
                </li>
                <li>
                    <a class="type-item">
                        <i class="icon icon-address"></i>
                        地址管理
                    </a>
                </li>
            </ul>
        </section>
        <nav-footer active='4' />
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import navFooter from "@/components/public/navFooter";
import { Toast } from "mint-ui";
export default {
  components: {
    helmet,
    navFooter
  },
  methods: {
    quit() {
      this.$store.dispatch("removeOrderAffirm");
      this.$store.dispatch("removeJwt");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      accoutInfo: {}
    };
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.api.user.accoutnInfo().then(data => {
        if (data.code == "200") {
          this.accoutInfo = data.model;
        } else {
          Toast(data.message);
        }
      });
    } else {
      if (this.$store.getters.router.fromPath == "/login") {
        this.$router.push("home");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.user-info {
  padding-top: pxToRem(40px);
  background: #77c4f4;
  position: relative;
  text-align: center;
  p {
    margin-bottom: pxToRem(15px);
    font-size: pxToRem(23px);
    color: #fff;
  }
  .login-reg {
    font-size: pxToRem(32px);
    margin-top: pxToRem(20px);
    a {
      color: #fff;
    }
  }
}

.user-avatar {
  width: pxToRem(150px);
  height: pxToRem(150px);
  -webkit-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  -webkit-box-shadow: 0 0 6px #67a9d3;
  box-shadow: 0 0 6px #67a9d3;
  background: #fff;
  margin-bottom: pxToRem(10px);
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  img {
    width: 100%;
  }
}

.user-order {
  background: #fff;
  margin-bottom: pxToRem(20px);
  .my-order {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: pxToRem(20px) pxToRem(20px);
    height: pxToRem(44px);
    line-height: pxToRem(44px);
    border-bottom: 1px solid #eee;
    a {
      display: inline-block;
      -webkit-box-flex: 1;
      -webkit-flex: auto;
      -ms-flex: auto;
      flex: auto;
      font-size: pxToRem(25px);
    }
  }
  .all-order {
    display: inline-block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: right;
    color: #666;
  }
  .order-type {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  li {
    float: left;
    width: 25%;
    text-align: center;
    font-size: pxToRem(22px);
  }
  .type-item {
    padding: pxToRem(20px) 0;
    color: #666;
    width: 100%;
    display: inline-block;
    vertical-align: top;
    position: relative;
    i {
      display: block;
      width: pxToRem(60px);
      height: pxToRem(60px);
      margin: 0 auto;
      margin-bottom: pxToRem(10px);
    }
  }
}

.my-num {
  color: #fff;
  font-size: pxToRem(30px);
  display: flex;
  padding: pxToRem(20px) 0;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: pxToRem(20px);
  .num-item {
    flex: 1;
  }
  .num {
    font-size: pxToRem(40px);
  }
  .descript {
    margin-top: pxToRem(20px);
  }
}

.user-name {
  font-size: pxToRem(23px);
}
</style>


