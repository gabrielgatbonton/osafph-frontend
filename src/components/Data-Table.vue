<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    class="elevation-1"
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
                <v-list-item>
                  <DeleteDialog :id="item.id" />
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import DeleteDialog from "./DeleteDialog.vue";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  props: ["registrants"],
  components: {
    DeleteDialog,
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
  data: () => ({
    search: "",
    offset: true,
    data: [],
  }),
  computed: {
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
