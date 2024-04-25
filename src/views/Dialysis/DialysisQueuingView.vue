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
    <v-container fluid class="ma-1" v-if="queuingDialysisList">
      <v-row>
        <v-col cols="12">
          <QueuingTable
            :queue_data="queuingDialysisList"
            @dialog="updateDialog"
            :dialogResponse="dialog"
          />
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="pa-6">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
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
  },
  computed: {
    ...mapGetters("dialysis_general", ["queuingDialysisList"]),
  },
  created() {
    this.fetchDialysisQueue();
  },
};
</script>

<style scoped></style>
