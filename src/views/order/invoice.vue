<template>
  <div class="invoice">
      <helmet title="发票信息" />
      <section class="invoice-content">
        <div class="invoice-tip">
          <div>
            <p>开具企业抬头发票，请务必准确填写“纳税人识别号”，以免影响到您的发票报销。
            </p>
          </div>
        </div>
        <div class="type part">
          <p class="title">发票类型</p>
          <ul class="type-list">
            <li class="type-item" :class="type==0?'active':''" @click="changeType(0)">
              不开发票
            </li>
            <li class="type-item" :class="type==2?'active':''" @click="changeType(2)">
              纸质发票
            </li>
            <li class="type-item" :class="type==1?'active':''" @click="changeType(1)">
              电子发票
            </li>
          </ul>
          <p>电子发票与纸质发票具有同等法律效应，可支持报销入账</p>
        </div>
        <div class="head part" v-show="type>0">
          <p class="title">发票抬头</p>
          <div class="radio-group">
            <label class="head-item">
              <mt-radio
                v-model="invoiceModel.invoiceTitleType"
                :options="raise">
              </mt-radio>
            </label>
          </div>
          <!-- <p class="head-input">
            <input type="text" placeholder="请输入企业全称" /><i class="tip">*</i>
          </p> -->
          <p class="head-input" v-show="invoiceModel.invoiceTitleType==2">
            <input type="text" placeholder="请输入纳税人识别号（数字或者字母）" v-model="invoiceModel.taxpayerId" />
            <i class="tip">*</i>
          </p>
        </div>
        <div class="head part" v-show="type==1">
          <p class="title">收票人信息</p>
          <p class="head-input">
            <input type="text" placeholder="请输入接收电子发票邮箱" v-model="invoiceModel.invoiceReceiveMail" />
          <i class="tip">*</i>
          </p>
        </div>
        <div class="content part" v-show="type>0">
          <p class="title">发票内容</p>
          <mt-radio
            v-model="invoiceModel.invoiceContentType"
            :options="invoiceContent">
          </mt-radio>
        </div>
      </section>
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import checkbox from "@/controls/checkbox";
export default {
  name: "invoice",
  components: {
    helmet,
    checkbox
  },
  data() {
    return {
      type: 2,
      invoiceContent: [
        {
          label: "明细",
          value: "1"
        },
        {
          label: "类别",
          value: "2"
        }
      ],
      raise: [
        {
          label: "个人",
          value: "1"
        },
        {
          label: "单位",
          value: "2"
        }
      ],
      invoiceModel: {
        invoiceType: 2,
        invoiceTitleType: "1",
        taxpayerId: "",
        invoiceContentType: "1",
        invoiceReceiveMail: ""
      }
    };
  },
  watch: {
    invoiceModel: {
      handler(newValue, oldValue) {
        this.$store.dispatch("saveInvoice", newValue);
      },
      deep: true
    }
  },
  methods: {
    changeType(t) {
      this.type = t;
      this.invoiceModel.invoiceType = t;
    }
  },
  created() {
    this.invoiceModel = this.$store.getters.invoice;
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.invoice-content {
  overflow: hidden;
}
.invoice-tip {
  position: absolute;
  p {
    padding: pxToRem(10px) pxToRem(20px);
    color: #f09656;
    background: #fffceb;
    font-size: pxToRem(22px);
    line-height: pxToRem(25px);
  }
}
.type {
  margin-top: pxToRem(100px);
}

.part {
  padding: pxToRem(20px);
  background: #fff;
  color: #777;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  p {
    margin-top: pxToRem(20px);
    font-size: pxToRem(20px);
  }
}

.title {
  font-size: pxToRem(25px) !important;
  color: #000;
  margin-bottom: pxToRem(20px);
}

.type-list {
  margin-bottom: pxToRem(10px);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: pxToRem(28px);
}

.type-item {
  padding: pxToRem(26px) 0;
  border: 1px solid #ccc;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 pxToRem(180px);
  -ms-flex: 0 1 pxToRem(180px);
  flex: 0 1 pxToRem(180px);
  text-align: center;
}

.active {
  border: 1px solid #2da2ff;
  color: #2da2ff;
}

.head-input {
  width: 100%;
  background: #eee;
  margin: pxToRem(20px) 0;
  padding: pxToRem(15px) 0;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  input {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    padding-left: pxToRem(20px);
    background: #eee;
    border: none;
    font-size: pxToRem(25px);
    outline: none;
  }
  i {
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 pxToRem(40px);
    -ms-flex: 0 1 pxToRem(40px);
    flex: 0 1 pxToRem(40px);
    color: #ff6464;
    text-align: center;
  }
}

.content-item {
  width: 100%;
  margin-bottom: pxToRem(20px);
  display: block;
}
</style>


