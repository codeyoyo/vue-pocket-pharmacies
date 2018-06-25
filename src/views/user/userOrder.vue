<template>
    <div class="user-order">
        <helmet :show-right='true' :title="title" backUrl="user" />
        <mt-navbar v-model="selected">
            <mt-tab-item id="0">
                <a class="nav-link">全都</a>
            </mt-tab-item>
            <mt-tab-item id="10">
                <a class="nav-link">待付款</a>
            </mt-tab-item>
            <mt-tab-item id="100">
                <a class="nav-link">待发货</a>
            </mt-tab-item>
            <mt-tab-item id="200">
                <a class="nav-link">已完成</a>
            </mt-tab-item>
             <mt-tab-item id="4">
                <a class="nav-link">待评价</a>
            </mt-tab-item>
        </mt-navbar>

        <order-item :type='selected' />
    </div>
</template>

<script>
import { Navbar, TabItem, TabContainer, TabContainerItem } from "mint-ui";
import orderItem from "@/components/order/orderItem";
import helmet from "@/components/public/helmet";
export default {
  name: "userOrder",
  components: {
    mtNavbar: Navbar,
    mtTabItem: TabItem,
    mtTabContainer: TabContainer,
    mtTabContainerItem: TabContainerItem,
    orderItem,
    helmet
  },
  data() {
    return {
      selected: "0",
      title: "全都订单"
    };
  },
  watch: {
    selected(n) {
      switch (n) {
        case "10":
          this.title = "待支付订单";
          break;
        case "100":
          this.title = "待发货订单";
          break;
        case "200":
          this.title = "已完成订单";
          break;
        case "4":
          this.title = "待评价订单";
          break;
        default:
          this.title = "全部订单";
      }
    }
  },
  created() {
    let type = this.$route.params.type;
    if (type) {
      this.selected = type;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_form.scss";
.nav-link {
  font-size: pxToRem(30px);
  user-select: none;
}
</style>