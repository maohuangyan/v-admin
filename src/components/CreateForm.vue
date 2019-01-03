<template>
  <div class="card create-form">
    <b-form @submit.prevent="save">
      <b-row>
        <b-col v-for="(field,key) in fields" :key="field.label" :cols="field.cols">
          <b-form-group :label="field.label" :label-for="key" :description="field.description">
            <b-form-select v-model="model[key]" v-if="field.type == 'select'" :options="field.options" class="" />
            
            <b-form-input v-else-if="field.type =='number'" 
            v-model="model[key]" :id="key" type="number"></b-form-input>

            <div class="custom-file" v-else-if="field.type =='image'">
              <input type="file" @change="uploadConfig" class="custom-file-input" id="inputGroupFile01">
              <label class="custom-file-label" for="inputGroupFile01">选择文件</label>
            </div>

            <b-form-textarea :id="key" v-else-if="field.type == 'textarea'"
              v-model="model[key]"
              placeholder="请输入您的描述"
              :rows="3"
              :max-rows="6">
            </b-form-textarea>

            <b-form-input v-else :id="key" v-model="model[key]" type="text"></b-form-input>
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
      model: {},
      file: ''
    };
  },
  methods: {
    uploadConfig: function (e) {
      var that = this
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      this.$http.post('file', formData).then(function(res) {
        if(res.data.url){
          that.$snotify.success(res.data.msg);
          that.model.image = res.data.url
        }   
      })
    },
    save: function() {
      var that = this
      this.$http.post(`${this.$route.params.resource}`, this.model).then(function(res) {
        if(res.data){
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
    }
  },
  created: function() {
    this.fetch();
  }
};
</script>

