<template>
  <div class="article-add">
    <div class="article-add-header">
      <div class="article-add-header-left">
        <el-form :inline="true">
          <el-form-item>
            <el-button @click="goToList">返回至列表</el-button>
          </el-form-item>
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
        <input type="text" v-model="form.articleTitle" placeholder="请输入文章标题" @input="titleChange" />
      </div>
      <div class="article-add-header-right">
        <el-button type="primary" @click="publish()">发布</el-button>
      </div>
    </div>
    <div class="article-add-main">
      <markdownEditor ref="markdownEditor" @contentChange="markdownEditorChange" />
    </div>
  </div>
</template>

<script>
import { Axios, Uuid, _, Moment } from "@utils";
import markdownEditor from "@components/markdownEditor";
import richtextEditor from "@components/richtextEditor";
export default {
  layout: "blank",
  head() {
    return {
      title: "博客管理系统-添加文章",
      script: [
        {
          type: "text/javascript",
          src: "https://unpkg.com/wangeditor/dist/wangEditor.min.js",
          body: true,
        },
      ],
    };
  },
  components: {
    markdownEditor,
    richtextEditor,
  },
  data() {
    return {
      form: {
        articleId: null,
        articleTitle: "未命名文章",
        articleContentCode: "",
        articleContentSource: "",
        articleCategory: [],
        articleType: "markdown",
      },
      articleType: [
        {
          value: "richtext",
          label: "富文本",
        },
        {
          value: "markdown",
          label: "markdown",
        },
      ],
      categoryList: [],
    };
  },
  computed: {
    type() {
      return this.$route.query.type;
    },
  },
  mounted() {
    this.getCategoryList();
    this.$notify.info({
      title: "温馨提示",
      message: "文章实时自动保存至草稿",
    });
    this.type === "create" ? this.initCreate() : this.initEdit();
  },
  methods: {
    /*
     *@title: 文章创建初始化
     *@description:
     *@author: lupan
     *@date: 2020-10-21 18:03:56
     */
    initCreate() {
      this.form.articleId = Uuid.v1();
      this.save();
    },
    /*
     *@title: 文章编辑初始化
     *@description:
     *@author: lupan
     *@date: 2020-10-21 18:04:09
     */
    async initEdit() {
      const { articleId } = this.$route.query;
      this.form.articleId = articleId;
      const loading = this.$loading({
        lock: true,
        text: "加载文章中",
        spinner: "el-icon-loading",
      });
      const result = await Axios.get(`/admin/article/view/${articleId}`);
      loading.close();
      this.form = {
        articleId,
        articleTitle: result.articleTitle,
        articleContent: result.articleContent.articleContent,
        articleCategory: [],
        articleType: "markdown",
      };
      this.$refs["markdownEditor"].setEditorContent(
        result.articleContent.articleContent
      );
    },
    /*
     *@title: 获取分类数据
     *@description:
     *@author: lupan
     *@date: 2020-10-21 13:49:55
     */
    async getCategoryList() {
      this.categoryList = (await Axios.get("/admin/category")) || [];
    },
    /*
     *@title: 文章发布
     *@description:
     *@author: lupan
     *@date: 2020-10-21 13:50:51
     */
    async publish() {},
    /*
     *@title: 文章实时保存
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:32:21
     */
    realTimeSave: _.debounce(function () {
      this.save();
    }, 3000),
    /*
     *@title: 文章保存草稿
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:52:29
     */
    async save() {
      const result = await Axios.post(
        "/admin/article",
        {
          ...this.form,
          ...{
            articleState: "draft",
          },
        },
        { allData: true }
      );
      if (!result.success) return;
      this.$notify.success({
        title: "温馨提示",
        message: `${Moment().format("YYYY-MM-DD HH:mm:ss")} 已保存至草稿`,
      });
    },
    /*
     *@title: 标题数据改变
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:52:40
     */
    titleChange() {
      this.realTimeSave();
    },
    /*
     *@title: makedown内容改变
     *@description:
     *@author: lupan
     *@date: 2020-10-21 15:08:29
     */
    markdownEditorChange(source, code) {
      this.form.articleContentSource = source;
      this.form.articleContentCode = code;
      this.save();
    },
    /*
     *@title: 返回列表
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:22:48
     */
    goToList() {
      this.$router.push("/admin/main/articleList");
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
      &-left {
        // flex: 3;
      }
      &-middle {
        margin-left: 50px;
        text-align: left;
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
        flex: 1;
        text-align: right;
      }
    }
    &-main {
      flex: 1;
      #Editor {
        height: 100%;
        .w-e-text-container {
          height: calc(100% - 42px) !important;
        }
      }
    }
  }
}
</style>