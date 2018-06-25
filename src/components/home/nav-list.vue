<template>
  <div class="nav-box">
      <div class="nav-row" v-for="(item,index) in dataList" :key="index">
          <a class="nav-item" v-for="(temp,idx) in item" :key="idx" :href="joinTo(temp)">
              <img :src="temp.imageName" onerror="imgError(this);" />
              <p v-text="temp.iconText"></p>
          </a>
      </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    joinTo(obj) {
      return obj.actionContent;
      // if(obj.actionType==10){
      //   return obj.actionContent
      // }
      // if(obj.actionType==20){
      //   return '#/productDetil/'+obj.productId+'/'+obj.merchantId
      // }
    }
  },
  created() {
    this.api.home.homeNavBoxes().then(data => {
      let group = [];
      let groupList = data;
      for (let i = 0; i < groupList.length; i++) {
        let item = groupList[i];
        group.push(item);
        if (group.length == 4) {
          this.dataList.push(group);
          group = [];
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.nav-box {
  background: white;
  overflow: hidden;
  padding-bottom: pxToRem(10px);
  .nav-row {
    display: flex;
    padding-top: pxToRem(10px);
    p {
      margin-top: pxToRem(5px);
      font-size: pxToRem(25px);
      color: #000000;
    }
    img {
      width: pxToRem(80px);
    }
  }
  .nav-item {
    flex: 1;
    text-align: center;
  }
}
</style>


