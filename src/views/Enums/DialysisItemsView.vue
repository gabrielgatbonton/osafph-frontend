<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid style="max-width: 85vw">
      <div v-if="dialysis_items">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">Dialysis Items</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="isIcon"
              class="mr-3 mb-4"
              color="primary"
              icon
              @click="activator"
            >
              <v-icon>mdi-plus</v-icon></v-btn
            >
            <v-btn
              v-else
              class="mr-3 mb-4"
              color="primary"
              dark
              @click="activator"
            >
              Add Item</v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <ItemsTable :items="dialysis_items" />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>

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
import ItemsTable from "@/components/Enums/Dialysis Items/Items-Table.vue";
import ItemDialog from "@/components/Enums/Dialysis Items/ItemDialog.vue";
export default {
  name: "DialysisItemsView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    dialog: false,
    payload: {},
    isIcon: false,
  }),
  components: {
    ItemsTable,
    ItemDialog,
  },
  methods: {
    ...mapActions("dialysis_items_actions", [
      "fetchDialysisItems",
      "addDialysisItem",
    ]),
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    submitForm(data) {
      this.addDialysisItem(data)
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
    ...mapState("dialysis_items_actions", {
      dialysis_items: "dialysis_items",
    }),
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  created() {
    this.fetchDialysisItems();
  },
  watch: {
    size: {
      handler: function (value) {
        if (value.xs) {
          this.isIcon = true;
        } else {
          this.isIcon = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
