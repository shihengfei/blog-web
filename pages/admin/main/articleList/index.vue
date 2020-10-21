<template>
  <div class="article-list">
    <div class="article-header">
      <el-form :inline="true" ref="queryForm">
        <el-form-item label="文章名称">
          <el-input placeholder="输入文章名称" clearable v-model="queryForm.categoryName" />
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
    <div class="article-main">
      <el-table :data="articeleList" border v-loading="listLoading">
        <el-table-column prop="articleTitle" label="标题" align="center" width="300"></el-table-column>
        <el-table-column prop="name" label="分类" align="center"></el-table-column>
        <el-table-column label="状态" width="70" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.articleState === 'draft'">草稿</el-tag>
            <el-tag v-else>已发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.articleType === 'markdown'">markdown</el-tag>
            <el-tag type="warning" v-else>富文本</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150px" align="center">
          <template slot-scope="scope">{{ scope.row.createdAt | dateFilter }}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="scope">{{ scope.row.updatedAt | dateFilter }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="article-page">
        <el-pagination background layout="total, prev, pager, next" :total="total" />
      </div>
    </div>
    <confirm ref="confirm" />
  </div>
</template>

<script>
import { Axios } from "@utils";
import confirm from "@components/confirm";

export default {
  layout: "admin",
  head() {
    return {
      title: "博客管理系统-文章列表",
    };
  },
  components: {
    confirm,
  },
  data() {
    return {
      queryForm: {
        categoryName: null,
        categoryId: null,
      },
      listLoading: false,
      categoryList: [],
      articeleList: [],
      pageObj: {
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  mounted() {
    this.getCategoryList();
    this.getArticleList();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = (await Axios.get("/admin/category")) || [];
      console.log(this.categoryList);
    },
    addArticle() {
      this.$router.push({
        path: "/admin/main/articleWrite",
        query: {
          type: "create",
        },
      });
    },
    async getArticleList() {
      this.listLoading = true;
      const result = await Axios.get("/admin/article", { ...this.pageObj });
      this.listLoading = false;
      this.articeleList = result ? result.rows : [];
      this.total = result ? result.count : 0;
      console.log(result);
    },
    /*
     *@title: 编辑
     *@description:
     *@author: lupan
     *@date: 2020-10-21 17:55:34
     */
    edit(row) {
      this.$router.push({
        path: "/admin/main/articleWrite",
        query: {
          type: "edit",
          articleId: row.articleId,
        },
      });
    },
    /*
     *@title: 删除
     *@description:
     *@author: lupan
     *@date: 2020-10-21 18:26:50
     */
    del(row) {
      this.$refs["confirm"].open({
        message: `是否删除文章《${row.articleTitle}》？`,
        ok: async (cb) => {
          const result = await Axios.del(
            `/admin/article/${row.articleId}`,
            {},
            { allData: true }
          );
          cb();
          if (!result.success) return;
          this.$message.success("文章删除成功");
          this.getArticleList();
        },
      });
    },
  },
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
  &-page {
    margin-top: 30px;
    text-align: right;
  }
}
</style>