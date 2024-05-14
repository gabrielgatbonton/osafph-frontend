<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="dialysis_packages">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">Dialysis Packages</p>
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
              dark
              class="mr-3 mb-4"
              color="primary"
              @click="activator"
            >
              Add Package</v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <PackagesTable :packages="dialysis_packages" />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
    <PackageDialog
      @dialogResponse="resetActivator"
      :activator="dialog"
      :reset="payload"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import PackagesTable from "@/components/Enums/Dialysis Packages/Packages-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PackageDialog from "@/components/Enums/Dialysis Packages/PackageDialog.vue";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
import { mapState, mapActions } from "vuex";
export default {
  name: "DialysisPackagesView",
  mixins: [ErrorAlertsLogic, ContainerBreakpoint],
  data: () => ({
    payload: {},
    dialog: false,
    isIcon: false,
  }),
  components: {
    PackagesTable,
    PackageDialog,
  },
  methods: {
    ...mapActions("dialysis_items_actions", [
      "fetchDialysisPackages",
      "addDialysisPackage",
    ]),
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    submitForm(data) {
      this.addDialysisPackage(data)
        .catch((error) => {
          console.error("Error Adding Package in component: ", error);
        })
        .finally(() => {
          this.dialog = false;
          this.payload = {
            name: null,
            dialysis_item_options: null,
            price: null,
          };
        });
    },
  },
  computed: {
    ...mapState("dialysis_items_actions", {
      dialysis_packages: "dialysis_packages",
    }),
    size() {
      return this.$vuetify.breakpoint;
    },
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
  created() {
    this.fetchDialysisPackages();
  },
};
</script>

<style scoped></style>
