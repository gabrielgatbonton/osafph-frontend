<template>
  <div class="dashboard">
    <SubmissionAlert :title="title" v-if="showAlert" />
    <ErrorAlert :title="title" v-if="showError" />
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Employees</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="mr-3 blue darken-4" @click="toRegister"
            >Register</v-btn
          >
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
import SubmissionAlert from "@/components/SubmissionAlert.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HomeView",
  components: {
    DataTable,
    SubmissionAlert,
    ErrorAlert,
  },
  data() {
    return {
      search: "",
      showAlert: false,
      showError: false,
      title: null,
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
    ...mapGetters("alerts", ["getShowAlert", "getShowError"]),
  },
  created() {
    this.fetchRegistrants(); // Fetch registrants' data when the component is created
  },
  watch: {
    getShowAlert(value) {
      console.log("alert", value);
      this.showAlert = value.alert;
      this.title = value.message;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    },
    getShowError(value) {
      console.log("error", value);
      this.showError = value.alert;
      this.title = value.message;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
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
