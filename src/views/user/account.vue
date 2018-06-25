<template>
    <div class="account">
        <helmet title="我的账户" :show-right='true' />
        <div class="user-item group">
            <span class="item-label">头像</span>
            <span class="item-text">
                <img class="avatar" src="../../assets/doctor.png" />
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        
        <div class="user-item common-item">
            <span class="item-label">昵称</span>
            <span class="item-text">
                <input type="text" placeholder="请输入姓名" v-model="accoutnInfo.nickName" @change="saveAccount" />
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="user-item common-item">
            <span class="item-label">姓名</span>
            <span class="item-text">
                <input type="text" placeholder="请输入姓名" v-model="accoutnInfo.realName" @change="saveAccount" />
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="user-item common-item" @click="showSex()">
            <span class="item-label">性别</span>
            <span class="item-text">
                <input type="text" readonly placeholder="请选择性别" v-model="accoutnInfo.sex" />
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="user-item">
            <span class="item-label">出生日期</span>
            <span class="item-text">
                <input type="text" id="birthDate" readonly placeholder="1970-01-1" data-lcalendar="1970-01-1,2018-12-31" v-model="accoutnInfo.birthday" />
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="user-item common-item" @click="setPwd()">
            <span class="item-label">密码设置</span>
            <span class="item-text">
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="user-item common-item" @click="goAddress()">
            <span class="item-label">收货地址</span>
            <span class="item-text valiable">
                {{addressInfo.province}}{{addressInfo.area}}{{addressInfo.city}}{{addressInfo.deliveryAddress}}
            </span>
            <span class="right-span">
                <i class="item-icon icon icon-right"></i>
            </span>
        </div>
        <div class="footer-box">
            <foot-box :need-match='true'/>
        </div>
       <sex :visible="sexVisible" :close="sexClose" />
       <date-controls dom="#birthDate" />
    </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import footBox from "@/components/public/footer";
import sex from "@/controls/sex";
import dateControls from "@/controls/date";
import { Toast } from "mint-ui";
export default {
  name: "account",
  components: {
    helmet,
    footBox,
    sex,
    dateControls
  },
  data() {
    return {
      popupVisible: true,
      sexVisible: false,
      birthday: "",
      accoutnInfo: {},
      addressInfo: {}
    };
  },
  watch: {
    accoutnInfo: {
      handler(newValue, oldValue) {
        this.saveAccount();
      },
      deep: true
    }
  },
  methods: {
    showSex() {
      this.sexVisible = true;
    },
    sexClose(sexResult) {
      this.sexVisible = false;
      this.accoutnInfo.sex = sexResult == 0 ? "男" : "女";
    },
    goAddress() {
      this.$router.push("addressManage");
    },
    saveAccount() {
      this.api.user.updateAccountInfo(this.accoutnInfo).then(data => {
        if (data.code != "200") {
          Toast(data.message);
        }
      });
    },
    setPwd() {
      this.$router.push({ name: "setpwd", params: { type: 1 } });
    }
  },
  created() {
    this.api.user.accoutnInfo().then(data => {
      if (data.code == "200") {
        this.accoutnInfo = data.model;
        if (this.accoutnInfo.birthday && this.accoutnInfo.birthday != "") {
          let date = new Date(this.accoutnInfo.birthday);
          if (date) {
            if (date.getFullYear() < 1970) {
              this.accoutnInfo.birthday = "1970-01-1";
            }
          }
        }
      } else {
        Toast(data.message);
      }
    });
    this.api.order.defaultAddress().then(data => {
      if (data.code == "200") {
        this.addressInfo = data.model;
      }
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../../sass/_func.scss";
.account {
}
.group {
  margin-top: pxToRem(20px);
}

.user-item {
  height: pxToRem(88px);
  line-height: pxToRem(88px);
  background: #fff;
  padding: 0 pxToRem(20px);
  margin-bottom: pxToRem(20px);
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.common-item {
  margin-bottom: 0;
  border-bottom: none;
}

.item-label {
  color: #333;
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 pxToRem(200px);
  -ms-flex: 0 1 pxToRem(200px);
  flex: 0 1 pxToRem(200px);
  font-size: pxToRem(30px);
}

.item-text {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  text-align: right;
  color: #acacac;
  padding-right: pxToRem(5px);
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  font-size: pxToRem(30px);

  input {
    text-align: right;
    height: pxToRem(88px);
    line-height: pxToRem(88px);
    border: none;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    font-size: pxToRem(30px);
    outline: none;
  }
}

.avatar {
  width: pxToRem(70px);
  height: pxToRem(70px);
  border: 1px solid #ddd;
  margin: pxToRem(7px) 0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: block;
  float: right;
}

.right-span {
  width: pxToRem(30px);
  position: relative;
}

.item-icon {
  color: #acacac;
  width: pxToRem(30px);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.valiable {
  color: #666;
}

.footer-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>