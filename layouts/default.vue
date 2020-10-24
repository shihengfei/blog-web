<template>
  <div id="root" :class="skinClass">
    <Header />
    <Nuxt />
    <BackTop />
  </div>
</template>

<script>
import Header from "@components/Header";
import BackTop from "@components/backTop";
import { Cache } from "@utils";

export default {
  components: {
    Header,
    BackTop,
  },
  data() {
    return {};
  },
  computed: {
    skinClass() {
      return this.$store.state.blog.skin.class;
    },
  },
  mounted() {
    document.getElementById("root").className = this.skinClass;
  },
};
</script>

<style lang="less">
@import url("~static/less/night.less");
#root {
  transition: background 0.5s;
  background: #f4f4f4;
}
</style>
