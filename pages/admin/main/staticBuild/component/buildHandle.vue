<template>
  <div class="build-handle-wrap">
    <div class="build-handle-header">
      <el-button type="primary" @click="buildHandle" :disabled="buildState === 'build'">
        <i class="el-icon-loading" style="margin-right: 10px" v-if="buildState === 'build'" />
        {{ buildState === 'build' ? '部署中' : '开始部署' }}
      </el-button>
    </div>
    <div class="build-handle-window" ref="logContent">
      <div v-if="buildState === 'notStart'">没有部署任务</div>
      <div v-else>
        <div>{{ log }}</div>
        <div>
          <span v-if="buildState === 'build'">
            <i class="el-icon-loading" style="margin-right: 10px" />
            <span>[{{ timeStamp | dateFilter }}] 部署中...</span>
          </span>
          <span v-else>
            <i class="el-icon-check" style="margin-right: 10px" />
            <span>[{{ timeStamp | dateFilter }}] 部署成功</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Axios } from "@utils";
import Socket from "socket.io-client";

export default {
  data() {
    return {
      WS: null,
      log: null,
      buildState: "notStart",
      timeStamp: null,
    };
  },
  mounted() {
    this.initSocket();
  },
  methods: {
    async buildHandle() {
      this.WS.emit("staticBuild", { type: "build" });
    },
    /*
     *@title: 注册Scoket
     *@description:
     *@author: lupan
     *@date: 2020-10-23 14:05:37
     */
    initSocket() {
      this.WS = Socket("http://106.54.98.224:7002");
      // this.WS = Socket("http://127.0.0.1:7002");
      this.WS.on("connect", () => {
        console.log("socket连接成功!");
        this.$notify({
          title: "温馨提示",
          message: "服务端通信连接成功",
          position: "bottom-right",
        });
        this.WS.emit("staticBuild", { type: "get" });
      });
      this.WS.on("res", (res) => {
        this.scoketRes(res);
      });
    },
    /*
     *@title: Scoket返回
     *@description:
     *@author: lupan
     *@date: 2020-10-23 14:05:50
     */
    scoketRes(res) {
      if (res.type && res.type === "get" && res.state === "build") {
        this.WS.emit("staticBuild", { type: "get" });
      }
      this.buildState = res.state;
      this.log = res.log;
      this.timeStamp = res.timeStamp;
      this.$nextTick(() => {
        this.$refs.logContent.scrollTop = this.$refs.logContent.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less">
.build-handle {
  &-wrap {
  }
  &-header {
    text-align: right;
  }
  &-window {
    margin-top: 10px;
    height: 500px;
    border: 1px solid #ffffff;
    background: #000000;
    color: #ffffff;
    padding: 20px;
    white-space: pre;
    overflow-y: auto;
    font-size: 12px;
  }
}
</style>