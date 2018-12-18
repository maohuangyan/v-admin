<template>
  <div class="card form-field">
    <div class="card-header flex-jcsb">
      <h1 class="bold">{{$route.params.resource}}</h1>
      <div class="top-btn">
        <b-button class="add" :to="`${$route.params.resource}/create`">
          <i class="icon icon-plus"></i> 新增
        </b-button>
        <b-button class="refresh">
          <i class="icon icon-reload"></i> 刷新
        </b-button>
      </div>
    </div>
    <div class="table">
      <b-table show-empty :items="items" :fields="fields">
        <template slot="_id" slot-scope="row">{{row.item._id.slice(-4)}}</template>
        <template v-for="v in this.with" :slot="v" slot-scope="row">
          {{_.get(row.item[`${v}`],'name')}}
        </template>
        <template slot="_actions" slot-scope="row">
          <b-button size="sm" variant="success">
            <i class="icon icon-eye"></i> 查看
          </b-button>
          <b-button size="sm" variant="primary">
            <i class="icon icon-note"></i> 编辑
          </b-button>
          <b-button size="sm" variant="secondary">
            <i class="icon icon-trash"></i> 删除
          </b-button>
        </template>
      </b-table>

      <b-pagination
        @input="selectPage"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
      />

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
    with: function (){
      return _.filter(
        _.map(this.fields, (v,k) => {
         return v.ref && v.ref.split(".").slice(0, -1).join(".")
      })
      )
    }
  },
  methods: {
    selectPage: function(e) {
      var that = this
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
        });
    },
    fetchGrid: function () {
      console.log(this.$route.params.name)
      var that = this;
      this.$http.get(`${this.$route.params.resource}/grid`).then(function(res) {
        that.fields = res.data.fields;
        that.fetch()
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
          that.totalRows = res.data.total;
        });
    }
  },
  created: function() {
    this.fetchGrid();
  }
};
</script>
