<template>
  <div>
    <!-- 头部 -->
    <header class="head">
      <div class="head-left">
        <!-- <img src="/imgs/logo.png" /> -->
        <span>Kolify</span>
        <span class="corp-name">{{ currentUser.name }}</span>
      </div>
      <div class="head-right">
        <select-lang class="prefixCls" />
      </div>
    </header>
    <section class="section">
      <!-- 侧边导航栏 -->
      <aside class="section-aside">
        <a-input class="search-input" v-model="searchName">
        </a-input>
        <ul class="list-wrap" v-show="allMenus.length > 0">
          <li v-for="(item, index) in allMenus" :key="index" class="menu-list" v-show="item.name !== 'Home'">
            <div class="icon-title">
              <div class="icon-wrap">
                <!-- {{ item.meta.icon }} -->
              </div>
              <span class="text">{{ item.meta.title }}</span>
            </div>
            <ul class="children-router">
              <li
                v-for="(item, index) in item.children"
                :key="index"
                :class="{ checked: selectName === item.name }"
                class="search-children-menu"
                @click="changeRoute(item, index)"
                v-show="!item.hidden"
              >
              <a-tooltip :title="item.meta.title">
                <span class="link">{{ item.meta.title }}</span>
              </a-tooltip>
              </li>
            </ul>
          </li>
        </ul>
        <div v-show="allMenus.length <= 0" class="empty">
          <a-empty />
        </div>
      </aside>
      <!-- 路由部分 -->
      <div class="blank-right flex1">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { userStore } from '@/stores/user'
export default {
  name: 'FixedLayout',
  components: {},
  setup() {
    const user = userStore()
    return {
      info: user.info,
      mainMenu: user.accessedRouters
    }
  },
  data() {
    return {
      menus: [],
      searchName: '',
      selectName: 'Home',
      currentUser: {
        avatar: '',
        name: '',
        corpName: '',
      },
    }
  },
  computed: {
    allMenus() {
      const filterMenus = this.menus
        .map((item) => {
          return {
            ...item,
            meta: {
              ...item.meta,
              icon: `<${item.meta.icon} />`
            },
            children: item.children?.filter((item) => {
              return item.meta.title.indexOf(this.searchName) != -1
            }),
          }
        })
      console.log(222, this.menus)
      return filterMenus
    },
    routerName() {
      return this.$route.name
    },
  },
  created() {
    const routes = this.mainMenu.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    this.currentUser = {
      name: this.info.name || '为获取到用户名',
      avatar: this.$store?.state?.user?.avatar,
      corpName: this.$store?.state?.user?.corp?.name || '',
    }
    this.defaultSelectMenu(this.$route.meta?.permission?.[0])
  },
  watch: {
    routerName() {
      this.defaultSelectMenu(this.$route.meta?.permission?.[0])
    },
  },
  methods: {
    goHome() {
      this.selectName = 'Home'
      this.$router.push('/home')
    },
    // 默认选中
    defaultSelectMenu(name) {
      this.menus.find((item, index) => {
        const selectMenus = item.children?.find((children) => {
          return children.name === name
        })
        if (selectMenus) {
          this.selectName = selectMenus.name
          this.selectMenu = item.children
          this.selectMeta = item.meta
          this.selectKey = [selectMenus.name]
          return item
        }
      })
    },
    // 改变路由
    changeRoute(data, index) {
      this.selectName = data.name
      this.selectMenu = []
      this.$router.push(data.path)
      this.defaultSelectMenu(data.name)
    },
    // 退出登录
    handleLogout(e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel() { },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  background: #001529;
  padding: 0 20px;
  height: 60px;
  align-items: center;
  color: #fff;
  .head-left {
    font-size: 22px;
    padding: 0 14px;
    white-space: nowrap;
    img {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
    .corp-name {
      margin-left: 20px;
      font-size: 15px;
    }
  }
}
.antd-pro-global-header-index-avatar {
  margin-right: 15px;
}
.section {
  display: flex;
  height: calc(~"100vh - 60px");
  background: #f0f2f5;
  overflow: hidden;
  .section-aside {
    background: #001529;
    padding: 0 10px;
    width: 247px;
    position: relative;
    color: rgba(299, 299, 299, 0.9);
    .search-input {
      /deep/input {
        background: #001529;
        border: none;
        border-bottom: 1px solid rgba(299, 299, 299, 0.3);
        color: rgba(299, 299, 299, 0.9);
      }
      /deep/i {
        color: rgba(299, 299, 299, 0.9);
      }
    }
    .list-wrap {
      height: calc(~"100vh - 92px");
      overflow-y: auto;
      padding: 0;
      padding-bottom: 20px;
      li {
        line-height: 40px;
      }
      .menu-list {
        border-bottom: 1px dashed rgba(299, 299, 299, 0.3);
        padding-left: 20px;
        &.home {
          cursor: pointer;
          &:hover {
            background-color: #ff3e1e;
            color: #fff;
          }
          &.checked {
            background-color: #ff3e1e;
            color: #fff;
          }
        }
        .icon-title {
          position: relative;
          .icon-wrap {
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            .icon-chilren {
              width: 16px;
              height: 16px;
              position: relative;
              top: 3px;
            }
          }
        }
        .text {
          padding-left: 10px;
        }
        .children-router {
          color: rgba(299, 299, 299, 0.6);
          display: flex;
          flex-wrap: wrap;
          cursor: pointer;
          .search-children-menu {
            width: 50%;
            padding-left: 10px;
            &:hover {
              color: #ff3e1e;
            }
            &.checked {
              color: #ff3e1e;
            }
          }
        }
      }
    }
    .empty {
      padding-top: 160px;
    }
  }
}
.blank-right {
  overflow-y: auto;
  background-color: #f5f5f5;
}
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 0px;
}
.head-right {
  display: flex;
  align-items: center;
  .ant-pro-account-avatar {
    cursor: pointer;
    margin-right: 8px;
  }
  .prefixCls {
    display: inline-block;
  }
}
.link {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: block;
  text-overflow: ellipsis;
}
ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
