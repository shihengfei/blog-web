<template>
  <div class="blog-setting-wrap">
    <el-form
      ref="form"
      label-position="left"
      label-width="100px"
      class="blog-setting-form"
      v-loading="loading"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="网站名称" prop="title">
        <el-input placeholder="输入网站名称" v-model="form.title" />
      </el-form-item>
      <el-form-item label="网站描述" prop="description">
        <el-input type="textarea" :rows="2" placeholder="输入网站描述" v-model="form.description" />
      </el-form-item>
      <el-form-item label="网站关键词" prop="keywords">
        <el-input type="textarea" :rows="2" placeholder="输入网站关键词" v-model="form.keywords" />
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
        title: null,
        description: null,
        keywords: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "输入网站标题",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "输入网站描述",
            trigger: "blur",
          },
        ],
        keywords: [
          {
            required: true,
            message: "输入网站关键词",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getWebSetting();
  },
  methods: {
    async getWebSetting() {
      this.loading = true;
      const result = await Axios.get("/admin/setting/web");
      this.loading = false;
      this.form = result || {};
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.$refs["confirm"].open({
          message: "是否更新网站设置",
          ok: async (cb) => {
            const result = await Axios.post(`/admin/setting/web`, this.form, {
              allData: true,
            });
            cb();
            if (!result.success) return;
            this.$message.success(
              "网站设置更新成功，请手动执行或等待自动执行静态化部署"
            );
            this.getWebSetting();
          },
        });
      });
    },
  },
};
</script>

<style lang="less">
.blog-setting {
  &-wrap {
  }
  &-form {
    width: 500px;
    margin: 0 auto;
  }
}
</style>