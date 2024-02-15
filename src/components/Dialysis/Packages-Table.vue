<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        prepend-icon="mdi-magnify"
      ></v-text-field>
    </template>
    <template v-slot:[`item.package_price`]="{ item }">
      <div>PHP {{ item.package_price }}</div>
    </template>
    <template v-slot:[`item.items_price`]="{ item }">
      <div v-for="(dialysis_item, index) in item.items_price" :key="index">
        <span class="font-weight-bold">{{ dialysis_item.name }}</span> /
        <span>PHP: {{ dialysis_item.price }}</span>
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="ml-n8" style="width: 120px">
        <v-row no-gutters justify="center">
          <v-col cols="auto" v-if="iconPermissions.view" align-self="center">
            <v-icon
              @click="viewDialysisSession(item.dialysis_id)"
              class="mx-1"
              color="grey darken-1"
              dense
              >mdi-eye</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
import { mapGetters } from "vuex";
export default {
  name: "Packages-Table",
  props: ["packages"],
  data: () => ({
    search: "",
    offset: true,
    data: [],
  }),
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    viewDialysisSession(id) {
      this.$router.push({
        name: "",
        params: { id: id },
      });
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "PACKAGE",
          value: "package",
        },
        {
          text: "PACKAGE PRICE",
          value: "package_price",
        },
        {
          text: "ITEMS/PRICE",
          value: "items_price",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
        },
      ];
    },
    iconPermissions() {
      let view = false;
      if (this.userRole === "ADMIN") {
        view = true;
      } 
      return {
        view: view,
      };
    },
  },
  watch: {
    packages(value) {
      this.data = value.map((item) => ({
        package: item.name,
        package_price: item.price,
        items_price: item.dialysis_item_options,
      }));
    },
  },
};
</script>

<style scoped></style>
