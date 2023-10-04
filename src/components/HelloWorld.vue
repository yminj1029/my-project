<template>
  <v-container>
    <v-btn @click="openConfirm">hi, i need confirm</v-btn>
    <v-btn @click="openAlert">hi, i need alert</v-btn>
    <scroll-table></scroll-table>
  </v-container>
</template>

<script>
import ScrollTable from "./common/ScrollTable.vue";

export default {
  components: { ScrollTable },
  name: "HelloWorld",

  data: () => ({}),
  methods: {
    openConfirm() {
      // alert("hi");
      // console.log("hi");
      const a = "등록";
      const b = `입력한 항목을 최종 등록하시겠습니까?\n(발급일과 종료일을 꼭 확인해주세요.)`;
      this.$confirm(a, b)
        .then((result) => {
          if (result) {
            // 확인 버튼을 클릭한 경우
            console.log("확인", result);
          } else {
            // 취소 버튼을 클릭한 경우
            console.log("취소");
          }
        })
        .catch((error) => {
          // 모달을 닫은 경우
          console.log("모달 닫힘", error);
        });
    },
    openAlert() {
      this.$alert("제목", "메시지")
        .then((result) => {
          if (result) {
            // 확인 버튼을 클릭한 경우
            console.log("확인", result);
          }
        })
        .catch((error) => {
          // 모달을 닫은 경우
          console.log("모달 닫힘", error);
        });
    },
  },
};
</script>
