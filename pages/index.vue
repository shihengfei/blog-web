<template>
  <!-- 首页 -->
  <div class="home-wrap">
    <!-- 顶部banner区域 start -->
    <div class="banner-wrap" style="background-image: url(https://ncdn.camarts.cn/dabe33ef.jpg)">
      <img
        class="banner-avatar"
        src="https://www.sanghangning.cn/assets/img/index-logo.acd896b1.gif"
        alt
      />
      <div class="banner-right">
        <div class="banner-title">说说我的生活</div>
        <div class="banner-desc">Don't cry, do laugh</div>
      </div>
    </div>
    <!-- 顶部banner区域 end -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@media screen and (max-width: 720px) {
  .banner-avatar {
    display: none;
  }
}
.banner {
  &-wrap {
    width: 100vw;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
  &-avatar {
    width: 7rem;
    margin-right: 40px;
    border-radius: 50%;
    max-width: 100%;
  }
  &-right {
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    text-indent: 5px;
  }
  &-title {
    font-size: 2rem;
    font-weight: bold;
  }
  &-desc {
    margin-top: 30px;
    font-size: 1.2rem;
  }
}
.main {
  &-wrap {
  }
}
</style>
