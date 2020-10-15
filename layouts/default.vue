<template>
  <div :class="blog.skin.class">
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header"; /* eslint-disable-line */

export default Vue.extend({
  components: {
    Header,
  },
  data() {
    return {};
  },
  computed: {
    blog() {
      return this.$store.state.blog;
    },
  },
});
</script>

<style lang="less">
.theme--dark {
  background: #171d20;
  height: 100vh;
}
</style>
