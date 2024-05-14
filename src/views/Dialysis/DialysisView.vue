<template>
  <div>
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="dialysis_sessions">
        <p class="text-h6">Acquired Dialysis</p>
        <v-divider></v-divider>

        <DialysisTable
          :dialysis="dialysis_sessions"
          @query_params="updateFetch"
        />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DialysisTable from "@/components/Dialysis/Dialysis-Table.vue"
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  name: "DialysisView",
  data: () => ({}),
  mixins: [ContainerBreakpoint],
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
