<template>
  <div class="article-list">
    <div class="article-header">
      <el-form :inline="true" ref="queryForm">
        <el-form-item label="文章标题">
          <el-input placeholder="输入文章标题" clearable v-model="form.articleTitle" />
        </el-form-item>
        <el-form-item label="文章分类">
          <el-cascader
            v-model="form.categoryId"
            placeholder="选择文章分类"
            :options="categoryList"
            clearable
            :props="{
              value: 'categoryId',
              label: 'categoryName',
              checkStrictly: true,
            }"
          />
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="form.articleState" clearable>
            <el-option
              :value="item.value"
              v-for="item in articleState"
              :key="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" @click="createArticle">添加文章</el-button>
    </div>
    <div class="article-main">
      <el-table :data="articeleList" border v-loading="listLoading">
        <el-table-column prop="articleTitle" label="标题" align="center" width="300"></el-table-column>
        <el-table-column label="一级分类" align="center">
          <template slot-scope="scope">{{ scope.row.firstCategoryId | firstCategory }}</template>
        </el-table-column>
        <el-table-column label="二级分类" align="center">
          <template slot-scope="scope">{{ scope.row.secondCategoryId | secondCategory }}</template>
        </el-table-column>
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
          <template slot-scope="scope">
            {{
            scope.row.createdAt | dateFilter
            }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="scope">
            {{
            scope.row.updatedAt | dateFilter
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="del(scope.row)"
              v-if="scope.row.articleState === 'draft'"
            >删除</el-button>
            <el-button
              type="primary"
              @click="edit(scope.row)"
              v-if="scope.row.articleState === 'draft'"
            >编辑</el-button>
            <el-button
              type="warning"
              @click="taskBack(scope.row)"
              v-if="scope.row.articleState === 'formal'"
            >收回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="article-page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          @current-change="currentChange"
        />
      </div>
    </div>
    <confirm ref="confirm" />
  </div>
</template>

<script>
import { Axios } from "@utils";
let self;

export default {
  layout: "admin",
  head() {
    return {
      title: "博客管理系统-文章列表",
    };
  },
  filters: {
    firstCategory(e) {
      if (!e) return "-";
      const categoryArr = e.split(",");
      return categoryArr
        .map(
          (id) =>
            self.categoryList.filter((item) => item.categoryId === id)[0]
              .categoryName
        )
        .join(",");
    },
    secondCategory(e) {
      if (!e) return "-";
      console.log(e);
      const categoryArr = e.split(",");
      console.log(categoryArr);
      return categoryArr
        .map(
          (id) =>
            self.categoryList
              .map((item) => (item.children ? item.children : []))
              .flat()
              .filter((item) => item.categoryId === id)[0].categoryName
        )
        .join(",");
    },
  },
  data() {
    return {
      form: {
        articleTitle: null,
        articleState: null,
        categoryId: null,
      },
      queryForm: {
        articleTitle: "",
        articleState: "",
        firstCategoryId: "",
        secondCategoryId: "",
      },
      articleState: [
        {
          value: "draft",
          label: "草稿",
        },
        {
          value: "formal",
          label: "已发布",
        },
      ],
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
    self = this;
    this.getCategoryList();
  },
  methods: {
    /*
     *@title: 重置
     *@description:
     *@author: lupan
     *@date: 2020-10-22 09:49:21
     */
    reset() {
      this.queryForm = {
        articleTitle: "",
        firstCategoryId: "",
        secondCategoryId: "",
        articleState: "",
      };
      this.form = {
        articleTitle: null,
        categoryId: null,
        articleState: null,
      };
      this.pageObj.pageNo = 1;
      this.getArticleList();
    },
    /*
     *@title: 查询
     *@description:
     *@author: lupan
     *@date: 2020-10-22 09:49:40
     */
    search() {
      this.queryForm = {
        articleTitle: this.form.articleTitle,
        articleState: this.form.articleState,
        firstCategoryId: this.form.categoryId
          ? this.form.categoryId.length === 1
            ? this.form.categoryId[0]
            : ""
          : "",
        secondCategoryId: this.form.categoryId
          ? this.form.categoryId.length === 2
            ? this.form.categoryId[1]
            : ""
          : "",
      };
      this.pageObj.pageNo = 1;
      this.getArticleList();
    },
    /*
     *@title: 获取分类数据
     *@description:
     *@author: lupan
     *@date: 2020-10-22 13:27:52
     */
    async getCategoryList() {
      this.categoryList = (await Axios.get("/admin/category")) || [];
      this.getArticleList();
    },
    /*
     *@title: 分页改变
     *@description:
     *@author: lupan
     *@date: 2020-10-22 11:40:02
     */
    currentChange(e) {
      this.pageObj.pageNo = e;
      this.getArticleList();
    },
    /*
     *@title: 创建文章
     *@description:
     *@author: lupan
     *@date: 2020-10-22 13:28:02
     */
    createArticle() {
      this.$router.push({
        path: "/admin/main/articleWrite",
        query: {
          type: "create",
        },
      });
    },
    async getArticleList() {
      this.listLoading = true;
      const result = await Axios.get("/admin/article", {
        ...this.pageObj,
        ...this.queryForm,
      });
      this.listLoading = false;
      this.articeleList = result ? result.rows : [];
      this.total = result ? result.count : 0;
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
          this.$message.success(
            "文章删除成功，请手动执行或等待自动执行静态化部署"
          );
          this.getArticleList();
        },
      });
    },
    /*
     *@title: 撤回
     *@description:
     *@author: lupan
     *@date: 2020-10-22 10:37:21
     */
    taskBack(row) {
      this.$refs["confirm"].open({
        message: `是否撤回已发布文章《${row.articleTitle}》至草稿？`,
        ok: async (cb) => {
          const result = await Axios.put(
            `/admin/article/publish/${row.articleId}/draft`,
            {},
            { allData: true }
          );
          cb();
          if (!result.success) return;
          this.$message.success(
            "文章收回成功，请手动执行或等待自动执行静态化部署"
          );
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