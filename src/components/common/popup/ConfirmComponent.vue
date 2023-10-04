<template>
  <div class="modal" v-if="dialog">
    <v-card class="modal-content">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirm"> 예 </v-btn>
        <v-btn color="primary" text @click="cancel" ref="cancelBtn">
          아니오
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    value: Boolean, // v-model을 사용하기 위해 value 프롭 추가
  },
  data() {
    return {
      dialog: this.value, // v-dialog를 열고 닫기 위한 데이터 추가
    };
  },
  watch: {
    value(newValue) {
      this.dialog = newValue; // value 프롭이 변경되면 dialog 데이터도 변경
    },
    dialog(newDialogState) {
      this.$emit("input", newDialogState); // dialog 상태 변경 시 value 프롭에도 반영
    },
  },
  methods: {
    confirm() {
      this.dialog = false; // 모달을 닫음
      this.$emit("confirm");
    },
    cancel() {
      this.dialog = false; // 모달을 닫음
      this.$emit("cancel");
    },
  },
};
</script>
<style scoped>
/* 모달 스타일 */
.modal {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  padding: 10px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px; /* 모달 최대 너비 */
  text-align: center; /* 텍스트 가운데 정렬 */
  position: relative;
}
.modal-content p {
  white-space: pre-line;
}
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}

.close:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
