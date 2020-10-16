<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          type: "text/javascript",
          src: "/js/rainyday.js",
          // "https://cdn.bootcdn.net/ajax/libs/rainyday.js/0.1/rainyday.min.js",
          body: true,
          async: true,
        },
      ],
    };
  },
};
</script>

<style lang="less">
</style>
