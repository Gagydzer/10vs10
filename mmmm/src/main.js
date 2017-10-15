// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
require('./vue2-scrollbar.css')
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: h => h(App)
})


