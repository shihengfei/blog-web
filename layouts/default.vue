<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header";

export default Vue.extend({
  components: {
    Header,
  },
  data() {
    return {};
  },
});
</script>
