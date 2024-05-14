<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="files">
        <!-- Header -->
        <v-row no-gutters>
          <v-col cols="auto">
            <p class="text-h6">Uploaded Files</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn dark class="mb-4" color="primary" @click="activator">
              Upload</v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <!-- Content -->
        <FilesTable :files="files" />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
    <UploadDialog
      v-on:uploadFiles="uploadFiles"
      v-on:dialogResponse="resetActivator"
      :activator="dialog"
      :reset="payload"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FilesTable from "@/components/File Viewer/Files-Table.vue";
import UploadDialog from "../../components/Upload/UploadDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  name: "DialysisFiles",
  mixins: [ErrorAlertsLogic, ContainerBreakpoint],
  data: () => ({
    payload: null,
    dialog: false,
    files: null,
  }),
  components: {
    FilesTable,
    UploadDialog,
  },
  methods: {
    ...mapActions("files", ["fetchFiles", "uploadFile"]),
    fetchData() {
      const hospital_service_id = this.$route.params.hospital_service_id;
      this.fetchFiles(hospital_service_id).catch((error) => {
        console.error("Error Fetching Data: ", error);
      });
    },
    uploadFiles(data) {
      const hospital_service_id = this.$route.params.hospital_service_id;
      this.uploadFile({
        hospital_service_id: hospital_service_id,
        file: data,
      })
        .catch((error) => {
          console.error("Error Uploading File: ", error);
        })
        .finally(() => {
          const payload = {
            file_name: null,
            document_type: null,
            file: null,
          };
          this.payload = payload;
          this.dialog = false;
        });
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
  },
  computed: {
    ...mapGetters("files", ["getFiles"]),
  },
  watch: {
    getFiles(value) {
      this.files = value;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
