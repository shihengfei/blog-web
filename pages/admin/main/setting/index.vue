<template>
  <div class="blog-setting-wrap">
    <el-tabs type="border-card">
      <el-tab-pane label="网站设置">
        <BlogSetting />
      </el-tab-pane>
      <el-tab-pane label="云存储(cos)设置">
        <CosSetting />
      </el-tab-pane>
      <el-tab-pane label="账号设置">账号设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BlogSetting from "./component/blogSetting";
import CosSetting from "./component/cosSetting";
export default {
  layout: "admin",
  components: {
    BlogSetting,
    CosSetting,
  },
};
</script>

<style>
</style>