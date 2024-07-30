<template>
  <v-data-table
    :headers="headers"
    :items="packagesData"
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
    <template v-slot:[`item.items`]="{ item }">
      <span v-for="(name, index) in item.items" :key="index"
        >{{ name }}{{ index < item.items.length - 1 ? ", " : "" }}</span
      >
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="pa-0">
        <v-row no-gutters :justify="isJustify">
          <v-col cols="auto" v-if="iconPermissions.edit" align-self="center">
            <v-icon
              class="ml-1"
              color="blue darken-4"
              dense
              @click="activator(item.id)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.delete" align-self="center">
            <v-icon
              class="ml-1"
              color="error"
              dense
              @click="deleteActivator(item.id)"
              >mdi-trash-can</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.toggle" align-self="center">
            <v-icon
              :color="item.is_active ? 'primary' : 'grey'"
              large
              @click="togglePackage(item.id)"
              class="ml-1"
              >{{
                item.is_active ? "mdi-toggle-switch" : "mdi-toggle-switch-off"
              }}</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import DeletePackage from "@/mixins/Admin/Enums/Dialysis/DeletePackage";
import PackageDialog from "./PackageDialog.vue";
import EditPackage from "@/mixins/Admin/Enums/Dialysis/EditPackage";
import TogglePackage from "@/mixins/Admin/Enums/Dialysis/TogglePackage";
export default {
  name: "Packages-Table",
  props: ["packages"],
  mixins: [DeletePackage, EditPackage, TogglePackage],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    isJustify: "",
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
    userRole: function () {
      return this.$auth.role();
    },
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
          text: "ITEMS",
          value: "items",
        },
        {
          text: "STATUS",
          value: "status",
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
      let toggle = false;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        edit = true;
        remove = true;
        toggle = true;
      }
      return {
        edit: edit,
        delete: remove,
        toggle: toggle,
      };
    },
    packagesData() {
      return this.packages
        ? this.packages.map((item) => ({
            id: item.id,
            package: item.name,
            package_price: item.price,
            items: item.dialysis_item_options.map((item) => item.name),
            is_active: item.is_active,
            status: item.is_active ? "ACTIVE" : "INACTIVE",
          }))
        : [];
    },
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    packages: {
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
        if (newVal.sm) {
          this.isJustify = "center";
        } else if (newVal.xs) {
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
@/mixins/Admin/Enums/Dialysis/DeletePackage@/mixins/Admin/Enums/Dialysis/EditPackage@/mixins/Admin/Enums/Dialysis/TogglePackage
