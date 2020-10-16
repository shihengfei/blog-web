<template>
  <div id="root" :class="skinClass">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "@components/Header"; /* eslint-disable-line */
import { Cache } from "@utils";

export default {
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
};
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
    }
    .pc-header-main .logo-title {
      color: #ffffff;
    }
    .pc-header-main .peeler-wrap .iconfont {
      color: #ffffff;
    }
    .pc-header-main .navBar-item__link {
      color: #ffffff;
    }
    .mobile-header-main {
      // 导航条背景颜色
      background: #171d20;
    }
    .mobile-header-main .peeler-wrap .iconfont {
      // 皮肤切换按钮
      color: #ffffff;
    }
    .mobile-header-main .handle-wrap .iconfont {
      // 移动端展开关闭按钮
      color: #ffffff;
    }
    .sidebar {
      // 移动端左侧展开导航栏
      background: #171d20;
      border-right: 1px solid #2f3133;
    }
  }
}
</style>
