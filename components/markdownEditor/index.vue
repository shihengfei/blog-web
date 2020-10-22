<template>
  <no-ssr>
    <mavon-editor :value="editorContent" @change="change" />
  </no-ssr>
</template>

<script>
import { _ } from "@utils";

export default {
  data() {
    return {
      editorContent: "",
    };
  },
  methods: {
    /*
     *@title: 初始化文章内容
     *@description:
     *@author: lupan
     *@date: 2020-10-21 13:47:27
     */
    setEditorContent(content) {
      this.editorContent = content;
    },
    emitChange: _.debounce(function (source, code) {
      this.$emit("contentChange", { source, code });
    }, 3000),
    /*
     *@title: 内容改变回调
     *@description:
     *@author: lupan
     *@date: 2020-10-21 15:01:23
     */
    change(source, code) {
      this.emitChange(source, code);
    },
  },
};
</script>

<style lang="less">
.markdown-body {
  height: 100%;
}
</style>