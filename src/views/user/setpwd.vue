<template>
    <div class="setpwd">
        <helmet title="密码设置" :show-right='false' />
        <section class="contain">
            <div class="user-list">
                <p class="user-item new-password">
                    <input type="password" placeholder="请输入您的密码" v-model="password" />
                    <i class="icon icon-eye-close"></i>
                </p>
                <p class="user-item">
                    <input type="password" placeholder="请再次输入您的密码" v-model="confirmPwd" />
                    <i class="icon icon-eye-close"></i>
                </p>
            </div>
            <div class="update-button">
                <button type="button" @click="savePwd()">确定</button>
            </div>
        </section>
        <div class="footer">
            <dom-footer />
        </div>
    </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import footer from "@/components/public/footer";
import { Toast } from "mint-ui";
export default {
  components: {
    helmet,
    domFooter: footer
  },
  data() {
    return {
      password: "",
      confirmPwd: ""
    };
  },
  methods: {
    savePwd() {
      if (this.password.trim() == "") {
        Toast("密码不能为空！");
        return;
      }
      if (this.password.trim().length < 6) {
        Toast("请设置6位数以上密码");
        return;
      }
      if (this.password.trim().length > 20) {
        Toast("请设置20位数以下密码");
        return;
      }
      if (this.confirmPwd.trim() == "") {
        Toast("确认密码不能为空！");
        return;
      }
      if (this.confirmPwd.trim() != this.password.trim()) {
        Toast("密码和确认密码两者不一致！");
        return;
      }
      if (this.$route.params.type == 1) {
        this.api.user
          .reSetPassword(this.password, this.confirmPwd)
          .then(data => {
            if (data.code == "200") {
              Toast("密码设置成功！");
              this.$router.push({ name: "account" });
            } else {
              Toast(data.message);
            }
          });
      } else {
        this.api.user.setPassword(this.password, this.confirmPwd).then(data => {
          if (data.code == "200") {
            this.$router.push({ name: "user" });
          } else {
            Toast(data.message);
          }
        });
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.new-password {
  margin-top: pxToRem(20px);
}

.contain {
  background-color: #fff;
  flex: auto;
  height: 100%;
}

.user-list {
  background: #eee;
  padding-bottom: pxToRem(10px);
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
  position: relative;
  overflow: hidden;
  input {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    height: 100%;
    border: none;
    padding-right: pxToRem(20px);
    font-size: pxToRem(25px);
    outline: none;
  }
  i {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: pxToRem(30px);
    height: pxToRem(30px);
    right: pxToRem(20px);
  }
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.update-button {
  padding: 0 pxToRem(30px);
  text-align: center;
  background-color: #eee;
  button {
    padding: pxToRem(20px);
    background: #06a6f8;
    border: none;
    color: #fff;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    font-size: pxToRem(24px);
    width: 100%;
  }
}
</style>