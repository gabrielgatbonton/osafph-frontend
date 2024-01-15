<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Uploaded Files</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            dark
            class="mr-3"
            color="blue darken-4"
            :class="{ 'disabled-button': disabled }"
            @click="activator"
          >
            Upload</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="my-4"></v-divider>
    <FilesTable :files="files" />
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
import FilesTable from "@/components/Consultation/Files-Table.vue";
import UploadDialog from "../../components/Upload/UploadDialog.vue";
export default {
  name: "ConsultationFiles",
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
    ...mapActions("consultations", [
      "fetchConsultationFiles",
      "uploadConsultationFile",
    ]),
    fetchData() {
      const hospital_service_id = this.$route.params.hospital_service_id;
      this.fetchConsultationFiles(hospital_service_id).catch((error) => {
        console.error("Error Fetching Data: ", error);
      });
    },
    uploadFiles(data) {
      const hospital_service_id = this.$route.params.hospital_service_id;
      this.uploadConsultationFile({
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
    ...mapGetters("consultations", ["getConsultationFiles"]),
  },
  watch: {
    getConsultationFiles(value) {
      this.files = value;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
