<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Dialysis Packages</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn v-if="!$vuetify.breakpoint.xs" dark class="mr-3" color="blue darken-4" @click="activator">
            Add Package</v-btn
          >
          <v-btn v-else class="mr-3" color="blue darken-4" icon @click="activator">
            <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <PackagesTable :packages="dialysis_packages" />
    <PackageDialog
      @dialogResponse="resetActivator"
      :activator="dialog"
      :reset="payload"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import PackagesTable from "@/components/Dialysis/Packages-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PackageDialog from "@/components/Dialysis/PackageDialog.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "DialysisPackagesView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    payload: {},
    dialog: false,
  }),
  components: {
    PackagesTable,
    PackageDialog,
  },
  methods: {
    ...mapActions("dialysis_packages", [
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
    ...mapState("dialysis_packages", {
      dialysis_packages: "dialysis_packages"
    }),
  },
  created() {
    this.fetchDialysisPackages();
  },
};
</script>

<style scoped></style>
