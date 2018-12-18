<template>
  <div class="sidebar">
    <div class="logo">{{site.name}}</div>
    <p>后台管理界面</p>
    <ul class="menu" v-if="site.menu">
      <li class="nav-item" v-for="item in site.menu" :key="item.name">
        <router-link @click.native="fn" :to="item.url" class="nav-link">
          <i :class="item.icon"></i> {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      site: {}
    };
  },
  methods: {
    fn: function (e) {
      // console.log(e.target.innerText)
    },
    fetch: function() {
      var that = this
      this.$http.get("site").then(function(res) {
        that.site = res.data;
      });
    }
  },
  created: function() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>
