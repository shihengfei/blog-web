<template>
  <div class="static-build-wrap">
    <el-tabs type="border-card">
      <el-tab-pane label="静态化部署">
        <buildHandle />
      </el-tab-pane>
      <el-tab-pane label="部署日志">部署日志</el-tab-pane>
      <el-tab-pane label="日志分析">日志分析</el-tab-pane>
      <el-tab-pane label="自动部署设置">自动部署设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buildHandle from "./component/buildHandle";
import buildList from "./component/buildList";
import buildChart from "./component/buildChart";

export default {
  layout: "admin",
  components: {
    buildHandle,
    buildList,
    buildChart,
  },
  head() {
    return {
      title: "博客管理系统-静态化部署",
    };
  },
};
</script>

<style lang="less">
.static-build {
  &-wrap {
  }
}
</style>