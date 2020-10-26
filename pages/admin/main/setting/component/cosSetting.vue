<template>
  <div class="cos-setting-wrap">
    <el-form
      ref="form"
      label-position="left"
      label-width="100px"
      class="cos-setting-form"
      v-loading="loading"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="SecretId" prop="SecretId">
        <el-input placeholder="输入SecretId" v-model="form.SecretId" />
      </el-form-item>
      <el-form-item label="SecretKey" prop="SecretKey">
        <el-input placeholder="输入SecretKey" v-model="form.SecretKey" />
      </el-form-item>
      <el-form-item label="Bucket" prop="Bucket">
        <el-input placeholder="输入Bucket" v-model="form.Bucket" />
      </el-form-item>
      <el-form-item label="Region" prop="Region">
        <el-input placeholder="Region" v-model="form.Region" />
      </el-form-item>
      <el-button size="medium" type="primary" style="width: 100%" @click="submit">更新设置</el-button>
    </el-form>
    <Confirm ref="confirm" />
  </div>
</template>

<script>
import { Axios } from "@utils";

export default {
  data() {
    return {
      loading: false,
      form: {
        SecretId: null,
        SecretKey: null,
        Bucket: null,
        Region: null,
      },
      rules: {
        SecretId: [
          {
            required: true,
            message: "输入SecretId",
            trigger: "blur",
          },
        ],
        SecretKey: [
          {
            required: true,
            message: "输入SecretKey",
            trigger: "blur",
          },
        ],
        Bucket: [
          {
            required: true,
            message: "输入Bucket",
            trigger: "blur",
          },
        ],
        Region: [
          {
            required: true,
            message: "输入Region",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getSetting();
  },
  methods: {
    async getSetting() {
      this.loading = true;
      const result = await Axios.get("/admin/setting/cos");
      this.loading = false;
      this.form = result || {};
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.$refs["confirm"].open({
          message: "是否更新云存储(cos)设置",
          ok: async (cb) => {
            const result = await Axios.post(`/admin/setting/cos`, this.form, {
              allData: true,
            });
            cb();
            if (!result.success) return;
            this.$message.success(
              "云存储(cos)设置更新成功，请手动执行或等待自动执行静态化部署"
            );
            this.getSetting();
          },
        });
      });
    },
  },
};
</script>

<style lang="less">
.cos-setting {
  &-wrap {
  }
  &-form {
    width: 500px;
    margin: 0 auto;
  }
}
</style>