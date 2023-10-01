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
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.hub_registrant_number">
          <td>{{ item.hub_registrant_number }}</td>
          <td>
            {{ item.full_name }}
          </td>
          <td>{{ item.gender }}</td>
          <td>{{ item.birthday }}</td>
          <td>{{ item.barangay }}</td>
          <td>{{ item.municipality }}</td>
          <td>
            <div
              :class="{
                'text-green': item.mcg_cares_card === 'CLAIMED',
                'text-red': item.mcg_cares_card !== 'CLAIMED',
              }"
            >
              {{ item.mcg_cares_card }}
            </div>
          </td>
          <td>
            <!-- Icon button for options -->
            <v-menu left :offset-x="offset">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-n8" v-bind="attrs" v-on="on"
                  >mdi-dots-vertical</v-icon
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
                <v-list-item v-if="auth.delete">
                  <v-list-item-title class="red--text" @click="deleteActivator(item.id)"
                    ><v-icon dense left color="#F44336"
                      >mdi-delete-alert-outline</v-icon
                    >DELETE</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
      <ReusableDeleteDialog
        :activator="deleteDialog"
        v-on:dialogResponse="resetActivator"
        v-on:deleteItem="deleteItem"
      />
    </template>
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ReusableDeleteDialog from "./ReusableDeleteDialog.vue";
import DeleteRegistrantMixin from "@/mixins/Registrant/DeleteRegistrant";
import { mapGetters } from "vuex";
export default {
  mixins: [DeleteRegistrantMixin],
  props: ["registrants"],
  components: {
    ReusableDeleteDialog,
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
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.auth.delete = true;
      } else if (this.userRole === "ENCODER") {
        this.auth.delete = false;
      }
    },
  },
  data: () => ({
    search: "",
    offset: true,
    data: [],
    auth: {
      delete: null,
    },
  }),
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "REGISTRANTS NO.",
          align: "start",
          sortable: false,
          value: "hub_registrant_number",
        },
        {
          text: "FULL NAME",
          value: "full_name",
        },
        {
          text: "GENDER",
          value: "gender",
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
  },
  watch: {
    registrants(value) {
      this.data = value.map((registrant) => ({
        id: registrant.id,
        hub_registrant_number: registrant.hub_registrant_number,
        full_name: `${registrant.last_name}, ${registrant.first_name} ${
          registrant.middle_name ? " " + registrant.middle_name : ""
        } ${registrant.suffix ? " " + registrant.suffix : ""}`,
        gender: registrant.gender,
        birthday: format(parseISO(registrant.birthday), "MMMM dd, yyyy"),
        barangay: registrant.barangay,
        municipality: registrant.municipality,
        mcg_cares_card: registrant.mcg_cares_card,
      }));
    },
  },
  updated() {
    this.userRolePermissions();
  }
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
