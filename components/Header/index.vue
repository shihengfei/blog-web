<template>
  <div class="header-container">
    <!-- pc端顶部start -->
    <div class="pc-header">
      <div class="pc-header-main" :class="headerClass">
        <!-- logo start -->
        <div class="logo">
          <div class="logo-title">{{ blog.title }}</div>
        </div>
        <!-- logo end -->
        <div class="peeler-wrap">
          <span class="iconfont" :class="'icon-' + blog.skin.icon" @click="switchSkin" />
        </div>
        <!-- 搜索区域 start -->
        <div class="search-container">
          <span class="iconfont icon-search search-icon" />
          <input type="text" class="search-input" />
        </div>
        <div class="navBar-wrap">
          <div class="navBar-item" v-for="(item, index) in navBar" :key="index">
            <nuxt-link
              :to="item.link"
              class="navBar-item__link"
              active-class="navBar-item__link__active"
              :exact="item.exact"
            >{{ item.name }}</nuxt-link>
          </div>
        </div>
        <!-- 搜索区域 end -->
      </div>
    </div>
    <!-- pc端顶部end -->
    <div class="mobile-header">移动端头部</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      scrollTop: 0,
      navBar: [
        {
          name: "首页",
          link: "/",
          exact: true,
        },
        {
          name: "归档",
          link: "/archives",
          exact: false,
        },
        {
          name: "项目",
          link: "/project",
          exact: false,
        },
      ],
    };
  },
  computed: {
    headerClass() {
      if (this.$route.path !== "/") {
        return "default";
      }
      if (this.scrollTop >= 200) {
        return "default";
      } else {
        return "home";
      }
    },
    blog() {
      return this.$store.state["blog"];
    },
  },
  mounted() {
    console.log(this.$store.state["blog"]);
    if (this.$route.path === "/") {
      document.addEventListener("scroll", (e) => {
        this.scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      });
    }
  },
  methods: {
    // 换肤
    switchSkin() {
      this.$store.commit("blog/switchSkin");
    },
  },
});
</script>

<style lang="less">
@media screen and (max-width: 720px) {
  .pc-header {
    display: none;
  }
  .mobile-header {
    display: block;
  }
}
@media screen and (min-width: 720px) {
  .pc-header {
    display: block;
  }
  .mobile-header {
    display: none;
  }
}
.pc-header {
  // border-bottom: 1px solid #2c3e50;
  position: fixed;
  top: 0;
  width: 100vw;
  &-main {
    padding: 0.7rem 1.5rem;
    display: flex;
    transition: background 0.5s;
    &.home {
      background: transparent;
      .logo {
        display: none;
      }
    }
    &.default {
      background: #ffffff;
      .logo {
        display: block;
      }
      .navBar-item__link {
        color: #222;
      }
    }
  }
  .logo {
    &-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      position: relative;
    }
  }
  .peeler {
    &-wrap {
      text-align: right;
      flex: 1;
      line-height: 2rem;
      margin-right: 1.5rem;
      .iconfont {
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
  .search {
    &-container {
      text-align: right;
      position: relative;
    }
    &-icon {
      position: absolute;
      top: 0.3rem;
      right: 8.5rem;
    }
    &-input {
      width: 10rem;
      height: 2rem;
      color: #4e6e8e;
      border-radius: 2rem;
      font-size: 0.9rem;
      line-height: 2rem;
      padding: 0 0.5rem 0 2rem;
      border-width: 1px;
      border-style: solid;
      border-color: #cfd4db;
      outline: none;
      transition: border-color 0.5s;
      &:focus {
        border-color: #3eaf7c;
      }
    }
  }
  .navBar {
    &-wrap {
      display: flex;
      line-height: 2rem;
      font-size: 0.9rem;
      margin-left: 1.5rem;
    }
    &-item {
      // color: #;
      margin-right: 1.5rem;
      &__link {
        color: #ffffff;
        &__active {
          // color: ;
          border-bottom: 2px solid #46bd87;
        }
      }
    }
  }
}
</style>
