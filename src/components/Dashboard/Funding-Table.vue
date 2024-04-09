<template>
  <v-col cols="12">
    <v-card class="pa-6" rounded="lg">
      <div class="d-flex justify-space-between align-center">
        <div class="card-title">Funding</div>
        <div
          class="card-icon blue lighten-5 d-flex justify-center align-center"
        >
          <v-icon size="28" color="primary">mdi-cash-multiple</v-icon>
        </div>
      </div>
      <template>
        <div>
          <v-data-table
            :headers="headers"
            :items="data.tableContent"
            item-key="name"
            class="elevation-0"
            :search="search"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                prepend-icon="mdi-magnify"
              >
              </v-text-field>
            </template>
          </v-data-table>
        </div>
      </template>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Funding-Table",
  props: ["data"],
  data: () => ({
    search: "",
    loading: true,
  }),
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Total Contribution",
          value: "total_amount",
        },
        {
          text: "Date",
          value: "date",
        },
        {
          text: "Remaining Amount",
          value: "rem_amount",
        },
      ];
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.loading = true;
        if (value.length === 0) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
</style>
