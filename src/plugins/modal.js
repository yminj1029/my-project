import Vue from "vue";
import ConfirmComponent from "@/components/common/popup/ConfirmComponent.vue";
import AlertComponent from "@/components/common/popup/AlertComponent.vue";

// 공통 함수로 모달 생성과 관련된 로직을 분리
function createModal(Component, propsData) {
  return new Promise((resolve, reject) => {
    const modalContainer = document.createElement("div");
    document.body.appendChild(modalContainer);
    console.log(propsData.message);
    const vm = new Vue({
      render: (h) =>
        h(Component, {
          props: {
            ...propsData,
            value: true,
          },
          on: {
            confirm: () => {
              resolve(true);
              closeModal();
            },
            cancel: () => {
              reject(false);
              closeModal();
            },
          },
        }),
    });

    vm.$mount();
    modalContainer.appendChild(vm.$el);

    const closeModal = () => {
      vm.$destroy();
      modalContainer.remove();
    };
  });
}

export const confirm = function (title, message) {
  return createModal(ConfirmComponent, { title, message });
};

export const alert = function (title, message) {
  return createModal(AlertComponent, { title, message });
};

export default {
  install(Vue) {
    Vue.prototype.$confirm = confirm;
    Vue.prototype.$alert = alert;
  },
};
