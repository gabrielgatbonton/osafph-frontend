<template>
  <div class="dashboard">
    <SubmissionAlert :title="title" v-if="showAlert" />
    <ErrorAlert :title="title" v-if="showError" />
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Citizens</span>
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
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CitizensView",
  mixins: [ErrorAlertsLogic],
  components: {
    DataTable,
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
  },
  created() {
    this.fetchRegistrants(); // Fetch registrants' data when the component is created
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
