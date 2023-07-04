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
  </v-data-table>
</template>

<script>
export default {
  props: ["registrants", "headers"],
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      );
    },
  },
  data: () => ({
    search: "",
  })
};
</script>