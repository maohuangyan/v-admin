<template>
  <div class="card form-field">
    <div class="card-header flex-jcsb">
      <h1 class="bold">{{$route.params.resource}}</h1>
      <div class="top-btn">
        <b-button class="add"><i class="icon icon-plus"></i> 新增</b-button>
        <b-button class="refresh"><i class="icon icon-reload"></i> 刷新</b-button>
      </div>
    </div>
    <div class="table">
      <b-table show-empty 
      :items="items" :fields="fields">
        <template slot="_id" slot-scope="row">
          {{row.item._id.slice(-4)}}
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
    
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination @input="oninput" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>
      {{currentPage}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "FormField",
  data(){
    return {
      fields: {},
      items: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 50,
    }
  },
  methods: {
    oninput: function (e) {
      console.log(e)
    },
    fetch: function () {
      var that = this
      this.$http.get(`${this.$route.params.resource}/grid`).then(function(res) {
        that.fields = res.data.fields
      })
      this.$http.get(this.$route.params.resource, {
        params:{
          query:{
            sort:{_id:-1}
          }
        }
      }).then(function(res){
        that.items = res.data.data
        // that.totalRows = res.data.data.length
      })
    }
  },
  created: function () {
    this.fetch()
  }
};
</script>
