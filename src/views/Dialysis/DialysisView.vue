<template>
  <div>
    <v-container fluid class="table-title ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Dialysis</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="mr-3" color="blue darken-4" @click="activator"
            >Filter</v-btn
          >
        </v-col>
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
    <v-container fluid class="ma-1">
      <DialysisTable :dialysis="switchData" />
    </v-container>
    <FilterDialog
      @filterQuery="filterQuery"
      :activator="dialog"
      @dialogResponse="resetActivator"
      :type_of_filter="type_of_filter"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DialysisTable from "@/components/Dialysis/Dialysis-Table.vue";
import FilterDialog from "@/components/Filter/FilterDialog.vue";
export default {
  name: "DialysisView",
  data: () => ({
    dialog: false,
    sessionStatus: false,
    type_of_filter: "DIALYSIS INDEX",
  }),
  components: {
    DialysisTable,
    FilterDialog,
  },
  methods: {
    ...mapActions("dialysis_sessions", ["fetchDialysisSessions"]),
    switchServices() {
      this.sessionStatus = !this.sessionStatus;
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    filterQuery(value) {
      this.fetchDialysisSessions(value);
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
