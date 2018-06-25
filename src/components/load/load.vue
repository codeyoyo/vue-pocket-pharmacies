<template>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    show() {
      Indicator.open();
      let wrapper = document.getElementsByClassName("mint-indicator-wrapper");
      if (wrapper) {
        let ele = wrapper[0];
        ele.className =
          ele.className == "" ? "load" : ele.className + " " + "load";
      }
    },
    hide() {
      Indicator.close();
    }
  }
};
</script>

<style lang='scss' scoped>

</style>