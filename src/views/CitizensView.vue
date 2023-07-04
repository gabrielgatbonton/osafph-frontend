<template>
  <div class="dashboard">
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Employees</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn class="mr-3">Register</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <!-- <v-text-field
      label="Search"
      class="search-bar mt-3 ml-3"
      prepend-inner-icon="mdi-magnify"
      filled
    ></v-text-field> -->
    <DataTable :headers="headers" :registrants="registrants" />
  </div>
</template>

<script>
import DataTable from "@/components/Data-Table.vue";
export default {
  name: "HomeView",
  components: {
    DataTable,
  },
  data() {
    return {
      search: "",
      registrants: [
        {
          registrants_no: "21-H01-010B72A51C9A",
          full_name: "PARAGAS, JOSEPHINE CHAN",
          sex: "FEMALE",
          birthday: "JULY 5, 1985",
          barangay: "CAMACHILES",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-0C7DA33FC416",
          full_name: "SANCHEZ, ELOISA BABADILLA",
          sex: "FEMALE",
          birthday: "OCTOBER 20, 1985",
          barangay: "MACAPAGAL VILLAGE",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-1075601DB71C",
          full_name: "PUNSALAN, MARCO CANLAS",
          sex: "MALE",
          birthday: "JULY 23, 1987",
          barangay: "MABIGA",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-3B802323F49C",
          full_name: "CALUB, KAYLA BIAG",
          sex: "FEMALE",
          birthday: "AUGUST 3, 1991",
          barangay: "DAU",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-3EBC428538A5",
          full_name: "SANGALANG, DANIELLA MARIE MALLARI",
          sex: "FEMALE",
          birthday: "OCTOBER 7, 2000",
          barangay: "CAMACHILES",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-3B802323F49C",
          full_name: "CALUB, KAYLA BIAG",
          sex: "FEMALE",
          birthday: "AUGUST 3, 1991",
          barangay: "DAU",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-1075601DB71C",
          full_name: "PUNSALAN, MARCO CANLAS",
          sex: "MALE",
          birthday: "JULY 23, 1987",
          barangay: "MABIGA",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-010B72A51C9A",
          full_name: "PARAGAS, JOSEPHINE CHAN",
          sex: "FEMALE",
          birthday: "JULY 5, 1985",
          barangay: "CAMACHILES",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-010B72A51C9A",
          full_name: "PARAGAS, JOSEPHINE CHAN",
          sex: "FEMALE",
          birthday: "JULY 5, 1985",
          barangay: "CAMACHILES",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
        {
          registrants_no: "21-H01-010B72A51C9A",
          full_name: "PARAGAS, JOSEPHINE CHAN",
          sex: "FEMALE",
          birthday: "JULY 5, 1985",
          barangay: "CAMACHILES",
          municipality: "	MABALACAT CITY",
          mcg_cares_card: "UNCLAIMED",
        },
      ],
    };
  },
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
          // filter: (value) => {
          //   if (!this.calories) return true;

          //   return value < parseInt(this.calories);
          // },
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
      ];
    },
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
.search-bar {
  width: 70%;
}
</style>
