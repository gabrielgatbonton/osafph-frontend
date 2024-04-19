<template>
  <v-data-table
    :headers="headers"
    :items="registrantsData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :loading="loading"
    loading-text="Loading... Please wait"
    :server-items-length="registrants.pagination.total"
    :options.sync="options"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15],
    }"
  >
    <template v-slot:top>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          prepend-icon="mdi-magnify"
        ></v-text-field>
        <div>
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            dark
            class="mr-3"
            color="blue darken-4"
            @click="activator"
            >Filter</v-btn
          >
          <v-btn
            v-else
            dark
            class="mr-3"
            color="blue darken-4"
            @click="activator"
            icon
            ><v-icon>mdi-filter-multiple</v-icon></v-btn
          >
        </div>
      </div>

      <ReusableDeleteDialog
        :activator="deleteDialog"
        v-on:dialogResponse="resetActivator"
        v-on:deleteItem="deleteItem"
      />
      <FilterDialog
        @filterQuery="(data) => assignParams(data)"
        :activator="dialog"
        @dialogResponse="resetActivator"
        :type_of_filter="type_of_filter"
        :slot_activator="slot_activator"
      />
    </template>
    <template v-slot:[`item.mcg_cares_card`]="{ item }">
      <div
        :class="{
          'text-green': item.mcg_cares_card === 'CLAIMED',
          'text-red': item.mcg_cares_card !== 'CLAIMED',
        }"
      >
        {{ item.mcg_cares_card }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- Icon button for options -->
      <v-menu left :offset-x="offset">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="!$vuetify.breakpoint.xs"
            class="ml-n8"
            v-bind="attrs"
            v-on="on"
            >mdi-dots-vertical</v-icon
          >
          <v-btn
            v-else
            color="blue darken-4"
            v-bind="attrs"
            v-on="on"
            icon
            x-large
            ><v-icon>mdi-dots-horizontal</v-icon></v-btn
          >
        </template>

        <v-list dense>
          <v-list-item
            v-for="(option, index) in getOptions(item)"
            :key="index"
            @click="executeAction(option)"
          >
            <v-list-item-title
              ><v-icon dense left>{{ option.icon }}</v-icon
              >{{ option.text }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            v-if="menuPermissions.delete"
            @click="deleteActivator(item.id)"
          >
            <v-list-item-title class="red--text"
              ><v-icon dense left color="#F44336"
                >mdi-delete-alert-outline</v-icon
              >DELETE</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import { format, parseISO } from "date-fns";
import ReusableDeleteDialog from "./ReusableDeleteDialog.vue";
import DeleteRegistrantMixin from "@/mixins/Registrant/DeleteRegistrant";
import FilterDialog from "@/components/Filter/FilterDialog.vue";
import TablePaginationMixin from "@/mixins/Tables/TablePagination"
import { mapGetters } from "vuex";
export default {
  mixins: [DeleteRegistrantMixin, TablePaginationMixin],
  props: ["registrants"],
  components: {
    ReusableDeleteDialog,
    FilterDialog,
  },
  data: () => ({
    offset: true,
    loading: true,
    dialog: false,
    type_of_filter: "CITIZENS INDEX",
    slot_activator: false,
  }),
  methods: {
    getOptions(item) {
      return [
        {
          icon: "mdi-view-agenda-outline",
          text: "VIEW DETAILS",
          route: { name: "details", params: { id: item.id } },
        },
        {
          icon: "mdi-square-edit-outline",
          text: "EDIT",
          route: { name: "edit", params: { id: item.id } },
        },
        {
          icon: "mdi-medical-bag",
          text: "HOSPITAL SERVICES",
          route: { name: "hospital-services", params: { id: item.id } },
        },
        // {
        //   icon: "mdi-delete-alert-outline",
        //   text: "DELETE",
        //   action: () => {
        //     this.deleteRegistrant(item.id);
        //   },
        // },
      ];
    },
    executeAction(option) {
      if (option.action) {
        // Execute the action
        option.action();
      } else if (option.route) {
        // Navigate to the route
        this.$router.push(option.route);
      }
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "HUB REGISTRANT ID",
          align: "start",
          value: "hub_registrant_id",
        },
        {
          text: "FULL NAME",
          value: "full_name",
        },
        {
          text: "SEX",
          value: "sex",
        },
        {
          text: "BIRTHDAY",
          value: "birthday",
        },
        {
          text: "BARANGAY",
          value: "barangay_name",
        },
        {
          text: "MUNICIPALITY",
          value: "municipality_name",
        },
        {
          text: "MCG CARES CARD",
          value: "mcg_cares_card",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ];
    },
    menuPermissions() {
      let remove = false;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        remove = true;
      } else if (this.userRole === "ENCODER" || this.userRole === "VIP_ENCODER") {
        remove = false;
      }
      return {
        delete: remove,
      };
    },
    registrantsData() {
      return this.registrants
        ? this.registrants.citizens.map((registrant) => ({
            id: registrant.id,
            hub_registrant_id: registrant.hub_registrant_id,
            full_name: `${registrant.last_name}, ${registrant.first_name} ${
              registrant.middle_name ? " " + registrant.middle_name : ""
            } ${registrant.suffix ? " " + registrant.suffix : ""}`,
            sex: registrant.sex,
            birthday: format(parseISO(registrant.birthday), "MMMM dd, yyyy"),
            barangay_name: registrant.barangay,
            municipality_name: registrant.municipality,
            mcg_cares_card: registrant.mcg_cares_card,
          }))
        : [];
    },
  },
  watch: {
    registrants: {
      immediate: true,
      handler(value) {
        this.loading = true;
        if (!value.citizens.length) {
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
.text-green {
  color: green;
}

.text-red {
  color: red;
}
</style>
