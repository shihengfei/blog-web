<template>
  <div class="article-category">
    <div class="article-header">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="show = true">添加分类</el-button>
    </div>
    <div class="article-main">
      <el-table border :data="categoryList">
        <el-table-column prop="date" label="分类标题" align="center"></el-table-column>
        <el-table-column prop="name" label="上级分类" align="center"></el-table-column>
        <el-table-column prop="address" label="文章数量" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="isEdit ? '编辑分类' : '新增分类'" :visible="show" width="500px" @close="close">
      <el-form ref="form" label-position="top">
        <el-form-item label="分类标题">
          <el-input placeholder="输入分类标题" clearable v-model="form.categoryName" />
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="form.categoryParentId" placeholder="选择上级分类" style="100%">
            <el-option
              v-for="(item, index) in [...categoryList, ...[{ value: null, label: '无' }]]"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button type="primary" size="mini" @click="submit">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Axios } from "@utils";

export default {
  layout: "admin",
  data() {
    return {
      show: false,
      categoryList: [],
      isEdit: false,
      editId: null,
      form: {
        categoryName: null,
        categoryParentId: null,
      },
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const result = await Axios.get("/admin/category");
      console.log(result);
    },
    close() {
      console.log("关闭");
    },
    submit() {
      console.log(11111);
    },
  },
};
</script>

<style lang="less">
.article {
  &-header {
    text-align: right;
    margin-bottom: 30px;
  }
  &-main {
  }
}
</style>