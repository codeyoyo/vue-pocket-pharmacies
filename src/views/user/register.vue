<template>
    <div class="register">
        <helmet title="注册" url="/login"></helmet>
        <div class="register-form">
            <mt-field label="手机号码:" placeholder="请输入手机号码" type="tel" :attr="{ maxlength: 11 }" v-model="phonenumber"></mt-field>
            <mt-field :disableClear="true" label="密  码" class="password-text" :attr="{ maxlength: 20 }" placeholder="请设置6位数以上密码" :type="inputType" v-model="password">
              <a class="eye" :class="eyeClass" @click="eyeMethod()"></a>
            </mt-field>
            <div id="area" v-show="area"></div>
            <mt-field :disableClear="true" label="短信验证:" placeholder="短信验证码" type="number" :attr="{ maxlength: 6 }" v-model="verification">
                <button class="get-ver" :class="checkPhone()" @click="getCode()">获取验证码{{backNum==0?'':backNum}}</button>
            </mt-field>
            <div class="btn-row">
                <button :class="checkAll()" @click="submit()">注册</button>
            </div>
            <div class="notice">
              注册即视您同意
              <a href="#/clause">《药居士服务条款》</a>
            </div>
        </div>
        <footer-dom />
    </div>
</template>

<script>
import helmet from "../../components/public/helmet.vue";
import footerDom from "../../components/public/footer.vue";
import { Checklist, Field, Toast } from "mint-ui";
require("@/func/gt.js");
const checkPhoneReg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
export default {
  name: "register",
  data() {
    return {
      phonenumber: "",
      password: "",
      verification: "",
      openEye: false,
      eyeClass: "eye-close",
      inputType: "password",
      checkPass: false,
      agree: ["1"],
      optionsList: [
        {
          label: "同意药居士网上药店注册协议",
          value: "1"
        }
      ],
      validateCode: "",
      canSubmit: false,
      backNum: 0,
      validateSuccess: false,
      area: false,
      geetest: {}
    };
  },
  components: {
    helmet,
    footerDom,
    mtChecklist: Checklist,
    mtField: Field
  },
  methods: {
    eyeMethod() {
      this.openEye = !this.openEye;
      if (this.openEye) {
        this.eyeClass = "eye-open";
        this.inputType = "text";
      } else {
        this.eyeClass = "eye-close";
        this.inputType = "password";
      }
    },
    checkPassWord() {
      if (this.password.length > 5 && this.password.length < 21) {
        return true;
      }
      return false;
    },
    checkPhone() {
      if (
        !checkPhoneReg.test(this.phonenumber) ||
        this.backNum > 0 ||
        !this.checkPassWord()
      ) {
        this.checkPass = false;
        return "disabled";
      } else {
        this.checkPass = true;
        return "ok";
      }
    },
    checkAll() {
      if (
        this.phonenumber.trim() != "" &&
        this.password.trim() != "" &&
        this.verification.trim() != ""
      ) {
        this.canSubmit = true;
        return "ok";
      }
      this.canSubmit = false;
      return "disabled";
    },
    getPhonevalidateCode() {
      if (this.validateSuccess) {
        this.api.user
          .phoneValidationCode(
            this.phonenumber,
            this.geetest.geetest_challenge,
            this.geetest.geetest_validate,
            this.geetest.geetest_seccode
          )
          .then(data => {
            if (data.code == 200) {
              this.api.user.getFakeCode(this.phonenumber).then(result => {
                if (result.code == 200) {
                  this.validateCode = result.model;
                  this.backNum = 60;
                  let inter = setInterval(() => {
                    this.backNum--;
                    if (this.backNum == 0) {
                      this.backNum = 0;
                      clearInterval(inter);
                    }
                  }, 1000);
                } else {
                  Toast(data.message);
                }
              });
            } else {
              console.warn(data.code);
              Toast(data.message);
            }
          });
      }
    },
    getCode() {
      if (!this.checkPassWord()) {
        Toast("请求填写6到20位密码");
      }
      if (this.checkPass && this.backNum == 0) {
        this.api.user.getValidateCode(this.phonenumber).then(data => {
          document.getElementById("area").innerHTML = "";
          if (data.code == "200") {
            let model = data.model;
            this.area = true;
            initGeetest(
              {
                area: "#area",
                gt: model.gt,
                challenge: model.challenge,
                offline: !model.success,
                new_captcha: model.new_captcha,
                product: "float",
                width: "100%"
              },
              captchaObj => {
                captchaObj.appendTo("#area");
                captchaObj.onSuccess(() => {
                  this.validateSuccess = true;
                  let result = captchaObj.getValidate();
                  this.geetest = {
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode
                  };
                  this.getPhonevalidateCode();
                });
              }
            );
          } else {
            Toast(data.message);
          }
        });
      }
    },
    submit() {
      if (this.canSubmit) {
        if (this.agree.length <= 0) {
          Toast("请同意药居士网上药店注册协议");
          return;
        }
        if (this.password.trim().length < 6) {
          Toast("请设置6位数以上密码");
          return;
        }
        if (this.verification != this.validateCode) {
          Toast("请填写正确的验证码");
          return;
        }
        if (!this.validateSuccess) {
          Toast("请完成验证");
          return;
        }
        this.api.user
          .phoneRegister(this.phonenumber, this.verification)
          .then(data => {
            if (data.code == "200") {
              this.api.user
                .setPassword(this.password, this.password)
                .then(result => {
                  if (result.code == "200") {
                    let routerObj = this.$store.getters.router;
                    let orderAffirmList = this.$store.getters.orderAffirm;
                    if (orderAffirmList.length > 0) {
                      this.$router.push({ name: "order" });
                    } else {
                      this.$router.push({ name: "home" });
                    }
                  } else {
                    Toast(result.message);
                  }
                });
            } else {
              Toast(data.message);
            }
          });
      }
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.$router.push("user");
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
.register-form {
  margin-top: pxToRem(30px);
  background-color: #ffffff;
  overflow: hidden;
  .mint-field {
    margin-top: 0 !important;
  }
  .eye {
    width: pxToRem(40px);
    height: pxToRem(40px);
    display: inline-block;
  }
  .eye-close {
    background: url(../../assets/closeEye.png) no-repeat;
    background-size: 100%;
    background-position: center;
  }
  .eye-open {
    background: url(../../assets/openEye.png) no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .agree {
    margin-top: pxToRem(20px);
  }

  .btn-row {
    text-align: center;
    height: pxToRem(80px);
    overflow: hidden;
    padding: pxToRem(20px) 0;
    button {
      width: 80%;
      height: 80%;
      font-size: pxToRem(30px);
      border: none;
      color: #ffffff;
      border-radius: pxToRem(10px);
    }
  }
  .disabled {
    background-color: #b5b5b5;
  }
  .ok {
    background-color: #26a2ff;
  }

  .get-ver {
    border: none;
    width: pxToRem(150px);
    height: pxToRem(70px);
    font-size: pxToRem(25px);
    color: #ffffff;
  }

  #area {
    margin-top: pxToRem(10px);
    overflow: hidden;
  }
}

.notice {
  margin-top: pxToRem(-17px);
  font-size: pxToRem(25px);
  padding-left: pxToRem(15px);
  color: #aaa;
  margin-bottom: pxToRem(20px);
  a {
    color: #2da2ff;
    text-decoration: none;
  }
}
</style>