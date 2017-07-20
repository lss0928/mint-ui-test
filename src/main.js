// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import {} from './common/ajax';
import App from './App';
import routerConfig from './common/routerConfig';
import vueAsync from './common/vue-async';
Vue.options = Vue.util.mergeOptions(Vue.options, vueAsync);


// inject router into vue
Vue.use(VueRouter);

// import ui lib iview

// import iview from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iview);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import './common/icon.css';

/* eslint-disable no-new */
const router = new VueRouter({
    routes: routerConfig
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
