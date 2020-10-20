<template>
  <div class="article-add">
    <div class="article-add-header">
      <div class="article-add-header-left">
        <el-form :inline="true">
          <el-form-item label="文章分类">
            <el-cascader
              v-model="form.articleCategory"
              placeholder="选择文章分类"
              :options="categoryList"
              clearable
              :props="{
              value: 'categoryId',
              label: 'categoryName',
              multiple: true
            }"
            />
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="form.articleType" placeholder="选择文章类型">
              <el-option
                v-for="item in articleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="article-add-header-middle">
        <input type="text" v-model="form.articleTitle" />
      </div>
      <div class="article-add-header-right">
        <el-button type="primary">保存草稿</el-button>
        <el-button type="primary">发布</el-button>
      </div>
    </div>
    <div class="article-add-main">
      <no-ssr>
        <mavon-editor v-model="form.articleContent" />
        <!-- <div
          class="quill-editor"
          :content="form.articleContent"
          v-quill:myQuillEditor="editorOption"
          v-show="form.articleType === 'richtext'"
        ></div> -->
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { Axios } from "@utils";

export default {
  layout: "blank",
  head() {
    return {
      title: "博客管理系统-添加文章",
    };
  },
  data() {
    return {
      form: {
        articleTitle: "未命名文章",
        articleContent: "",
        articleCategory: [],
        articleType: "markdown",
      },
      articleType: [
        {
          value: "richtext",
          label: "富文本格式",
        },
        {
          value: "markdown",
          label: "markdown格式",
        },
      ],
      categoryList: [],
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
          ],
        },
      },
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = (await Axios.get("/admin/category")) || [];
    },
  },
};
</script>

<style lang="less">
.article {
  &-add {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &-header {
      min-height: 60px;
      padding: 30px;
      display: flex;
      box-shadow: rgb(170, 170, 170) 0px 0px 2px;
      &-left,
      &-middle,
      &-right {
        flex: 1;
      }
      &-left {
      }
      &-middle {
        text-align: center;
        input {
          border: none;
          outline: none;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          &:focus {
            border-bottom: 2px solid #860314;
          }
        }
      }
      &-right {
        text-align: right;
      }
    }
    &-main {
      flex: 1;
      .markdown-body {
        height: 100%;
      }
    }
  }
}
</style>