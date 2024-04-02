<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Dialysis Queuing</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="12">
          <QueuingTable :queue_data="queuingDialysisList"/>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
import QueuingTable from '@/components/Dialysis/Queuing-Table.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "DialysisQueuingView",
  components: {
    QueuingTable,
  },
  methods: {
    ...mapActions("dialysis_general", ["fetchDialysisQueue"])
  },
  computed: {
    ...mapGetters("dialysis_general", ["queuingDialysisList"])
  },
  created() {
    this.fetchDialysisQueue();
  }
};
</script>

<style scoped></style>
