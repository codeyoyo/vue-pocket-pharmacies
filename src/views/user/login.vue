<template>
  <div class="login">
    <helmet title="登录" :back-url="backUrl" right-text="注册" right-url="register" show-right="true"></helmet>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">
        账号密码登录
      </mt-tab-item>
      <mt-tab-item id="1">
        手机号快捷登录
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <div class="form-box">
          <div class="form-row">
            <div class="login-p">
            </div>
            <div class="input-box">
              <input type="text" placeholder="请输入您的手机号"  v-model="phoneNumber" maxlength="11" @change="phoneNumberChange()" />
            </div>
          </div>
          <div id="areaVer" v-show="area"></div>
          <div class="form-row">
            <div class="pwd-p">
            </div>
            <div class="input-box">
                <input type="password" placeholder="密码" v-model="password" maxlength="20" />
            </div>
          </div>
          <div class="btn-row">
            <button @click="login()">登录</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="form-box">
          <div class="form-row">
            <div class="login-h">
            </div>
            <div class="input-box">
                <input type="text" placeholder="请输入您的手机号"  v-model="phoneNumber" maxlength="11" />
            </div>
          </div>
          <div id="area" v-show="area"></div>
          <div class="form-row">
            <div class="pwd-p">
            </div>
            <div class="input-box">
                <input type="text" placeholder="验证码" v-model="verify"  maxlength="6" />
                <button class="code-btn" @click="getverify();">{{btnText}}</button>
            </div>
          </div>
          <div class="btn-row">
              <button @click="phonelogin()">登录</button>
          </div>
          <div class="notice">
            <span>温馨提示：未注册过药居士的手机号，登录时会自动注册药居士账号，且代表您已同意</span>
            <a href="#/clause" class="">《药居士服务条款》</a>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <footer-dom />
  </div>
</template>

<script>
import helmet from "../../components/public/helmet.vue";
import footerDom from "../../components/public/footer.vue";
import { Toast } from "mint-ui";
require("@/func/gt.js");
const checkPhoneReg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
export default {
  name: "login",
  components: {
    helmet,
    footerDom
  },
  data() {
    return {
      username: "",
      password: "",
      selected: "0",
      phoneNumber: "",
      verify: "",
      geetest: {},
      area: false,
      validateCode: "",
      backNum: 0,
      btnText: "获取验证码",
      validateSuccess: false,
      areaSuccess: false,
      backUrl: false
    };
  },
  watch: {
    selected() {
      this.phoneNumber = "";
    }
  },
  methods: {
    login() {
      if (this.phoneNumber.trim() == "") {
        Toast("手机号不能为空！");
        return;
      }
      if (!checkPhoneReg.test(this.phoneNumber)) {
        Toast("请输入正确的手机号！");
        return;
      }
      if (!this.areaSuccess) {
        Toast("请进行登录验证！");
        return;
      }
      if (this.password.trim() == "") {
        Toast("密码不能为空！");
        return;
      }
      this.api.user
        .loginByPassword(
          this.phoneNumber,
          this.password,
          this.geetest.geetest_challenge,
          this.geetest.geetest_validate,
          this.geetest.geetest_seccode
        )
        .then(data => {
          if (data.code == "200") {
            this.routerJoin();
          } else {
            Toast(data.message);
            this.getCode("areaVer");
          }
        });
    },
    phonelogin() {
      if (this.phoneNumber == "") {
        Toast("请输入手机号");
        return;
      }
      if (!checkPhoneReg.test(this.phoneNumber)) {
        Toast("您输入的手机号格式不对，请重新输入");
        return;
      }
      if (this.verify == "") {
        Toast("请输入验证码");
        return;
      }
      // if (this.verify != this.validateCode) {
      //   Toast("输入的验证码不正确");
      //   return;
      // }
      this.api.user.loginByPhone(this.phoneNumber, this.verify).then(data => {
        if (data.code == "200") {
          this.checkHasPwd();
        } else {
          Toast(data.message);
          this.getCode("areaVer");
        }
      });
    },
    checkHasPwd() {
      this.api.user.accoutnInfo().then(data => {
        if (data.code == "200") {
          var model = data.model;
          if (model.isSetPassword) {
            this.routerJoin();
          } else {
            this.$router.push({ name: "setpwd", params: { type: 2 } });
          }
        } else {
          Toast(data.message);
        }
      });
    },
    routerJoin() {
      let routerObj = this.$store.getters.router;
      let orderAffirmList = this.$store.getters.orderAffirm;
      if (orderAffirmList.length > 0) {
        this.$router.push({ name: "order" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    getPhonevalidateCode() {
      if (this.validateSuccess) {
        this.api.user
          .phoneValidationCode(
            this.phoneNumber,
            this.geetest.geetest_challenge,
            this.geetest.geetest_validate,
            this.geetest.geetest_seccode,
            2
          )
          .then(data => {
            if (data.code == 200) {
              this.backNum = 60;
              let inter = setInterval(() => {
                this.btnText = `重新发送(${this.backNum}秒)`;
                this.backNum--;
                if (this.backNum == 0) {
                  this.backNum = 0;
                  this.btnText = "获取验证码";
                  clearInterval(inter);
                }
              }, 1000);
            } else {
              Toast(data.message);
            }
          });
      }
    },
    getCode(domId = "area") {
      this.areaSuccess = false;
      this.validateSuccess = false;
      this.api.user.getValidateCode(this.phoneNumber).then(data => {
        document.getElementById(domId).innerHTML = "";
        if (data.code == "200") {
          let model = data.model;
          this.area = true;
          initGeetest(
            {
              area: "#" + domId,
              gt: model.gt,
              challenge: model.challenge,
              offline: !model.success,
              new_captcha: model.new_captcha,
              product: "float",
              width: "100%"
            },
            captchaObj => {
              captchaObj.appendTo("#" + domId);
              captchaObj.onSuccess(() => {
                let result = captchaObj.getValidate();
                this.geetest = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode
                };
                if (this.selected == "1") {
                  this.validateSuccess = true;
                  this.getPhonevalidateCode();
                } else {
                  this.areaSuccess = true;
                }
              });
            }
          );
        } else {
          Toast(data.message);
        }
      });
    },
    getverify() {
      if (this.phoneNumber == "") {
        Toast("请输入手机号");
        return;
      }
      if (!checkPhoneReg.test(this.phoneNumber)) {
        Toast("您输入的手机号格式不对，请重新输入");
        return;
      }
      if (this.backNum == 0) {
        this.getCode();
      }
    },
    phoneNumberChange() {
      if (checkPhoneReg.test(this.phoneNumber)) {
        this.getCode("areaVer");
      } else {
        this.areaSuccess = false;
      }
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.$router.push("user");
    }
    let router = this.$store.getters.router;
    if (router.fromPath == "/order" || router.fromPath == "/login") {
      this.backUrl = "/home";
    } else {
      this.backUrl = router.fromPath;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.form-box {
  margin-top: pxToRem(20px);
  background-color: #ffffff;
  border: 1px #ebebeb solid;

  .form-row {
    overflow: hidden;
    height: pxToRem(80px);
    padding-left: pxToRem(45px);
    border-bottom: 1px solid #ebebeb;
  }
  $pNum: 80px;
  .login-p {
    display: block;
    width: 20%;
    height: pxToRem($pNum);
    background: url(../../assets/l_UserName.png) no-repeat;
    background-position: center;
    background-size: pxToRem($pNum) pxToRem($pNum);
    float: left;
    margin-left: pxToRem(-$pNum);
  }
  .login-h {
    @extend .login-p;
    background-image: url(../../assets/phone.png);
    background-size: pxToRem(45px) pxToRem(45px);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: pxToRem(1.5px);
      background-color: #cccccc;
      top: 0;
      bottom: 0;
      right: pxToRem(30px);
      margin: auto;
      height: 50%;
    }
  }
  .pwd-p {
    @extend .login-p;
    background-image: url(../../assets/l_PassWord.png);
  }
  .input-box {
    float: left;
    width: 90%;
    height: pxToRem($pNum);
    position: relative;
  }
  input {
    border: none;
    height: pxToRem($pNum);
    text-indent: pxToRem(1px);
    line-height: pxToRem($pNum);
    width: 100%;
    outline: none;
    font-size: pxToRem(30px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .btn-row {
    text-align: center;
    height: pxToRem($pNum);
    overflow: hidden;
    padding-top: pxToRem(20px);
    padding-bottom: pxToRem(30px);
    button {
      width: 80%;
      height: 80%;
      font-size: pxToRem(30px);
      border: none;
      background-color: #26a2ff;
      color: #ffffff;
      border-radius: pxToRem(10px);
      outline: none;
    }
  }
}

.code-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0;
  top: 0;
  margin: auto;
  width: pxToRem(160px);
  height: pxToRem(50px);
  line-height: pxToRem(50px);
  border: 1px solid #2ca3ff;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: #2ca3ff;
  background: #fff;
  font-size: pxToRem(22px);
}

.notice {
  padding: 0 pxToRem(10px) pxToRem(20px) pxToRem(10px);
  line-height: pxToRem(29px);
  font-size: pxToRem(23px);
  color: #999;
  a {
    color: #2ca3ff;
  }
}
</style>