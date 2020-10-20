<template>
  <div class="article-list">
    <div class="article-header">
      <el-form :inline="true" ref="queryForm">
        <el-form-item label="文章名称">
          <el-input placeholder="输入文章名称" clearable v-model="queryForm.categoryName"/>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-cascader
            v-model="queryForm.categoryId"
            placeholder="选择文章分类"
            :options="categoryList"
            clearable
            :props="{
              value: 'categoryId',
              label: 'categoryName',
              checkStrictly: true
            }"
          />
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="addArticle">添加文章</el-button>
    </div>
  </div>
</template>

<script>
import { Axios } from '@utils';

export default {
  layout: "admin",
  head() {
    return {
      title: "博客管理系统-文章列表",
    };
  },
  data () {
    return {
      queryForm: {
        categoryName: null,
        categoryId: null
      },
      categoryList: []
    }
  },
  mounted () {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList () {
      this.categoryList = await Axios.get('/admin/category') || [];
      console.log(this.categoryList)
    },
    addArticle () {
      window.open("/admin/main/articleAdd", "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  &-header {
    margin-bottom: 30px;
    display: flex;
    .el-form {
      flex: 1;
    }
    .el-form-item--mini.el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>