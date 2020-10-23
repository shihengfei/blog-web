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
              v-model="articleCategory"
              placeholder="选择文章分类"
              :options="categoryList"
              @change="categoryChange"
              clearable
              :props="{
                value: 'categoryId',
                label: 'categoryName',
                multiple: true,
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
        <span v-if="saveLoading" class="tip">
          <i class="el-icon-loading"></i>
          文章保存中
        </span>
        <span v-else class="tip">{{ saveMessage }}</span>
        <el-button type="primary" @click="publish()" style="margin-left: 15px">发布</el-button>
      </div>
    </div>
    <div class="article-add-main">
      <markdownEditor ref="markdownEditor" @contentChange="markdownEditorChange" />
    </div>

    <confirm ref="confirm" />
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
      script: [
        {
          type: "text/javascript",
          src: "https://unpkg.com/wangeditor/dist/wangEditor.min.js",
          body: true,
        },
      ],
    };
  },
  asyncData({ app, query }, callback) {
    app.head.title = `博客管理系统-${
      query.type === "create" ? "添加文章" : "编辑文章"
    }`;
    callback(null, {});
  },
  components: {
    markdownEditor,
    richtextEditor,
  },
  data() {
    return {
      articleCategory: [],
      loading: null,
      notify: null,
      saveLoading: false,
      saveMessage: null,
      form: {
        articleId: null,
        articleTitle: "未命名文章",
        articleContentCode: "",
        articleContentSource: "",
        articleType: "markdown",
        firstCategoryId: "",
        secondCategoryId: "",
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
    this.notify = this.$notify.info({
      title: "温馨提示",
      message: "文章实时自动保存至草稿",
      position: "bottom-right",
      duration: 0,
    });
    if (this.type === "create") {
      this.getCategoryList();
      this.initCreate();
    } else {
      this.loading = this.$loading({
        lock: true,
        text: "加载文章中",
        spinner: "el-icon-loading",
      });
      this.getCategoryList(this.initEdit);
    }
  },
  destroyed() {
    this.notify.close();
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
      const result = await Axios.get(`/admin/article/view/${articleId}`);
      this.loading.close();
      this.form = {
        articleId,
        articleTitle: result.articleTitle,
        articleContentCode: result.articleContent.articleContentCode,
        articleContentSource: result.articleContent.articleContentSource,
        articleType: "markdown",
        firstCategoryId: result.firstCategoryId, // 一级分类
        secondCategoryId: result.secondCategoryId, // 二级分类
      };
      const categoryList = this.categoryList
        .map((item) => item.children)
        .flat();
      this.articleCategory = result.secondCategoryId
        ? result.secondCategoryId.split(",").map((item) => {
            const article = categoryList.filter(
              (filterItem) => item === filterItem.categoryId
            )[0];
            return [article.categoryParentId, item];
          })
        : [];
      this.$refs["markdownEditor"].setEditorContent(
        result.articleContent.articleContentSource
      );
    },
    /*
     *@title: 获取分类数据
     *@description:
     *@author: lupan
     *@date: 2020-10-21 13:49:55
     */
    async getCategoryList(cb = () => {}) {
      this.categoryList = (await Axios.get("/admin/category")) || [];
      cb();
    },
    /*
     *@title: 文章发布
     *@description:
     *@author: lupan
     *@date: 2020-10-21 13:50:51
     */
    async publish() {
      this.$refs["confirm"].open({
        message: `是否发布文章《${this.form.articleTitle}》`,
        ok: async (cb) => {
          const result = await Axios.put(
            `/admin/article/publish/${this.form.articleId}/formal`,
            {},
            { allData: true }
          );
          cb();
          if (!result.success) return;
          this.$message.success(
            "文章发布成功，请手动执行或等待自动执行静态化部署"
          );
          this.$router.push("/admin/main/articleList");
        },
      });
    },
    /*
     *@title: 文章实时保存
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:32:21
     */
    realTimeSave: _.debounce(function () {
      this.save();
    }, 1000),
    /*
     *@title: 文章保存草稿
     *@description:
     *@author: lupan
     *@date: 2020-10-21 14:52:29
     */
    async save() {
      this.saveLoading = true;
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
      this.saveLoading = false;
      this.saveMessage = `${Moment().format(
        "YYYY-MM-DD HH:mm:ss"
      )} 已保存至草稿`;
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
     *@name: 文章分类数据改变
     *@param:{type}
     *@description:
     *@return:
     *@author: lupan
     *@date: 2020-10-22 08:22:14
     */
    categoryChange(e) {
      console.log(e);
      const firstArr = e.map((item) => item[0]);
      const secondArr = e.map((item) => item[1]);
      this.form.firstCategoryId = Array.from(new Set(firstArr)).join(",");
      this.form.secondCategoryId = Array.from(new Set(secondArr)).join(",");
      this.realTimeSave();
    },
    /*
     *@title: makedown内容改变
     *@description:
     *@author: lupan
     *@date: 2020-10-21 15:08:29
     */
    markdownEditorChange({ source, code }) {
      this.form.articleContentSource = source;
      this.form.articleContentCode = code;
      console.log(this.form);
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
      background: #ffffff;
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
        .tip {
          font-size: 15px;
          color: #666;
        }
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