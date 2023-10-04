import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import ModalPlugin from "./plugins/modal.js"; // modal.js에서 정의한 플러그인 import

Vue.config.productionTip = false;
Vue.use(ModalPlugin); // 플러그인을 전역으로 등록
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
