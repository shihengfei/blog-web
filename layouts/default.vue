<template>
  <div id="root" :class="skinClass">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@components/Header"; /* eslint-disable-line */
import { Cache } from "@utils";

export default Vue.extend({
  components: {
    Header,
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
});
</script>

<style lang="less">
#root {
  transition: background 0.5s;
  background: #ffffff;
  // height: 100vh;
  // overflow-y: auto;
  // 黑夜皮肤
  &.theme--dark {
    background: #171d20;
    .pc-header-main {
      background: #171d20;
      .logo {
        display: block;
        &-title {
          color: #ffffff;
        }
      }
      .peeler-wrap {
        .iconfont {
          color: #ffffff;
        }
      }
      .navBar-item__link {
        color: #ffffff;
      }
    }
  }
}
</style>
