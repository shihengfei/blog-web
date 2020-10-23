<template>
  <div class="article-item" @click="toArticleDetails">
    <div class="article-title">{{ article.articleTitle }}</div>
    <div class="article-date">
      {{ article.createdAt | dateFilter("MMMM Do,YYYY") }}
    </div>
    <div class="article-category">
      <el-tag
        v-for="item in [...article.firstCategory, ...article.secondCategory]"
        :key="item.categoryId"
        :style="{
          background: item.categoryBgColor,
        }"
        >{{ item.categoryName }}</el-tag
      >
    </div>
    <div class="article-top" v-if="article.isTop">
      <span class="iconfont icon-top"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toArticleDetails() {
      this.$router.push(`/article/${this.article.articleId}`);
    },
  },
};
</script>

<style lang="less">
.article {
  &-item {
    display: block;
    font-size: 15px;
    max-width: 850px;
    background: #ffffff;
    padding: 1rem 2rem;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 20px;
    transition: background 0.5s;
    cursor: pointer;
    position: relative;
    &:first-child {
      margin-top: 0;
    }
  }
  &-title {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.87);
    line-height: 1.5;
    font-weight: bold;
  }
  &-date {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 10px;
  }
  &-category {
    .el-tag {
      color: #ffffff;
      margin-right: 15px;
      &--mini {
        border: none;
      }
    }
  }
  &-top {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: 50px solid #000;
    border-left: 50px solid transparent;
    color: #ffffff;
    .iconfont {
      position: absolute;
      top: -40px;
      left: -20px;
    }
  }
}
</style>