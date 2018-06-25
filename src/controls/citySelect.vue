<template>
  <div style="city-select">
    <input type="hidden" id="addressValue" />
  </div>
</template>

<script>
require("@/func/LArea");
import { Toast } from "mint-ui";
import cities from "@/func/cities.js";
export default {
  props: ["addressValue", "setData"],
  data() {
    return {
      city: [],
      orgCity: [],
      areaSelect: [],
      district: []
    };
  },
  methods: {
    mapCity() {
      if (this.orgCity.length > 0 && this.city.length > 0) {
        for (let i = 0; i < this.city.length; i++) {
          let item = this.city[i];
          if (item.id == this.orgCity[1]) {
            this.areaSelect.push(i);
            this.district = item.child;
            break;
          }
        }
      }
    },
    mapDistrict() {
      if (this.orgCity[2] && this.district.length > 0) {
        for (let i = 0; i < this.district.length; i++) {
          let item = this.district[i];
          if (item.id == this.orgCity[2]) {
            this.areaSelect.push(i);
            break;
          }
        }
      }
    },
    controlLoad(){
      let gearParent=document.getElementById("gearParent");
      if(gearParent){
        let gearChild=document.getElementById('gearChild');
        gearParent.removeChild(gearChild);
      }
      let area = new LArea();
      area.init({
        trigger: "#addressText",
        valueTo: "#addressValue",
        keys: {
          id: "id",
          name: "name"
        },
        type: 1,
        data: cities
      });
      this.orgCity = this.addressValue.split(",");
      this.areaSelect=[];
      if (this.orgCity.length > 0) {
        for (let i = 0; i < cities.length; i++) {
          let item = cities[i];
          if (item.id == this.orgCity[0]) {
            this.areaSelect.push(i);
            this.city = item.child;
            this.mapCity();
            this.mapDistrict();
            break;
          }
        }
        if(this.areaSelect.length>0){
          area.value = this.areaSelect;
        }
      }
      area.finishAction = () => {
        let addressValue = document.getElementById("addressValue").value;
        this.setData(addressValue);
      };
    }
  },
  watch: {
    addressValue(n) {
      this.controlLoad();
    }
  },
  mounted() {
    this.controlLoad();
  }
};
</script>

<style lang='scss' scoped>
@import "../sass/_func.scss";
.city-select {
  display: none;
}
</style>


