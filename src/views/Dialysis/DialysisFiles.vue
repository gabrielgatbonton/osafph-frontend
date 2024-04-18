<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Uploaded Files</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="mr-3" color="blue darken-4" @click="activator">
            Upload</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="my-4"></v-divider>
    <v-container fluid class="ma-1">
      <FilesTable :files="files" />
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
export default {
  name: "DialysisFiles",
  mixins: [ErrorAlertsLogic],
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
