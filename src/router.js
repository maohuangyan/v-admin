import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Layout from "./views/Layout.vue";
import Home from "./views/Home.vue"
import FormField from "./components/FormField.vue"
import CreateForm from "./components/CreateForm.vue"
import EditForm from "./components/EditForm.vue"
import ViewForm from "./components/ViewForm.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/rest/:resource',
          name: 'index',
          component: FormField,
        },
        {
          path: '/rest/:resource/:id/edit',
          name: 'update',
          component: EditForm,
        },
        {
          path: '/rest/:resource/:id/view',
          name: 'show',
          component: ViewForm,
        },
        {
          path: '/rest/:resource/create',
          name: 'store',
          component: CreateForm,
        }
      ]
    }
  ]
});
