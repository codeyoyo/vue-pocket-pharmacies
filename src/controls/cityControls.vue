<template>
    <div class="city-controls">
        <div class="address-select">
            <select v-model="provinceValue">
                <option value="0">请选择省份</option>
                <option v-for="(item,index) in province" :key="index" :value="item.id" :selected='item.id==provinceValue' >{{item.name}}</option>
            </select>
            <select v-model="cityValue" v-show="city.length>0">
                <option value="0">请选择城市</option>
                <option v-for="(item,index) in city" :key="index" :value="item.id" :selected='item.id==cityValue'>{{item.name}}</option>
            </select>
            <select v-model="districtValue" v-show="district.length>0">
                <option value="0">请选择镇县</option>
                <option v-for="(item,index) in district" :key="index" :value="item.id" :selected='item.id==districtValue'>{{item.name}}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["selectData", "cityFunc"],
  methods: {
    cityResult() {
      let addressObj = {
        provinceId: this.provinceValue,
        cityId: this.cityValue,
        districtId: this.districtValue
      };
      this.cityFunc && this.cityFunc(addressObj);
    },
    loadAll() {
      for (let i = 0; i < this.province.length; i++) {
        var item = this.province[i];
        if (item.id == this.provinceValue) {
          this.city = item.city;
          break;
        }
      }
      for (let i = 0; i < this.city.length; i++) {
        var item = this.city[i];
        if (item.id == this.cityValue) {
          this.district = item.district;
          break;
        }
      }
    }
  },
  data() {
    return {
      province: [],
      provinceValue: 0,
      city: [],
      cityValue: 0,
      district: [],
      districtValue: 0
    };
  },
  watch: {
    provinceValue(n) {
      for (let i = 0; i < this.province.length; i++) {
        var item = this.province[i];
        if (item.id == n) {
          this.city = item.city;
          break;
        }
      }
      if (!this.cityValue) {
        this.cityValue = 0;
      } else {
        var hasCity = false;
        for (let i = 0; i < this.city.length; i++) {
          var item = this.city[i];
          if (item.id == this.cityValue) {
            hasCity = true;
            break;
          }
        }
        if (!hasCity) {
          this.cityValue = 0;
        }
      }
      this.cityResult();
    },
    cityValue(n) {
      let hasArea = false;
      for (let i = 0; i < this.city.length; i++) {
        var item = this.city[i];
        if (item.id == n) {
          this.district = item.district;
          hasArea = true;
          break;
        }
      }
      if (!hasArea) {
        this.district = [];
      }
      if (!this.districtValue) {
        this.districtValue = 0;
      } else {
        hasArea = false;
        for (let i = 0; i < this.district.length; i++) {
          var item = this.district[i];
          if (item.id == this.districtValue) {
            hasArea = true;
            break;
          }
        }
        if (!hasArea) {
          this.districtValue = 0;
        }
      }
      if (this.district.length == 0) {
        this.districtValue = -1;
      }
      this.cityResult();
    },
    districtValue(n) {
      this.cityResult();
    }
  },
  created() {
    this.api.order.regions().then(data => {
      if (data.code == "200") {
        let list = data.model;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          this.province.push(item);
        }
        let obj = this.selectData();
        this.provinceValue = obj.province;
        this.cityValue = obj.city == 0 ? obj.district : obj.city;
        this.districtValue = obj.district;
        this.loadAll();
      } else {
        Toast(data.message);
      }
    });
  }
};
</script>

<style scoped lang='scss'>
@import "../sass/_func.scss";
.city-controls {
  width: 100%;
}
.address-select {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 100%;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
  padding-left: pxToRem(5px);
  select {
    width: 32.1%;
    height: 100%;
    font-size: pxToRem(30px);
    border: none;
    text-align: center;
    outline: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #ffffff;
  }
}
</style>