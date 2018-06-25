<template>
  <div class="drawback">
    <helmet title="申请退款" :show-right='true' />
    <p class="tip">
    提交退款申请后不可撤销，本单享有的优惠一并取消，请谨慎操作。
    </p>
    <ul class="list">
        <li class="item">
            <span class="title">
                退款金额<a>*</a>：
            </span>
            <span class="label money">￥0</span>
        </li>
        <li class="item">
            <span class="title">
            退款理由<a>*</a>：
            </span>
            <span class="label">请选择退款理由</span>
            <i class="icon icon-down"></i>
        </li>
        <li class="item area">
            <span class="title">
            退款说明：
            </span>
            <textarea class="text"></textarea>
        </li>
    </ul>
    <div class="btn"><button>提交申请</button></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import helmet from "@/components/public/helmet";
export default {
  name: "drawback",
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
.tip {
  padding: pxToRem(30px) pxToRem(20px);
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: pxToRem(20px);
  line-height: pxToRem(30px);
}

.list {
  background: #fff;
  padding: 0 0 0 pxToRem(20px);
  border-top: 1px solid #e3e3e3;
}

.item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #e3e3e3;
  padding-right: 0.2rem;
  position: relative;
  i {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: pxToRem(10px);
  }
}

.area {
  height: auto;
  display: block;
  padding-right: 0.2rem;
  border: none;
}

.title {
  display: inline-block;
  flex: 0 auto;
  a {
    color: red;
    margin-left: pxToRem(10px);
  }
}

.text {
  width: 100%;
  height: 2rem;
  border: 1px solid #e3e3e3;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.2rem;
  background: #eee;
  color: #333;
  outline: none;
}

.btn {
  padding: 0.3rem 0.2rem;
  background: #fff;
  button {
    width: 100%;
    height: pxToRem(75px);
    line-height: pxToRem(75px);
    background: #39f;
    border: none;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    font-size: pxToRem(30px);
  }
}
</style>
