<template>
  <no-ssr>
    <mavon-editor
      :value="editorContent"
      @change="change"
      ref="md"
      codeStyle="atelier-forest-dark"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
    />
  </no-ssr>
</template>

<script>
import { _, Cos } from "@utils";

export default {
  data() {
    return {
      editorContent: "",
    };
  },
  methods: {
    /*
     *@title: 添加图片
     *@description:
     *@author: lupan
     *@date: 2020-10-26 14:16:28
     */
    async handleEditorImgAdd(pos, file) {
      const cosResult = await Cos.upload(file);
      this.$refs["md"].$img2Url(pos, `https://${cosResult.Location}`);
      console.log(cosResult.Location);
    },
    /*
     *@title: 删除图片
     *@description:
     *@author: lupan
     *@date: 2020-10-26 14:16:45
     */
    async handleEditorImgDel(pos) {
      const posArr = pos[0].split("/");
      await Cos.del(posArr[posArr.length - 1]);
    },
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
    }, 1000),
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