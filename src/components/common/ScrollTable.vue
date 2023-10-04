<template>
  <div class="virtual-data-table d-flex flex-column">
    <v-data-table
      ref="dataTable"
      id="virtual-scroll-table"
      fixed-header
      dense
      :headers="headers"
      :items="dessertsLimited"
      item-key="name"
      disable-pagination
      hide-default-footer
      show-select
      @item-selected="(item) => selectedItem('searched', item)"
      @toggle-select-all="(all) => selectedAll('searched', all)"
    >
      <!-- <template v-slot:tbody="{ items }">
        <tr :items="items" v-for="item in items" :key="item.name"></tr>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    desserts: Array.from({ length: 30 }).map((v, k) => ({
      name: `#${k}`,
      calories: 518,
      fat: 26.0,
      carbs: 65 - k,
      protein: 7,
      iron: "6%",
    })),
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    start: 10,
    timeout: null,
    rowHeight: 24,
    perPage: 25,
  }),
  mounted() {
    const wrapper = document.querySelector(".v-data-table__wrapper");
    wrapper.addEventListener("scroll", this.onScroll);
  },
  unmounted() {
    const wrapper = document.querySelector(".v-data-table__wrapper");
    wrapper.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    selectedItem(type, result) {
      const { item, value } = result;
      console.log(type, item, value);
    },
    selectedAll(type, result) {
      const { items, value } = result;
      console.log(type, items, value);
    },
    onScroll(e) {
      this.timeout && clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
        // 일정 한도 밑으로 내려오면 함수 실행
        if (isAtTheBottom) this.handleLoadMore();
      }, 20);
    },
    handleLoadMore() {
      console.log("hi");
      // this.$nextTick(() => {
      //   e.target.scrollTop = scrollTop;
      // });
    },
  },
  computed: {
    dessertsLimited() {
      return this.desserts.slice(this.start, this.perPage + this.start);
    },
  },
};
</script>
<style lang="scss" scoped>
.virtual-data-table {
  > div::v-deep > div {
    // height: 600px;

    height: 400px;
  }
}
</style>
