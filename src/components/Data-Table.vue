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
        v-on:dialogResponse="resetActivator"
        v-on:deleteItem="deleteItem"
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
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [DeleteRegistrantMixin],
  props: ["registrants"],
  components: {
    ReusableDeleteDialog,
  },
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    options: {},
    query_params: {},
  }),
  methods: {
    ...mapActions("registrants", ["fetchRegistrants"]),
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
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "HUB REGISTRANT ID",
          align: "start",
          sortable: false,
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
          value: "barangay",
        },
        {
          text: "MUNICIPALITY",
          value: "municipality",
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
      } else if (this.userRole === "ENCODER") {
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
            barangay: registrant.barangay,
            municipality: registrant.municipality,
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
    options: {
      deep: true,
      handler(value) {
        if (value.page > 1) {
          this.query_params.page = value.page;
        } else {
          delete this.query_params.page;
        }
        if (value.itemsPerPage) {
          this.query_params.per_page = value.itemsPerPage;
        }
        if (value.sortBy.length === 1 && value.sortDesc.length === 1) {
          this.query_params.sort_by = value.sortBy[0];
          this.query_params.sort_order = value.sortDesc[0] ? "asc" : "desc";
        } else {
          delete this.query_params.sort_by;
          delete this.query_params.sort_order;
        }

        this.fetchRegistrants(this.query_params).catch((error) => {
          console.error("Error Fetching Query: ", error);
        });
      },
    },
    search: {
      deep: true,
      handler(value) {
        this.query_params.search = value;
        this.fetchRegistrants(this.query_params).catch((error) => {
          console.error("Error Fetching Query: ", error);
        });
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
