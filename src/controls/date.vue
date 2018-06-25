<template>
  
</template>

<script>
require("@/func/lCalendar.js");
export default {
  props: ["dom"],
  mounted() {
    var calendar = new lCalendar();
    calendar.init({
      trigger: this.dom,
      type: "date"
    });
  }
};
</script>

<style lang="scss" scoped>

</style>


