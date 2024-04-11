<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Document Types</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            dark
            class="mr-3"
            color="blue darken-4"
            @click="activator"
          >
            Add Item</v-btn
          >
          <v-btn
            v-else
            class="mr-3"
            color="blue darken-4"
            icon
            @click="activator"
          >
            <v-icon>mdi-plus</v-icon></v-btn
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
import DocumentTypesTable from "@/components/Enums/DocumentTypes-Table.vue";
export default {
  name: "DocumentTypesView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    dialog: false,
  }),
  components: {
    DocumentTypesTable,
  },
  methods: {
    ...mapActions("file_types", [
      "fetchFileTypes",
    ]),
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
  },
  created() {
    this.fetchFileTypes();
  },
};
</script>

<style scoped></style>
