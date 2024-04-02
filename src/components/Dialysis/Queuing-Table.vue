<template>
  <v-data-table
    :headers="headers"
    :items="queueData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :loading="loading"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-container fluid>
          <v-row align-content="center">
            <v-col cols="9">
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Queuing-Table",
  props: ["queue_data"],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
  }),
  methods: {},
  computed: {
    headers() {
      return [
        {
          text: "DIALYSIS MACHINE",
          value: "dialysis_machine",
        },
        {
          text: "MORNING",
          value: "morning_name",
        },
        {
          text: "NOON",
          value: "noon_name",
        },
        {
          text: "AFTERNOON",
          value: "afternoon_name",
        },
      ];
    },
    queueData() {
      return this.queue_data
        ? this.queue_data.data.map((item) => ({
            dialysis_machine: item.dialysis_machine,
            morning_name: item.morning,
            afternoon_name: item.afternoon,
            noon_name: item.noon,
          }))
        : [];
    },
  },
  watch: {
    queue_data: {
      handler(value) {
        this.loading = true;
        if (!value.data.length) {
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

<style scoped></style>
