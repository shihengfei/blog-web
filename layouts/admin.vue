<template>
  <el-container>
    <el-aside :class="isCollapse && 'collapse'">
      <div class="logo">博客管理系统</div>
      <el-menu
        :default-active="routerPath"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <nuxt-link :to="item.link" v-for="(item, index) in navBar" :key="index">
          <el-menu-item :index="item.link">
            <span class="iconfont" :class="'icon-' + item.icon"></span>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </nuxt-link>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="switchCollapse"></i>
        <el-button class="sign-out" type="text" @click="signOut">退出</el-button>
      </el-header>
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      navBar: [
        {
          name: "首页",
          link: "/admin/main/home",
          icon: "home",
        },
        {
          name: "文章分类",
          link: "/admin/main/articleCategory",
          icon: "category",
        },
        {
          name: "文章列表",
          link: "/admin/main/articleList",
          icon: "list",
        },
        {
          name: "静态化部署",
          link: "/admin/main/staticBuild",
          icon: "build",
        },
      ],
    };
  },
  computed: {
    routerPath() {
      return this.$route.path;
    },
    isCollapse() {
      return this.$store.state["admin"].isCollapse;
    },
  },
  mounted() {
    console.log(this.routerPath);
  },
  methods: {
    switchCollapse() {
      this.$store.commit("admin/switchCollapse");
    },
    signOut() {
      this.$confirm("确认退出管理后台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/admin/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less">
.el-container {
  height: 100vh;
  background-color: #f8f9fa;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  font-size: 25px;
  border-bottom: 1px solid #f5f5f5;
  i {
    cursor: pointer;
  }
  .sign-out {
    float: right;
    line-height: 60px;
    padding: 0;
  }
}

.el-aside {
  background-color: #001529;
  color: #fff;
  height: 100vh;
  width: 150px !important;
  transition: width 0.5s;
  .el-menu {
    width: 150px !important;
    &.el-menu--collapse {
      width: 64px !important;
    }
  }
  &.collapse {
    width: 65px !important;
    .logo {
      font-size: 0;
    }
  }
  .logo {
    line-height: 60px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}

.el-main {
  color: #333;
  padding: 30px;
  margin: 30px;
  background: #fff;
  border-radius: 10px;
}
</style>
