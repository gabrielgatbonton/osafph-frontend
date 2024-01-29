<template>
  <div>
    <SubmissionAlert :title="title" v-if="showAlert" />
    <ErrorAlert :title="title" v-if="showError" />
    <v-container fluid class="ma-2">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Citizens</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="mr-3" color="blue darken-4" @click="activator"
            >Filter</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn dark class="mr-3 blue darken-4" @click="toRegister"
            >Register</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <DataTable :registrants="allRegistrants" />
    <FilterDialog :activator="dialog" v-on:dialogResponse="resetActivator" />
  </div>
</template>

<script>
import DataTable from "@/components/Data-Table.vue";
import FilterDialog from "@/components/Filter/FilterDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CitizensView",
  mixins: [ErrorAlertsLogic],
  components: {
    DataTable,
    FilterDialog,
  },
  data() {
    return {
      search: "",
      showAlert: false,
      showError: false,
      title: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrants"]),
    toRegister() {
      this.$router.push({ name: "register" });
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
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
.search-bar {
  width: 70%;
}
</style>
