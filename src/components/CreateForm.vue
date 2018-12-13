<template>
  <div class="card create-form">
    <b-form @submit.prevent="save">
      <b-row>
        <b-col v-for="(field,key) in fields" :key="field.label" :cols="field.cols">
          <b-form-group :label="field.label" :label-for="key" :description="field.description">
            <b-form-select v-if="field.type == 'select'" :options="field.options" class="" />
            
            <b-form-input v-else-if="field.type =='number'" :id="key" type="number"></b-form-input>
            <b-form-input v-else :id="key" type="text"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="success">保存</b-button>
      <b-button type="button" variant="secondary" @click="$router.go(-1)">返回</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {}
    };
  },
  methods: {
    save: function() {},
    fetch: function() {
      var that = this;
      this.$http.get(`${this.$route.params.resource}/form`).then(function(res) {
        that.fields = res.data.fields;
      });
    }
  },
  created: function() {
    this.fetch();
  }
};
</script>

