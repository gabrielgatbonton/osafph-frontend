<template>
  <v-data-table
    :headers="headers"
    :items="itemData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    :loading="loading"
    loading-text="Loading... Please wait"
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
      <ItemDialog
        :activator="dialog"
        @dialogResponse="resetEditActivator"
        :item="dialysis_item"
        @submitForm="submitForm"
      />
    </template>
    <template v-slot:[`item.item_price`]="{ item }">
      <div>PHP {{ item.item_price }}</div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="pa-0">
        <v-row no-gutters :justify="isJustify">
          <v-col cols="auto" v-if="iconPermissions.edit" align-self="center">
            <v-icon
              class="ml-1"
              color="blue darken-4"
              dense
              @click="activator(item.item_id)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.delete" align-self="center">
            <v-icon
              class="ml-1"
              color="error"
              dense
              @click="deleteActivator(item.item_id)"
              >mdi-trash-can</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import DeleteItem from "@/mixins/Admin/Enums/Dialysis/DeleteItem";
import ItemDialog from "./ItemDialog.vue";
import EditItem from "@/mixins/Admin/Enums/Dialysis/EditItem";
export default {
  name: "Items-Table",
  mixins: [DeleteItem, EditItem],
  props: ["items"],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    isJustify: "",
  }),
  components: {
    ReusableDeleteDialog,
    ItemDialog,
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
    userRole: function () {
      return this.$auth.role();
    },
    headers() {
      return [
        {
          text: "ITEM ID",
          value: "item_id",
        },
        {
          text: "DIALYSIS ITEM NAME",
          value: "dialysis_item_name",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
    },
    iconPermissions() {
      let edit = false;
      let remove = false;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        edit = true;
        remove = true;
      }
      return {
        edit: edit,
        delete: remove,
      };
    },
    itemData() {
      return this.items
        ? this.items.map((item) => ({
            item_id: item.id,
            dialysis_item_name: item.name,
          }))
        : [];
    },
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    items: {
      handler(value) {
        this.loading = true;
        if (!value.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
      immediate: true,
    },
    size: {
      handler: function (newVal) {
        if (newVal.xs) {
          this.isJustify = "end";
        } else {
          this.isJustify = "center";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
