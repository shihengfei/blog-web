<template>
  <div id="Editor"></div>
</template>

<script>
export default {
  methods: {
    init() {
      const E = window.wangEditor;
      console.log(E, document.getElementById("Editor"));
      const editor = new E("#Editor");
      // 或者 const editor = new E( document.getElementById('div1') )
      editor.create();
    },
  },
};
</script>

<style>
</style>