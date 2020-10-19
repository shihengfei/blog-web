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
        <!-- 搜索区域 end -->
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
      </div>
    </div>
    <!-- pc端顶部end -->
    <!-- mobile顶部 start -->
    <div class="mobile-header">
      <div class="mobile-header-main">
        <div class="handle-wrap">
          <span
            class="iconfont"
            :class="mobileNavBarShow ? 'icon-close' : 'icon-open'"
            @click="mobileNavBarShow = !mobileNavBarShow"
          ></span>
        </div>
        <div class="peeler-wrap">
          <span class="iconfont" :class="'icon-' + blog.skin.icon" @click="switchSkin" />
        </div>
        <!-- 搜索区域 start -->
        <div class="search-container">
          <span class="iconfont icon-search search-icon" />
          <input type="text" class="search-input" />
        </div>
        <!-- 搜索区域 end -->
      </div>
    </div>
    <!-- mobile顶部 end -->
    <!-- mobile 左侧抽屉 start -->
    <div class="sidebar-mark" @click="mobileNavBarShow = false" v-show="mobileNavBarShow"></div>
    <aside class="sidebar" :class="mobileNavBarShow && 'sidebar-open'">
      <div class="sidebar-wrap">
        <div class="sidebar-item" v-for="(item, index) in navBar" :key="index">
          <nuxt-link
            :to="item.link"
            class="sidebar-item__link"
            active-class="sidebar-item__link__active"
            :exact="item.exact"
          >{{ item.name }}</nuxt-link>
        </div>
      </div>
    </aside>
    <!-- mobile 左侧抽屉 end -->
  </div>
</template>

<script>
export default {
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
          name: "标签",
          link: "/category",
          exact: false,
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
      mobileNavBarShow: false,
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
    console.log(this.$store.state["blog"], this.$route.path);
    if (this.$route.path === "/") {
      window.onscroll = () => {
        this.scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      };
    }
  },
  methods: {
    // 换肤
    switchSkin() {
      this.$store.commit("blog/switchSkin");
    },
  },
};
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
  z-index: 99;
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
        padding: 0 0.5rem;
        border-radius: 0.3rem;
        &:hover {
          background: rgba(242, 242, 242, 0.5);
        }
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
      top: 0.5rem;
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
.mobile-header {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 99;
  &-main {
    padding: 0.7rem 0.5rem 0.7rem 1.5rem;
    display: flex;
    transition: background 0.5s;
    .handle-wrap {
      line-height: 2rem;
      .iconfont {
        font-size: 2rem;
        cursor: pointer;
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
          padding: 0 0.5rem;
          border-radius: 0.3rem;
          &:hover {
            background: rgba(242, 242, 242, 0.5);
          }
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
        top: 0.5rem;
        left: 0.5rem;
        z-index: 0;
      }
      &-input {
        width: 1rem;
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
        transition: border-color 0.5s, width 0.5s;
        z-index: 1;

        &:focus {
          border-color: #3eaf7c;
          width: 8rem;
        }
      }
    }
  }
}
.sidebar-mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
}
.sidebar {
  transform: translateX(-100%);
  font-size: 16px;
  background-color: #fff;
  width: 16.4rem;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 0;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  transition: transform 0.2s ease, background 0.5s;
  padding-top: 3.6rem;
  &-open {
    transform: translateX(0);
  }
  &-wrap {
    border-bottom: 1px solid #eaecef;
    padding: 0.5rem 0 0.75rem;
  }
  &-item {
    line-height: 1.25rem;
    font-size: 1.1em;
    padding: 0.5rem 0 0.5rem 1.5rem;
    &__link {
      font-weight: 600;
      color: #222222;
      &__active {
        color: #3eaf7c;
      }
    }
  }
}
</style>
