<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />

    <v-container fluid style="max-width: 85vw">
      <div v-if="file_type_enum">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">Document Types</p>
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
              Add Item</v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <DocumentTypesTable
          :types="file_type_enum"
          :activator="dialog"
          @dialog:response="resetActivator"
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
      immediate: true,
    },
  },
  created() {
    this.fetchFileTypes();
  },
};
</script>

<style scoped></style>
