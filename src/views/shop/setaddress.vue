<template>
    <div class="set-address">
        <helmet :title="title" :show-right='true' />
        <div class="address-form">
            <ul>
                <li>
                    <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人：</span>
                    <input type="text" maxlength="10" v-model="consignee" />
                </li>
                 <li>
                    <span>手机号码：</span>
                    <input type="number" maxlength="11" v-model="mobilePhone" />
                </li>
                <li>
                    <span>固定电话：</span>
                    <input type="text" maxlength="18" placeholder="格式：020-12345678" v-model="landlinePhone" />
                </li>
                <li>
                    <span>所在地区：</span>
                    <input type="text" readonly="readonly" placeholder="省、市、区" v-model="address" id='addressText' />
                    <!-- <city-controls :select-data="getSelectData" :city-func="cityFunc" /> -->
                </li>
                <li>
                    <span>详细地址：</span>
                    <input type="text" maxlength="50" v-model="deliveryAddress" />
                </li>
                <li>
                    <span>邮政编码：</span>
                    <input type="text" maxlength="6" v-model="deliveryZipCode" />
                </li>
            </ul>
            <div class="set">
                <checkbox :checked='isDefault' :action='setDefault' />
                设为默认收货地址
            </div>
        </div>
        <city-select :address-value='addressValue' :set-data="setSelectData" />
        <button id="saveBtn" v-show="btnShow" class="save-button" @click="save()">保存</button>
    </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import checkbox from "@/controls/checkbox";
import { Popup, Toast } from "mint-ui";
import cityControls from "@/controls/cityControls";
import citySelect from "@/controls/citySelect";
export default {
  components: {
    helmet,
    checkbox,
    mtPopup: Popup,
    cityControls,
    citySelect
  },
  data() {
    return {
      popupVisible: true,
      showCity: false,
      title: "添加收货地址",
      selectprovince: 0,
      selectcity: 0,
      selectdistrict: 0,
      address: "",
      addressId: "",
      addressValue: "0,0,0",
      consignee: "",
      deliveryAddress: "",
      deliveryZipCode: "",
      mobilePhone: "",
      landlinePhone: "",
      isDefault: true,
      btnShow: true,
      oHeight: 0
    };
  },
  methods: {
    setDefault() {
      this.isDefault = !this.isDefault;
    },
    selectCity() {
      this.showCity = !this.showCity;
    },
    setSelectData(addressValue) {
      this.addressValue = addressValue;
    },
    save() {
      if (this.consignee == "") {
        Toast("请填写收货人");
        return;
      }
      if (this.mobilePhone == "" && this.landlinePhone == "") {
        Toast("手机或固话必须填一个");
        return;
      }
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.mobilePhone
        ) &&
        this.mobilePhone != ""
      ) {
        Toast("手机号码填写不正确");
        return;
      }
      if (
        !/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/.test(this.landlinePhone) &&
        this.landlinePhone != ""
      ) {
        Toast("固定电话填写不正确");
        return;
      }
      let regionNum = 0;
      if (this.addressValue == "") {
        Toast("请填写所在地区");
        return;
      } else {
        let valGroup = this.addressValue.split(",");
        regionNum = valGroup[valGroup.length - 1];
      }
      if (this.deliveryAddress == "") {
        Toast("请填写详情地址");
        return;
      }
      if (
        !/^[0-9]{6}$/.test(this.deliveryZipCode) &&
        this.deliveryZipCode != ""
      ) {
        Toast("邮政编码填写不正确");
        return;
      }
      let addressObj = {
        addressId: this.addressId ? this.addressId : 0,
        consignee: this.consignee,
        deliveryAddress: this.deliveryAddress,
        deliveryZipCode: this.deliveryZipCode,
        mobilePhone: this.mobilePhone,
        landlinePhone: this.landlinePhone,
        regionId: regionNum,
        isDefault: this.isDefault
      };
      if (this.addressId) {
        this.api.order.editDeliveryAddress(addressObj).then(data => {
          if (data.code == "200") {
            Toast({
              message: "保存成功",
              position: "bottom",
              duration: 3000
            });
            this.$router.push("/addressManage");
          } else {
            Toast(data.message);
          }
        });
      } else {
        this.api.order.addDeliveryAddress(addressObj).then(data => {
          if (data.code == "200") {
            this.$router.push("/addressManage");
          } else {
            Toast(data.message);
          }
        });
      }
    }
  },
  created() {
    this.addressId = this.$route.params.addressId;
    if (this.addressId) {
      this.title = "编辑收货地址";
      this.api.order.getOneDeliveryAddress(this.addressId).then(data => {
        if (data.code == "200") {
          let model = data.model;
          this.consignee = model.consignee;
          this.mobilePhone = model.mobilePhone;
          this.landlinePhone = model.landlinePhone;
          this.address = model.province + model.city + model.area;
          this.deliveryAddress = model.deliveryAddress;
          this.deliveryZipCode = model.deliveryZipCode;
          this.selectprovince = model.provinceId;
          this.selectcity = model.cityId;
          this.selectdistrict = model.areaId;
          this.addressValue = `${this.selectprovince},${this.selectcity},${
            this.selectdistrict
          }`;
        } else {
          Toast(data.message);
        }
      });
    }

    this.oHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    window.onresize = () => {
      var nHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (nHeight + 100 < this.oHeight) {
        this.btnShow = false;
      } else {
        this.btnShow = true;
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.set-address {
  background-color: #ffffff;
}
.address-form {
  font-size: pxToRem(30px);
  color: #333;
  li {
    line-height: pxToRem(80px);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 0 pxToRem(25px);
  }
  span {
    white-space: nowrap;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    padding-right: pxToRem(10px);
  }
  input {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 100%;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    border: 0;
    background: transparent;
    color: #333;
    font-size: 100%;
    text-indent: pxToRem(10px);
    outline: none;
  }
  .set {
    overflow: hidden;
    padding: pxToRem(20px);
  }
}
.save-button {
  height: pxToRem(70px);
  width: 90%;
  border: 0;
  background: #26a2ff;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: pxToRem(25px);
  color: #fff;
  border-radius: 2px;
  font-size: pxToRem(34px);
}
</style>
