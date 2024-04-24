<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <div v-if="file_type_enum">
      <v-container fluid class="ma-1">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-icon left>mdi-account-box-multiple</v-icon>
            <span class="title">Document Types</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="isIcon"
              class="mr-3"
              color="blue darken-4"
              icon
              @click="activator"
            >
              <v-icon>mdi-plus</v-icon></v-btn
            >
            <v-btn
              v-else
              dark
              class="mr-3"
              color="blue darken-4"
              @click="activator"
            >
              Add Item</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-container fluid class="ma-1">
        <v-row>
          <v-col cols="12">
            <DocumentTypesTable
              :types="file_type_enum"
              :activator="dialog"
              @dialog:response="resetActivator"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else class="pa-6">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
    <!-- <ItemDialog
      :activator="dialog"
      @dialogResponse="resetActivator"
      @submitForm="submitForm"
      :reset="payload"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import DocumentTypesTable from "@/components/Enums/Document Types/DocumentTypes-Table.vue";
export default {
  name: "DocumentTypesView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    dialog: false,
    isIcon: false,
  }),
  components: {
    DocumentTypesTable,
  },
  methods: {
    ...mapActions("file_types", ["fetchFileTypes"]),
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(value) {
      this.dialog = value;
    },
  },
  computed: {
    ...mapState("file_types", {
      file_type_enum: "file_types",
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
    },
  },
  created() {
    this.fetchFileTypes();
  },
};
</script>

<style scoped></style>
