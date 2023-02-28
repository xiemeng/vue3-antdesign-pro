<template>
  <div class="CreatorLibrary">
    <section class="section">
      <div class="left">
        <header class="filter-header flex-row">
          <div class="filter-item flex-row">
            <a-select placeholder="请选择账号" style="width:200px;" v-model="dyUserId">
              <a-select-option :key="item.id" :value="item.account" v-for="item in userList">{{ item.account  }}</a-select-option>
            </a-select>
          </div>
          <div class="filter-item flex-row">
            <a-input allowClear placeholder="请输入视频标题" v-model="videoTitle" style="width: 200px" />
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
          <a-table :columns="columns" :data-source="clientList" :pagination="pagination" @change="change" class="tableDV" :rowKey="(record,index)=>{return index}" :loading="tableLoading">
            <template #bodyCell="{ column }">
              <template v-if="column.key === 'cover_image_url'">
                <a-avatar class="cover" :src="column.cover_image_url" :size="64" shape="square" @click="openWindow(column.embed_link)"></a-avatar>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
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
      ],
      num: 20,
      videoTitle: undefined,
      isDefault: true,
      isSearch: false,
      isDetails: false,
      tableLoading: false,
      spinning: false,
      clientList: [{ cover_image_url: '1243', title: 1234 }],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      userList: [],
      dyUserId: undefined,
    };
  },
  created() { },
  methods: {
    init() {
      const params = {
        limit: 200,
        page: 1,
      };
      info_list(params)
        .then(res => {
          if (res?.data) {
            this.userList = res.data.data;
            console.log(this.userList);
          }
        })
        .catch(error => {
          this.$message.error(error || '');
        });
    },
    openWindow(url) {
      window.open(url);
    },
    PublicBtn(type, id) {
      let idlist = null;
      if (type == 'Batch') {
        idlist = this.selectedRowKeys.join(',');
      } else {
        idlist = id;
      }
      this.sureDelete(idlist);
    },
    toImgBig(img) {
      this.imgBigBox = true;
      this.imgBig = img;
    },
    sureDelete(idlist) {
      const _this = this;
      this.$confirm({
        title: '提示',
        icon: '',
        content: '你确定要导入到产品列表吗?',
        onOk() {
          _this.toDelete(idlist);
        },
      });
    },
    toDelete(idlist) {
      const parms = {
        id: idlist,
      };
      unibuy_import_product(parms)
        .then(res => {
          if (res?.data) {
            this.$message.success('导入成功');
            this.selectedRows = [];
            this.selectedRowKeys = [];
            this.pagination.current = 1;
            this.getList();
          }
        })
        .catch(error => {
          this.$message.error(error || '');
        });
    },
    handleMenuClick(val) {
      this.num = Number(val.key);
      this.pagination.pageSize = this.num;
      this.pagination.current = 1;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      const params = {
        limit: this.pagination.pageSize,
        page: this.pagination.current,
        title: this.videoTitle,
        account: this.dyUserId,
      };
      tkVideos(params)
        .then(res => {
          if (res?.data) {
            this.pagination.total = res.data.total;
            this.clientList = this.disposeClientList(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error(error || '');
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 处理表格数据
    disposeClientList(list) {
      return list.map((item, index) => {
        return Object.assign({ operation: item }, item);
      });
    },
    // 切换分页
    change({ current }, filters, sorter) {
      console.log(sorter);
      this.pagination.current = current;
      this.getList();
    },
    goDetail(obj) {
      this.deteailInfo = obj;
      this.boxShow = true;
    },
    QueryCommon() {
      this.pagination.current = 1;
      this.getList();
    },
    rest() {
      this.videoTitle = undefined;
      this.type = undefined;
      this.dyUserId = undefined;
      this.pagination.current = 1;
      this.getList();
    },
  },
};
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
