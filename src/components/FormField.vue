<template>
  <div class="card form-field">
    <div class="card-header flex-jcsb">
      <h1 class="bold">{{$route.params.resource}}</h1>
      <div class="top-btn">
        <b-button class="add" :to="`${$route.params.resource}/create`">
          <i class="icon icon-plus"></i> 新增
        </b-button>
        <b-button class="refresh" @click="reload">
          <i class="icon icon-reload"></i> 刷新
        </b-button>
      </div>
    </div>
    <div class="table">
      <b-table show-empty :items="items" :fields="fields">
        <template slot="_id" slot-scope="row">{{row.item._id.slice(-4)}}</template>
        <template
          v-for="(v, k) in this.with"
          :slot="v"
          slot-scope="row"
        >{{_.get(row.item[`${v}`], withName[k])}}</template>
        <template
          slot="created_at"
          slot-scope="row"
        >{{dayjs(row.item.created_at).format('YYYY-MM-DD HH:mm')}}</template>
        <template slot="image" slot-scope="row">
          <div class="field-img">
            <b-img :src="row.item.image" fluid alt="Responsive image" />
          </div>
        </template>
        <template slot="_actions" slot-scope="row">
          <b-button
            size="sm"
            variant="success"
            :to="`${$route.params.resource}/${row.item._id}/view`"
          >
            <i class="icon icon-eye"></i> 查看
          </b-button>
          <b-button
            size="sm"
            variant="primary"
            :to="`${$route.params.resource}/${row.item._id}/edit`"
          >
            <i class="icon icon-note"></i> 编辑
          </b-button>
          <b-button size="sm" variant="secondary" @click="remove(row.item._id)">
            <i class="icon icon-trash"></i> 删除
          </b-button>
        </template>
      </b-table>

      <div class="flex-jcfs">
        <b-pagination
          @input="selectPage"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
        />
        <p class="mar-l-1">共{{total}}条数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormField",
  data() {
    return {
      fields: {},
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 10,
      totalRows: 10
    };
  },
  watch: {
    $route() {
      this.fetchGrid();
    }
  },
  computed: {
    with: function() {
      return _.filter(
        _.map(this.fields, (v, k) => {
          return (
            v.ref &&
            v.ref
              .split(".")
              .slice(0, -1)
              .join(".")
          );
        })
      );
    },
    withName: function() {
      return _.filter(
        _.map(this.fields, (v, k) => {
          return (
            v.ref &&
            v.ref
              .split(".")
              .slice(-1)
              .join(".")
          );
        })
      );
    }
  },
  methods: {
    reload: function() {
      window.location.reload();
    },
    remove: function(id) {
      var that = this;
      var confirm = window.confirm("您确定要删除吗？");
      if (confirm) {
        this.$http
          .delete(`${this.$route.params.resource}/${id}`)
          .then(function(res) {
            if (res.data.ok == 1) {
              that.$snotify.warning("删除成功");
              that.fetch();
            }
          });
      }
    },
    selectPage: function(e) {
      var that = this;
      this.$http
        .get(this.$route.params.resource, {
          params: {
            query: {
              sort: { _id: -1 },
              with: this.with,
              page: e,
              perPage: this.perPage
            }
          }
        })
        .then(function(res) {
          that.items = res.data.data;
          that.total = res.data.total;
        });
    },
    fetchGrid: function() {
      var that = this;
      this.$http.get(`${this.$route.params.resource}/grid`).then(function(res) {
        that.fields = res.data.fields;
        that.fetch();
      });
    },
    fetch: function() {
      var that = this;
      this.$http
        .get(this.$route.params.resource, {
          params: {
            query: {
              sort: { _id: -1 },
              with: this.with
            }
          }
        })
        .then(function(res) {
          that.items = res.data.data;
          that.total = res.data.total;
        });
    }
  },
  created: function() {
    this.fetchGrid();
  }
};
</script>
