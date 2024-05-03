<template>
  <div>
    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card>
        <v-card-title class="primary pb-4 white--text"
          ><v-icon dark left>mdi-file-upload</v-icon>Upload File</v-card-title
        >
        <v-container fluid class="py-8 mx-auto overflow-scroll">
          <v-row class="mx-4">
            <v-col cols="12">
              <v-text-field
                v-model="payload.file_name"
                label="File Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.document_type"
                label="Document Type"
                :items="file_types_enum"
                item-text="name"
                @blur="$v.payload.document_type.$touch()"
                :error-messages="errorMessages.document_type"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="File Input"
                @change="handleFileUpload"
                :value="payload.file"
                @blur="$v.payload.file.$touch()"
                :error-messages="errorMessages.file"
              ></v-file-input>
              <UploadArea v-on:file="handleFileUpload" />
            </v-col>
            <v-col cols="12">
              <div class="text-right">
                <v-btn dark class="primary" @click="uploadFiles"
                  >Submit</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { format, parse, parseISO } from "date-fns";
import { mapActions, mapState } from "vuex";
import UploadArea from "./UploadArea.vue";
import UploadDialogMixin from "@/mixins/Validation/UploadForm/UploadDialog";
export default {
  name: "UploadDialog",
  mixins: [UploadDialogMixin],
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    payload: {
      file_name: null,
      document_type: null,
      file: null,
    },
    citizen_id: null,
    hospital_service_id: null,
  }),
  components: {
    UploadArea,
  },
  methods: {
    ...mapActions("file_types", ["fetchEnum"]),
    handleFileUpload(file) {
      //   this.payload.file = URL.createObjectURL(file);
      //   this.submitImage(file, "image");
      this.payload.file = file;
    },
    uploadFiles() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const formData = new FormData();

        // Append file to FormData
        formData.append("file", this.payload.file);

        // Append other fields to FormData
        formData.append("file_name", this.payload.file_name);
        formData.append("document_type", this.payload.document_type);

        this.$emit("uploadFiles", formData);
        this.$v.$reset();
      }
    },
  },
  computed: {
    ...mapState("file_types", {
      file_types_enum: "file_types",
    }),
  },
  watch: {
    activator(newValue) {
      this.dialog = newValue;
    },
    //Reset for Adding
    reset(value) {
      this.payload = value;
    },
    dialog(value) {
      if (value === false) {
        this.$emit("dialogResponse", value);
      }
    },
  },
  created() {
    this.fetchEnum();
  },
};
</script>

<style scoped>
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
</style>
