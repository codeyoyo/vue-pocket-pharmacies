<template>
  <div class="check-refund">
        <helmet title="查看退款" :show-right='true' />
        <section>
            <div class="refund-status">
                <div>
                    <i class="icon icon-fail"></i>
                </div>
                <p>已取消</p>
            </div>
            <div class="event-line">
                <ul class="list">
                    <li>
                        <div class="line-item">
                            <span class="line-circle"></span>
                            <p class="line-text">退款失败</p>
                            <p class="line-time">2018-1-28 15:42</p>
                        </div>
                    </li>
                    <li >
                        <div class="line-item">
                            <span class="line-circle"></span>
                            <p class="line-text">已审核待退款</p>
                            <p class="line-time">2018-1-28 15:41</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            <ul class="refund-info">
                <li>
                    <span class="label">退款金额：</span>
                    <span class="text">￥12.00</span>
                </li>
                <li>
                    <span class="label">退款理由：</span><span class="text">不想买了</span>
                </li>
                <li>
                    <span class="label">退款说明：</span>
                    <span class="text"></span>
                </li>
                <li>
                    <span class="label">订单编号：</span>
                    <span class="text">8818028806591969</span>
                </li>
            </ul>
        </section>

        <div class="footer" v-if="false">
            <p>如需帮助请拨打</p>
            <p>健客服务热线：
            <a href="tel:4006666888" class="phone">400-6666-888</a>
            </p>
        </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import helmet from "@/components/public/helmet";
export default {
  name: "checkRefund",
  components: {
    helmet
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.refund-status {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: pxToRem(30px) 0;
  .icon {
    width: pxToRem(120px);
    height: pxToRem(120px);
  }
  p {
    margin-top: pxToRem(10px);
  }
}

.list {
  padding: 0 pxToRem(20px) 0 pxToRem(40px);
  background: #fff;

  .line-item {
    color: #999;
    margin-left: pxToRem(40px);
    border-bottom: 1px solid #e3e3e3;
    padding: pxToRem(20px) 0;
  }

  .line-circle {
    width: pxToRem(26px);
    height: pxToRem(26px);
    background: #ccc;
    left: pxToRem(-12px);
    display: inline-block;
    border-radius: 100%;
    position: absolute;
  }

  li {
    position: relative;
    &:before {
      content: "";
      height: 100%;
      border-left: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: pxToRem(30px);
    }
    &:last-of-type {
      &:before {
        border: none;
      }
    }
    &:first-of-type {
      .line-item {
        color: inherit;
      }
      .line-circle {
        @extend .line-circle;
        background: #06a6f8;
        -webkit-box-shadow: 0 0 0 3px #89d7ff;
        box-shadow: 0 0 0 3px #89d7ff;
      }
    }
    p {
      padding-bottom: pxToRem(10px);
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}

.refund-info {
  margin-top: pxToRem(30px);
  background: #fff;
  padding-bottom: pxToRem(20px);

  li {
    border-bottom: 1px solid #eee;
    padding: pxToRem(20px) pxToRem(30px);
    display: flex;
  }

  .label {
    flex: 0 0 pxToRem(150px);
    color: #777;
  }

  .text {
    color: #222;
    flex: 1 auto;
    word-wrap: break-word;
    word-break: break-all;
  }
}

.footer {
  text-align: center;
  background: #fff;
  padding-bottom: pxToRem(20px);

  p {
    line-height: pxToRem(40px);
  }
}
</style>


