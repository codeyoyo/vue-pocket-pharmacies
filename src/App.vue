<template>
  <div id="mainContent">
    <transition :name="transitionName">  
      <router-view></router-view>  
    </transition>  
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      let routes = this.$router.options.routes;
      if (to.path == "/" || to.path == "/home") {
        this.transitionName = "slide-right";
      } else {
        let toIndex = 0;
        let fromIndex = 0;
        for (let i = 0; i < routes.length; i++) {
          let item = routes[i];
          if (item.name == to.name) {
            toIndex = i;
          }
          if (item.name == from.name) {
            fromIndex = i;
          }
        }
        if (toIndex > fromIndex) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      this.$store.dispatch("saveRouter", {
        toPath: to.path,
        fromPath: from.path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sass/_func.scss";
#app {
  margin: 0 auto;
  background-color: #eee !important;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-20%, 0, 0);
}
</style>
