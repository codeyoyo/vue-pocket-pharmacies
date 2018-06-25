<template>
  <div id='produnctDetil' class="produnct-detil">
    <helmet title="商品详情" :show-right="true"></helmet>
    <product-show :func="productCountChange" :get-promotion='getPromotion' :set-prescription='setPrescription' />
    <details-footer :productNum='productNum' :promotion-id='promotionId' :is-prescription='isPrescription' />
  </div>
</template>

<script>
import productShow from "../../components/product/productShow.vue";
import helmet from "../../components/public/helmet.vue";
import detailsFooter from "../../components/product/detailsFooter";
export default {
  name: "productDetil",
  data() {
    return {
      productNum: 1,
      productId: "",
      merchantId: "",
      promotionId: "",
      isPrescription: false
    };
  },
  components: {
    productShow,
    helmet,
    detailsFooter
  },
  methods: {
    getPromotion(n) {
      this.promotionId = n;
    },
    productCountChange(num) {
      this.productNum = num;
    },
    setPrescription(n) {
      this.isPrescription = n;
    }
  },
  created() {
    this.productId = this.$route.params.productId;
    let merchantId = this.$route.params.merchantId;
    if (merchantId) {
      this.merchantId = merchantId;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../sass/_func.scss";
</style>