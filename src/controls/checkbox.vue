<template>
    <span :class="selectClass" @click="checkClick"></span>
</template>

<script>
export default {
  props: ["checked", "action", "resultValue"],
  data() {
    return {
      selected: false,
      selectClass: "checkbox"
    };
  },
  methods: {
    checkClick() {
      if (this.selected) {
        this.selectClass = "checkbox";
      } else {
        this.selectClass = "checkbox-active";
      }
      this.selected = !this.selected;
      if (this.resultValue) {
        this.action && this.action(this.resultValue);
      } else {
        this.action && this.action();
      }
    }
  },
  watch: {
    checked(n) {
      this.selected = n;
      if (!this.selected) {
        this.selectClass = "checkbox";
      } else {
        this.selectClass = "checkbox-active";
      }
    }
  },
  created() {
    if (this.checked) {
      this.selected = true;
      this.selectClass = "checkbox-active";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/_func.scss";
.checkbox {
  width: pxToRem(50px);
  height: pxToRem(50px);
  background-image: url(../assets/select_icon.png);
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  display: inline-block;
  text-align: center;
  vertical-align: text-bottom;
}

.checkbox-active {
  @extend .checkbox;
  background-image: url(../assets/selected_icon.png);
}
</style>


