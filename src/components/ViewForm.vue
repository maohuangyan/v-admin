<template>
  <div class="card create-form">
    <ul class="view-form">
      <li v-for="(field,key, index) in fields" :key="field.label">
        <div class="view-label flex-jcfs" v-if="field.ref">
          <label>{{field.label}} :</label>
          <p>{{_.get(model[key], withName[index])}}</p>
        </div>
        <div class="view-label flex-jcfs" v-else-if="key == 'created_at'">
          <label>{{field.label}} :</label>
          <p>{{dayjs(model[key]).format('YYYY-MM-DD HH:mm')}}</p>
        </div>
        <div class="view-label flex-jcfs" v-else-if="key == 'image'">
          <label>{{field.label}} :</label>
          <b-img class="field-img" :src="model[key]" fluid alt="Responsive image" />
        </div>
        <div class="view-label flex-jcfs" v-else>
          <label>{{field.label}} :</label>
          <p>{{model[key]}}</p>
        </div>
      </li>
    </ul>
    <div class="view-btn">
      <b-button type="button" variant="secondary" @click="$router.go(-1)">返回</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {},
      model: {}
    };
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
      return _.map(this.fields, (v, k) => {
        return (
          v.ref &&
          v.ref
            .split(".")
            .slice(-1)
            .join(".")
        );
      });
    }
  },
  methods: {
    fetchView: function() {
      var that = this;
      this.$http.get(`${this.$route.params.resource}/view`).then(function(res) {
        that.fields = res.data.fields;
        that.fetch();
      });
    },
    fetch: function() {
      var that = this;
      this.$http
        .get(`${this.$route.params.resource}/${this.$route.params.id}/check`, {
          params: {
            query: {
              with: this.with
            }
          }
        })
        .then(function(res) {
          that.model = res.data;
        });
    }
  },
  created: function() {
    this.fetchView();
  }
};
</script>

