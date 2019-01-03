<template>
  <div class="card create-form">
    <b-form @submit.prevent="save">
      <b-row>
        <b-col v-for="(field,key) in fields" :key="field.label" :cols="field.cols">
          <b-form-group :label="field.label" :label-for="key" :description="field.description">
            <b-form-select v-if="field.type == 'select'" 
            v-model="model[key]" :options="field.options" class="" />
            
            <b-form-input v-else-if="field.type =='number'" 
            v-model="model[key]" :id="key" type="number"></b-form-input>

            <b-form-textarea :id="key" v-else-if="field.type == 'textarea'"
              v-model="model[key]"
              placeholder="请输入您的描述"
              :rows="field.row">
            </b-form-textarea>

            <b-form-input v-else v-model="model[key]" :id="key" type="text"></b-form-input>
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
      fields: {},
      model: {}
    };
  },
  methods: {
    save: function() {
      var that = this
      this.$http.post(`${this.$route.params.resource}/${this.$route.params.id}`, this.model).then(function(res) {
        if(res.data.ok == 1){
          that.fetch();
          that.$snotify.success('保存成功');
          that.$router.go(-1);
        }
      })
    },
    fetch: function() {
      var that = this;
      this.$http.get(`${this.$route.params.resource}/form`).then(function(res) {
        that.fields = res.data.fields;
      });
      this.$http.get(`${this.$route.params.resource}/${this.$route.params.id}`).then(function(res) {
        that.model = res.data;
      });
    }
  },
  created: function() {
    this.fetch();
  }
};
</script>

