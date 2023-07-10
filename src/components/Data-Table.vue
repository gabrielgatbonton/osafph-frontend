<template>
  <v-data-table :headers="headers" :items="registrants" item-key="name" class="elevation-1" :search="search"
    :custom-filter="filterOnlyCapsText">
    <template v-slot:top>
      <v-text-field v-model="search" label="Search" class="mx-4" prepend-icon="mdi-magnify"></v-text-field>
    </template>
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.registrants_no">
          <td>{{ item.registrants_no }}</td>
          <td>
            {{
              `${item.last_name.toUpperCase()}, ${item.first_name.toUpperCase()} ${item.middle_name.toUpperCase()}
                        ${item.suffix ? " " + item.suffix.toUpperCase() : ""
              }`
            }}
          </td>
          <td>{{ item.sex.toUpperCase() }}</td>
          <td>{{ item.birthday.toUpperCase() }}</td>
          <td>{{ item.barangay.toUpperCase() }}</td>
          <td>{{ item.municipality.toUpperCase() }}</td>
          <td>{{ item.mcg_cares_card }}</td>
          <td>
            <!-- Icon button for options -->
            <v-menu left :offset-x="offset">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-n8" v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
              </template>

              <v-list dense>
                <v-list-item v-for="(option, index) in getOptions(item)" :key="index" :to="option.route">
                  <v-list-item-title><v-icon dense left>{{ option.icon }}</v-icon>{{ option.text }}</v-list-item-title>
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
export default {
  props: ["registrants"],
  methods: {
    filterOnlyCapsText(value, search, item) {
      if (item.value === "full_name") {
        const fullName = `${item.first_name} ${item.middle_name} ${item.last_name
          } ${item.suffix ? " " + item.suffix : ""}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      }

      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    getOptions(item) {
      return [
        { icon: "mdi-view-agenda-outline", text: "VIEW DETAILS", route: { name: "prototype", params: { id: item.id } } },
        { icon: "mdi-square-edit-outline", text: "EDIT", route: "" },
        { icon: "mdi-delete-alert-outline", text: "DELETE", route: "" },
      ];
    },
    // showOptions(item) {
    //   // Handle the action for the selected item (item.actions)
    // },
  },
  data: () => ({
    search: "",
    offset: true,
  }),
  computed: {
    headers() {
      return [
        {
          text: "REGISTRANTS NO.",
          align: "start",
          sortable: false,
          value: "registrants_no",
        },
        {
          text: "FULL NAME",
          value: "last_name",
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
  },
};
</script>
