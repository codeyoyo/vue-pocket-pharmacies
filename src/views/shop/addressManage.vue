<template>
    <div class="addressManage">
        <helmet title="收货地址" :show-right="true" />
        <div class="address-content">
          <div class="address-item" v-for="item in dataList" :key="item.id">
            <h3>
              <span class="name" v-text="item.consignee">
                
              </span>
              <span class="phone-number"  v-text="item.mobilePhone">
              </span>
              </h3>
              <div class="info">
                <p>
                  {{item.province}}{{item.city}}{{item.area}}{{item.deliveryAddress}}
                </p>
              </div>
              <div class="i-foot">
                <span class="set-default-btn default-address-btn">
                  <checkbox :checked='item.isDefault' :action="setDefault" :result-value='item' />
                  {{item.isDefault?'默认地址':'设为默认地址'}}
                </span>
                <div class="actions">
                  <a class="edit-btn" :href="'#/setaddress/'+item.id">
                    <i  class="icon icon-edit"></i>
                    编辑
                  </a>
                  <a class="delete-btn" @click="delAddress(item.id)">
                    <i class="icon icon-delete"></i>
                    删除
                  </a>
                </div>
              </div>
          </div>
          <div class="address-hight"></div>
          <div  class="add-address-btn">
            <a href="#/setaddress">
              <i class="icon iconfont icon-plus">+</i>
              新建地址
            </a>
          </div>
      </div>
    </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import checkbox from "@/controls/checkbox.vue";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "addressManage",
  data() {
    return {
      dataList: []
    };
  },
  components: {
    helmet,
    checkbox
  },
  methods: {
    setDefault(item) {
      let data = {
        addressId: item.id,
        consignee: item.consignee,
        deliveryAddress: item.deliveryAddress,
        deliveryZipCode: item.deliveryZipCode,
        mobilePhone: item.mobilePhone,
        landlinePhone: item.landlinePhone,
        regionId: item.regionId,
        isDefault: !item.isDefault
      };
      this.api.order.editDeliveryAddress(data).then(result => {
        if (result.code == "200") {
          this.dataList = [];
          this.pageLoad();
        } else {
          Toast(result.message);
        }
      });
    },
    delAddress(id) {
      MessageBox.confirm("确定要删除？").then(
        action => {
          this.api.order.deleteAddress(id).then(data => {
            if (data.code == "200") {
              this.pageLoad();
            } else {
              Toast(data.message);
            }
          });
        },
        () => {}
      );
    },
    pageLoad() {
      this.api.order.getDeliveryAddress().then(data => {
        if (data.code == "200") {
          this.dataList = [];
          let group = data.model;
          let filtersArray = group.filter(item => {
            if (item.isDefault) {
              return item;
            }
          });
          let addressId = 0;
          if (filtersArray.length > 0) {
            this.dataList.push(filtersArray[0]);
            addressId = filtersArray[0].id;
          }
          data.model.map(item => {
            if (item.id != addressId) {
              this.dataList.push(item);
            }
          });
        } else {
          Toast(data.message);
        }
      });
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (jwt) {
      this.pageLoad();
    } else {
      this.$router.push("login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func";
.address-content {
  .address-item {
    &:first-of-type {
      border-top: 0;
    }
    border-bottom: 1px solid #eee;
    padding: pxToRem(10px);
    background: #fff;
    margin-bottom: pxToRem(15px);
    padding: 0 pxToRem(20px) 0 pxToRem(20px);
  }
  h3 {
    font-size: pxToRem(28px);
    border-bottom: 1px dashed #e3e3e3;
    padding: pxToRem(10px) 0 pxToRem(10px) 0;
    overflow: hidden;
    position: relative;
    font-weight: 400;
  }
  .name {
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .phone-number {
    float: right;
    width: 40%;
    display: inline-block;
    text-align: right;
  }
  .phone-number,
  .name {
    height: pxToRem(50px);
    line-height: pxToRem(50px);
    font-size: pxToRem(30px);
  }
  .info {
    padding: pxToRem(10px) 0 pxToRem(10px) 0;
    p {
      line-height: pxToRem(50px);
      height: pxToRem(50px);
      color: #666;
      font-size: pxToRem(28px);
      word-wrap: break-word;
      white-space: normal;
    }
  }

  .i-foot {
    border-top: 1px dashed #ccc;
    padding: pxToRem(20px) 0 pxToRem(20px) 0;
    color: #555;
    font-size: pxToRem(30px);
    .checkbox,
    .checkbox-active {
      width: pxToRem(36px);
      height: pxToRem(36px);
    }
  }

  .actions {
    float: right;
    margin-top: pxToRem(10px);
    a {
      display: inline-block;
      padding-left: pxToRem(10px);
      color: #555;
    }
  }

  .actions {
    .icon {
      width: pxToRem(25px);
      height: pxToRem(25px);
    }
  }

  .address-hight {
    height: pxToRem(120px);
  }

  .add-address-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: pxToRem(100px);
    line-height: pxToRem(80px);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: pxToRem(10px) pxToRem(40px);
    a {
      display: block;
      width: 100%;
      height: pxToRem(80px);
      line-height: pxToRem(80px);
      background: #ff6a63;
      color: #fff;
      text-align: center;
      font-size: pxToRem(30px);
    }
  }
  .iconfont {
    font-family: iconfont !important;
    font-size: pxToRem(35px);
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>

