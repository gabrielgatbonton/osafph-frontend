<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Dialysis Items</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="mr-3" color="blue darken-4" @click="activator">
            Add Item</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ItemsTable :items="dialysis_items" />
    <ItemDialog
      :activator="dialog"
      @dialogResponse="resetActivator"
      @submitForm="submitForm"
      :reset="payload"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import ItemsTable from "@/components/Dialysis/Items-Table.vue";
import ItemDialog from "@/components/Dialysis/ItemDialog.vue";
export default {
  name: "DialysisItemsView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    dialog: false,
    payload: {},
  }),
  components: {
    ItemsTable,
    ItemDialog,
  },
  methods: {
    ...mapActions("dialysis_items", ["fetchDialysisItems", "addDialysisItems"]),
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    submitForm(data) {
      this.addDialysisItems(data)
        .catch((error) => {
          console.error("Error Adding Item in component: ", error);
        })
        .finally(() => {
          this.dialog = false;
          this.payload = {
            name: null,
          };
        });
    },
  },
  computed: {
    ...mapState("dialysis_items", {
      dialysis_items: "dialysis_items",
    }),
  },
  created() {
    this.fetchDialysisItems();
  },
};
</script>

<style scoped></style>
