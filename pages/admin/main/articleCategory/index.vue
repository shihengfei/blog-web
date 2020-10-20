<template>
  <div class="article-category">
    <div class="article-header">
      <el-button type="primary" icon="el-icon-plus" @click="show = true">添加分类</el-button>
    </div>
    <div class="article-main">
      <el-table 
        v-loading="listLoading"
        :data="categoryList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        stripe
        empty-text="暂无分类数据"
        default-expand-all
        :tree-props="{children: 'children'}">
        <el-table-column prop="categoryName" label="分类名称"></el-table-column>
        <el-table-column prop="articleNum" label="文章数量" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createdAt | dateFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="del(scope.row)" type="danger" :disabled="scope.row.children !== undefined">删除</el-button>
            <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      :title="editId ? '编辑分类' : '新增分类'"
      :visible.sync="show"
      @close="close"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-position="top" :model="form" :rules="rules">
        <el-form-item label="分类标题" prop="categoryName">
          <el-input placeholder="输入分类标题" clearable v-model="form.categoryName" />
        </el-form-item>
        <el-form-item label="上级分类" prop="categoryParentId">
          <el-select v-model="form.categoryParentId" placeholder="选择上级分类" style="100%" :disabled="editId !== null">
            <el-option
              v-for="(item, index) in [...[{ value: '-', label: '无' }], ...categoryList]"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="close" :disabled="submitLoading">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="submitLoading">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 二次提示框 -->
    <confirm ref="confirm" />
  </div>
</template>

<script>
import { Axios } from "@utils";
import confirm from '@components/confirm'

export default {
  layout: "admin",
  components: {
    confirm
  },
  head() {
    return {
      title: "博客管理系统-文章分类",
    };
  },
  data() {
    return {
      listLoading: false,
      submitLoading: false,
      show: false,
      categoryList: [],
      editId: null,
      form: {
        categoryName: null,
        categoryParentId: null,
      },
      rules: {
        categoryName: [
          { required: true, message: "输入分类名称", trigger: "blur" },
        ],
        categoryParentId: [
          { required: true, message: "选择上级分类", trigger: "change" },
        ],
      }
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      this.listLoading = true;
      const result = await Axios.get("/admin/category");
      this.listLoading = false;
      this.categoryList = (result || []).map((item) => {
        item.label = item.categoryName;
        item.value = item.categoryId;
        return item;
      });
    },
    del (e) {
      console.log(e)
      this.$refs['confirm'].open({
        message: `是否删除文章分类《${e.categoryName}》？`,
        ok: async (cb) => {
          const result = await Axios.del(`/admin/category/${e.categoryId}`, {}, { allData: true });
          cb();
          if (!result.success) return;
          this.$message.success('文章分类删除成功');
          this.getCategoryList();
        }
      })
    },
    edit (e) {
      this.editId = e.categoryId;
      this.form = {
        categoryName: e.categoryName,
        categoryParentId: e.categoryParentId ? e.categoryParentId : '-'
      };
      this.show = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.editId = null;
      this.show = false;
    },
    submit() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        if (this.editId) {
          this.submitLoading = true;
          const result = await Axios.put(`/admin/category/${this.editId}`, { categoryName: this.form.categoryName }, {
            allData: true,
          });
          this.submitLoading = false;
          if (!result.success) return;
          this.$message.success('文章分类编辑成功');
        } else {
          const params = {
            categoryName: this.form.categoryName,
            categoryParentId:
              this.form.categoryParentId === "-"
                ? null
                : this.form.categoryParentId,
          };
          this.submitLoading = true;
          const result = await Axios.post("/admin/category", params, {
            allData: true,
          });
          this.submitLoading = false;
          if (!result.success) return;
          this.$message.success('文章分类新增成功');
        }
        this.close();
        this.getCategoryList();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  &-header {
    text-align: right;
    margin-bottom: 30px;
  }
}
</style>