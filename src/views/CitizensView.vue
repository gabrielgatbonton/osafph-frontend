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
          <v-btn class="mr-3" @click="toRegister">Register</v-btn>
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
    <DataTable :registrants="allRegistrants" />
  </div>
</template>

<script>
import DataTable from "@/components/Data-Table.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HomeView",
  components: {
    DataTable,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrants"]),
    toRegister() {
      this.$router.push({ name: "register" });
    },
  },
  computed: {
    ...mapGetters("registrants", ["allRegistrants"]),
  },
  created() {
    this.fetchRegistrants(); // Fetch registrants' data when the component is created
  },
  // watch:{
  //   allRegistrants(value){
  //     console.log("watch:", value)
  //   }
  // }
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
