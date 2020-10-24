<template>
  <div class="back-top">
    <span
      class="iconfont icon-backTop"
      ref="backTop"
      v-show="show"
      @click="backTop"
    ></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      onTop: null,
    };
  },
  mounted() {
    window.onscroll = () => {
      this.scrollFun();
    };
  },
  methods: {
    scrollFun() {
      this.onTop =
        document.documentElement.scrollTop || document.body.scrollTop; //兼容性设置;
      this.show =
        document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;
    },
    backTop() {
      const timer = setInterval(() => {
        document.documentElement.scrollTop = document.body.scrollTop = Math.floor(
          this.onTop - 200
        ); //兼容性设置;
        //设置定时器
        if (this.onTop === 0 || document.documentElement.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 10);
    },
  },
};
</script>

<style lang="less">
.back-top {
  position: fixed;
  bottom: 50px;
  right: 50px;
  text-align: center;
  cursor: pointer;
  color: #000;
  transition: color 0.5s;
  .iconfont {
    font-size: 50px;
  }
}
</style>