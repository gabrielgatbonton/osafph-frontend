<template>
  <div>
    <SubmissionAlert :title="title" v-if="showAlert" />
    <ErrorAlert :title="title" v-if="showError" />
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Dialysis</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            class="mr-3"
            color="blue darken-4"
            dark
            @click="switchServices"
            >{{
              sessionStatus ? "Pending Services" : "Archived Services"
            }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <DialysisTable :dialysis="switchData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//   import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
//   import addServiceMixin from "@/mixins/Hospital-Service/AddService";
import ErrorAlertsLogic from "../../mixins/Alerts & Errors/ErrorAlertsLogic";
import DialysisTable from "@/components/Dialysis/Dialysis-Table.vue";
export default {
  name: "DialysisView",
  data: () => ({
    sessionStatus: false,
  }),
  mixins: [ErrorAlertsLogic],
  components: {
    //   ServicesTable,
    //   ServiceDialog,
    DialysisTable,
  },
  methods: {
    ...mapActions("dialysis_sessions", ["fetchDialysisSessions"]),
    switchServices() {
      this.sessionStatus = !this.sessionStatus;
    },
  },
  computed: {
    ...mapGetters("dialysis_sessions", [
      "getPendingSessions",
      "getArchivedSessions",
    ]),
    switchData() {
      return this.sessionStatus
        ? this.getArchivedSessions
        : this.getPendingSessions;
    },
  },
  created() {
    this.fetchDialysisSessions();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
