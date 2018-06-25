<template>
  <div id='app'>
    <search></search>
    <new-banar />
    <nav-list /> 
    <confine />
    <!-- <feature /> -->
    <hot />
    <floor />
    <user-like />
    <foot-box />
    <top-wrap />
    <!-- <nav-footer active='1' /> -->
  </div>
</template>
<script>
import search from "../components/home/search";
import banar from "../components/home/banar";
import navList from "../components/home/nav-list";
import confine from "../components/home/confine";
import feature from "../components/home/feature";
import hot from "../components/home/hot";
import floor from "../components/home/floor";
import userLike from "../components/home/user-like";
import footBox from "../components/public/footer";
import topWrap from "../components/public/top-wrap";
import navFooter from "../components/public/navFooter";
import ajax from "../func/fetch";
import newBanar from "@/components/home/newBanar";
export default {
  name: "home",
  components: {
    search,
    banar,
    navList,
    confine,
    feature,
    hot,
    floor,
    userLike,
    footBox,
    topWrap,
    navFooter,
    newBanar
  },
  methods: {},
  created() {}
};
</script>

<style scoped lang='scss'>
@import "../sass/_func.scss";
</style>