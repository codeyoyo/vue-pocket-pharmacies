<template>
  <div class="order">
    <helmet title="订单确认" />
    <order-address />
    <order-list :func='totalPriceMatch' />
    <order-footer :total-price='totalPrice' />
  </div>
</template>

<script>
import helmet from "@/components/public/helmet";
import orderAddress from "@/components/order/orderAddress";
import orderList from "@/components/order/orderList";
import orderFooter from "@/components/order/orderFooter";
export default {
  name: "order",
  components: {
    helmet,
    orderAddress,
    orderList,
    orderFooter
  },
  data() {
    return {
      totalPrice: 0
    };
  },
  methods: {
    totalPriceMatch(price) {
      this.totalPrice = price;
    }
  },
  created() {
    let jwt = this.$store.getters.jwt;
    if (!jwt) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>