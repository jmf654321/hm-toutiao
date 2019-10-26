<template>
  <el-container class="home">
  <el-aside :width="isopen?'200px':'64px'">
      <div class="side_logo" :class="{smallLogo:!isopen}"></div>
      <el-menu
      :collapse-transition="false"
      :collapse="!isopen"
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      style="border-right:none;">
      <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
         <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
         <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header class="header">
        <span class="el-icon-s-fold icon"  @click="change"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <div class="header-right">
            <img src="../../assets/avatar.jpg" alt="">
            <el-dropdown>
              <span class="el-dropdown-link">
                用户名称<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                   <i class="el-icon-setting"></i>
                    个人设置
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-unlock"></i>
                    退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

        </div>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      isopen: true
    }
  },
  methods: {
    change () {
      this.isopen = !this.isopen
    }
  }
}
</script>

<style scoped lang='less'>
.home{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .el-aside{
        height: 100%;
        background-color: #002033;
        .side_logo{
            height: 60px;
            background: #002244 url("../../assets/logo_admin.png") no-repeat center / 120px auto;
        }
        .smallLogo{
            background-image: url("../../assets/logo_admin_01.png");
            background-size: 30px auto;
        }
    }

    .header{
        height: 60px;
        line-height: 60px;
        width: 100%;
        border-bottom: 1px solid #ddd;
        .icon{
            font-size: 30px;
            vertical-align: middle;
        }
        .text{
             margin-left: 10px;
        }
        .header-right{
            float: right;
            img{
                width: 30px;
                vertical-align: middle;
                margin-right: 5px;
            }
            .el-dropdown-link{
                font-weight: bold;
            }
        }
    }
}

</style>
