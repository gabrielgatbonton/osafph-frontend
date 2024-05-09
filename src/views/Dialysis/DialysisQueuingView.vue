<template>
  <div>
    <!-- <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Dialysis Queuing</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider> -->
    <v-container fluid>
      <div v-if="queuingDialysisList">
        <v-row no-gutters>
          <v-col cols="12">
            <QueuingTable
              :queue_data="queuingDialysisList"
              @dialog="updateDialog"
              :dialogResponse="dialog"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
      scrollable
    >
      <v-card>
        <QueuingTable
          :queue_data="queuingDialysisList"
          @dialog="updateDialog"
          :dialogResponse="dialog"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import QueuingTable from "@/components/Dialysis/Queuing-Table.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DialysisQueuingView",
  data: () => ({
    dialog: false,
  }),
  components: {
    QueuingTable,
  },
  methods: {
    ...mapActions("dialysis_general", ["fetchDialysisQueue"]),
    updateDialog(value) {
      this.dialog = value;
    },
    routeEvents() {
      const channel = this.$pusher.subscribe("dialysis-queue");

      channel.bind("queue.changed", () => {
        this.fetchDialysisQueue();
      });
    },
  },
  computed: {
    ...mapGetters("dialysis_general", ["queuingDialysisList"]),
  },
  created() {
    this.fetchDialysisQueue();
    this.routeEvents();
  },
};
</script>

<style scoped></style>
