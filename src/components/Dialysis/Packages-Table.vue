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
      <ReusableDeleteDialog
        :activator="deleteDialog"
        @dialogResponse="resetActivator"
        @deleteItem="deleteItem"
      />
      <PackageDialog
        :activator="dialog"
        @dialogResponse="resetEditActivator"
        :package="dialysis_package"
        @submitForm="submitForm"
      />
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
          <v-col cols="auto" v-if="iconPermissions.edit" align-self="center">
            <v-icon
              class="mx-1"
              color="blue darken-4"
              dense
              @click="activator(item.id)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.delete" align-self="center">
            <v-icon
              class="mx-1"
              color="error"
              dense
              @click="deleteActivator(item.id)"
              >mdi-trash-can</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import DeletePackage from "@/mixins/Admin/Dialysis/DeletePackage";
import PackageDialog from "./PackageDialog.vue";
import EditPackage from "@/mixins/Admin/Dialysis/EditPackage";
export default {
  name: "Packages-Table",
  props: ["packages"],
  mixins: [DeletePackage, EditPackage],
  data: () => ({
    search: "",
    offset: true,
    data: [],
  }),
  components: {
    ReusableDeleteDialog,
    PackageDialog,
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
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
      let edit = false;
      let remove = false;
      if (this.userRole === "ADMIN") {
        edit = true;
        remove = true;
      }
      return {
        edit: edit,
        delete: remove,
      };
    },
  },
  watch: {
    packages(value) {
      this.data = value.map((item) => ({
        id: item.id,
        package: item.name,
        package_price: item.price,
        items_price: item.dialysis_item_options,
      }));
    },
  },
};
</script>

<style scoped></style>
