<template>
  <div class="product-box">
      <div class="product-list">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.product-box {
  width: 100%;
  overflow-x: auto;
  .product-list {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>