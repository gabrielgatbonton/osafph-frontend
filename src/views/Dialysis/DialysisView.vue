<template>
  <div>
    <v-container fluid class="table-title ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Dialysis</span>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="ma-1">
      <DialysisTable
        v-if="dialysis_sessions"
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
  }),
  components: {
    DialysisTable,
  },
  methods: {
    ...mapActions("dialysis_sessions", ["fetchDialysisSessions"]),
    updateFetch(query_params) {
      this.fetchDialysisSessions(query_params);
    },
  },
  computed: {
    ...mapState("dialysis_sessions", {
      dialysis_sessions: "dialysis_sessions",
    }),
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
