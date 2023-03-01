<template>
  <div class="CreatorLibrary">
    <section class="section">
      <div class="left">
        <header class="filter-header flex-row">
          <div class="filter-item flex-row">
            <a-select placeholder="请选择账号" style="width:200px;" v-model:value="dyUserId">
              <a-select-option :key="item.id" :value="item.account" v-for="item in userList">{{ item.account
              }}</a-select-option>
            </a-select>
          </div>
          <div class="filter-item flex-row">
            <a-input allowClear placeholder="请输入视频标题" v-model:value="videoTitle" style="width: 200px" />
          </div>
          <div class="filter-item flex-row align-right">
            <a-button type="primary" class="btn-dv" @click="QueryCommon">查询</a-button>
            <a-button @click="rest" class="btn-dv">重置</a-button>
          </div>
        </header>
        <div class="bg">
          <div class="flex-row flex-between">
            <div class="flex">
              <h2>总计 {{ pagination.total }}</h2>
              <div class="flex">
                <span>每页显示:</span>
                <a-dropdown :trigger="['click']">
                  <template #overlay>
                    <a-menu @click="handleMenuClick">
                      <a-menu-item key="20">20</a-menu-item>
                      <a-menu-item key="50">50</a-menu-item>
                      <a-menu-item key="100">100</a-menu-item>
                      <a-menu-item key="300">300</a-menu-item>
                    </a-menu>
                  </template>

                  <a-button style="margin-left: 8px">{{ num }}
                    <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </div>
              <div class="Publicdv">

              </div>
            </div>
          </div>
          <a-table :columns="columns" :data-source="clientList" :pagination="pagination" @change="change" class="tableDV"
            rowKey="id" :loading="tableLoading">
            <template #bodyCell="{ column }">
              <template v-if="column.key === 'cover_image_url'">
                <a-avatar class="cover" :src="column.cover_image_url" :size="64" shape="square"
                  @click="openWindow(column.embed_link)"></a-avatar>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 搜索条件
const dyUserId = ref(undefined);
const videoTitle = ref(undefined);
const userList = reactive<UserList[]>([]);
function QueryCommon() {
  pagination.current = 2;
  getList();
}

function rest() {
  videoTitle.value = undefined;
  dyUserId.value = undefined;
  pagination = {
    current: 1,
    pageSize: 20,
    total: 0,
  };
  getList();
}
// 表格
const tableLoading = ref(false);
const columns = reactive([
  {
    title: '视频标题',
    dataIndex: 'title',
    scopedSlots: { customRender: 'videoTitle' },
    key: 'title',
  },
  {
    title: '视频封面',
    dataIndex: 'cover_image_url',
    scopedSlots: { customRender: 'cover_image_url' },
    key: 'cover_image_url',
  },
  {
    title: 'tiktok账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '点赞数',
    dataIndex: 'like_count',
    key: 'like_count',
    // sorter: true,
  },
  {
    title: '观看数',
    dataIndex: 'view_count',
    key: 'view_count',
    // sorter: true,
  },
  {
    title: '分享数',
    dataIndex: 'share_count',
    key: 'share_count',
    // sorter: true,
  },
  {
    title: '评论数',
    dataIndex: 'comment_count',
    key: 'comment_count',
    // sorter: true,
  },
  {
    title: '发布时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
]);
const clientList = reactive([{ title: 1 }]);
const num = ref<number>(50);
let pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});
function change() {}
function handleMenuClick(val: any) {
  num.value = Number(val.key);
}
function openWindow(url: string) {
  window.open(url);
}
function getList() {
  clientList.push({
    title: clientList[clientList.length - 1].title + 1,
  });
  pagination.total = clientList.length;
}
onMounted(() => {
  getList();
  userList.push({
    account: '张飞',
    id: 1,
  });
});
</script>

<style lang="less" scoped>
.m-10 {
  margin-bottom: 20px;
}

.m-l-30 {
  margin-left: 48px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.txt-rt {
  text-align: right;
}

.bg {
  background: #fff;
}

.img-big {
  width: 100%;
  padding: 20px;
}

.flex-between {
  justify-content: space-between;
  align-content: space-between;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;

  h2 {
    margin-right: 11px;
    margin-bottom: 0;
  }
}

.flex {
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }

  div {
    margin-left: 10px;
  }

  .sp-1 {
    color: #000;
    height: 35px;
    line-height: 35px;
    width: 100px;
    text-align: right;
  }

  .sp-2 {
    color: #666;
    height: 35px;
    line-height: 35px;
  }

  .sp-22 {
    width: 300px;
    color: #000;
  }
}

.btn-dv {
  margin-right: 15px;
}

.flex-row {
  display: flex;
  align-items: center;
}

.flex-row.align-right {
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.flex-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.filter-header {
  position: relative;
  padding: 16px 84px 0 24px;
  background: #fff;

  .reset-btn {
    position: absolute;
    right: 24px;
    bottom: 16px;
  }

  .filter-item {
    margin-right: 32px;
    margin-bottom: 16px;

    label {
      color: rgba(0, 0, 0, 0.65);
      white-space: nowrap;
    }
  }
}

.tableDV {
  background: #fff;
}

.img-a {
  display: flex;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 3px;
    cursor: zoom-in;
  }

  .nameDv {
    margin-left: 10px;
    width: 180px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //用省略号显示
    white-space: nowrap; //不换行
  }
}

.section {
  display: flex;

  .left {
    // width: 75%;
    // margin-right: 20px;
    width: 100%;
  }

  .right {
    flex: 1;
    height: calc(~'100vh -  155px');
    overflow: auto;
  }
}

.cover {
  cursor: pointer;
}
</style>
