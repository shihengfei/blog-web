<template>
  <div class="article-details-wrap">
    <div class="article-details-title">{{ article.articleTitle }}</div>
    <div class="article-details-date">
      {{ article.createdAt | dateFilter("YYYY/MM/DD HH:mm:ss") }}
    </div>
    <div
      class="article-details-content markdown-body"
      v-html="article.articleContent.articleContentCode"
    ></div>
  </div>
</template>

<script>
import { Axios } from "@utils";
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-forest-dark.min.css",
        },
      ],
    };
  },
  async asyncData({ app, params }) {
    const [config, article] = await Promise.all([
      Axios.get("/web/config"),
      Axios.get(`/web/article/view/${params.id}`),
    ]);
    app.head.title = `${article.articleTitle} | ${config.title}`;
    app.head.meta = [
      { charset: "utf-8" },
      { name: "description", content: config.description },
      { name: "keywords", content: config.keywords },
    ];
    return {
      article,
    };
  },
};
</script>

<style lang="less">
.article-details {
  &-wrap {
    max-width: 800px;
    margin: 0 auto;
    font-size: 15px;
    line-height: 1.75;
    font-weight: 400;
    background: #ffffff;
    transition: background 0.5s;
    min-height: calc(100vh - 60px);
    margin-top: 60px;
    padding: 2rem 2.5rem;
    // overflow-y: auto;
  }
  &-title {
    font-weight: bold;
    font-size: 30px;
  }
  &-date {
    margin-top: 8px;
    color: #909399;
    font-size: 14px;
    margin-bottom: 20px;
  }
  &-content {
  }
}
</style>