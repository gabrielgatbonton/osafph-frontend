<template>
  <v-data-table
    :headers="headers"
    :items="registrants"
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
        <tr v-for="item in items" :key="item.registrants_no">
          <td>{{ item.registrants_no }}</td>
          <td>{{ item.full_name }}</td>
          <td>{{ item.sex }}</td>
          <td>{{ item.birthday }}</td>
          <td>{{ item.barangay }}</td>
          <td>{{ item.municipality }}</td>
          <td>{{ item.mcg_cares_card }}</td>
          <td>
            <!-- Icon button for options -->
            <v-icon class="ml-n8" @click="showOptions(item)">mdi-dots-vertical</v-icon>
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
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      );
    },
    // showOptions(item) {
    //   // Handle the action for the selected item (item.actions)
    // },
  },
  data: () => ({
    search: "",
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
  },
};
</script>
