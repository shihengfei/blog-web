<template>
  <!-- 首页 -->
  <div class="home-wrap">
    <!-- 顶部banner区域 start -->
    <div class="banner-wrap" style="background-image: url(/images/banner/bg11.jpg)"></div>
    <!-- 顶部banner区域 end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.banner-wrap {
  width: 100vw;
  height: 600px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  &-wrap {
  }
}
</style>
