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
      <DialysisTable
        :dialysis="dialysis_sessions"
        @query_params="updateFetch"
      />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DialysisTable from "@/components/Dialysis/Dialysis-Table.vue";
export default {
  name: "DialysisView",
  data: () => ({
    sessionStatus: false,
  }),
  components: {
    DialysisTable,
  },
  methods: {
    ...mapActions("dialysis_sessions", ["fetchDialysisSessions"]),
    switchServices() {
      this.sessionStatus = !this.sessionStatus;
    },
    updateFetch(query_params) {
      this.fetchDialysisSessions(query_params);
    },
  },
  computed: {
    ...mapState("dialysis_sessions", {
      dialysis_sessions: "dialysis_sessions",
    }),
    // ...mapGetters("dialysis_sessions", [
    //   "getPendingSessions",
    //   "getArchivedSessions",
    // ]),
    // switchData() {
    //   return this.sessionStatus
    //     ? this.getArchivedSessions
    //     : this.getPendingSessions;
    // },
  },
  created() {
    this.fetchDialysisSessions();
  },
  // watch: {
  //   dialysis_sessions: {
  //     immediate: true,
  //     handler(value) {
  //       console.log(value);
  //     }
  //   }
  // }
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
