<template>
  <el-dialog title="温馨提示" custom-class="confirm-dialog" :visible.sync="show">
    <div class="confirm-content">
      <i class="el-icon-warning" style="color: #e6a23c"></i>
      <div class="confirm-message">{{ message }}</div>
    </div>
    <div slot="footer">
      <el-button :disabled="isLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="isLoading" @click="ok">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      show: false,
      isLoading: false,
      okFn: null
    };
  },
  methods: {
    open(config = {}) {
      this.show = true;
      this.message = config.message;
      this.okFn = config.ok;
    },
    cancel () {
      this.message = null;
      this.okFn = null;
      this.isLoading = false;
      this.show = false;
    },
    ok () {
      this.isLoading = true;
      this.okFn(() => {
        this.cancel();
      });
    }
  },
};
</script>

<style lang="less">
.confirm-dialog {
  border-radius: 5px;
  .el-dialog__header {
    padding: 15px 15px 10px;
  }
  .el-dialog__title {
    font-size: 18px;
  }
  .el-dialog__body {
    padding: 10px;
    .confirm-content {
      line-height: 30px;
      display: flex;
      .el-icon-warning {
        font-size: 24px;
        margin-right: 10px;
        margin-top: 3px;
      }
      .confirm-message {
        font-size: 14px;
      }
    }
  }
  .el-dialog__footer {
    padding: 10px;
  }
}
</style>