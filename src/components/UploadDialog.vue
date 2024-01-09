<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
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
                :items="getFileTypes"
                item-text="name"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="File Input"
                @change="handleFileUpload"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <div class="text-right">
                <v-btn dark class="blue darken-4" @click="uploadFiles"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UploadDialog",
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
  methods: {
    ...mapActions("file_types", ["fetchFileTypes"]),
    handleFileUpload(file) {
      //   this.payload.file = URL.createObjectURL(file);
      //   this.submitImage(file, "image");
      this.payload.file = file;
    },
    uploadFiles() {
      const formData = new FormData();

      // Append file to FormData
      formData.append("file", this.payload.file);

      // Append other fields to FormData
      formData.append("file_name", this.payload.file_name);
      formData.append("document_type", this.payload.document_type);

      this.$emit("uploadFiles", formData);
    },
    // submitForm() {
    //   //Parse the String to format the date needed.
    //   const parsedDate = parse(
    //     this.payload.scheduled_date,
    //     "MMMM dd, yyyy",
    //     new Date()
    //   );
    //   const formattedDate = format(parsedDate, "yyyy-MM-d");

    //   if (this.hospitalService) {
    //     //Attached the other variables to payload for updating service.
    //     this.payload.status = this.status;
    //     this.payload.date_released = this.date_released;
    //     this.payload.serviceable_type = this.selects.serviceable_type;
    //     this.payload.scheduled_date = formattedDate;

    //     this.$emit(
    //       "updateService",
    //       this.payload,
    //       this.citizen_id,
    //       this.hospital_service_id
    //     );
    //   } else {
    //     this.payload.scheduled_date = formattedDate;
    //     this.payload.serviceable_type = this.selects.serviceable_type;
    //     this.$emit("submitForm", this.payload);
    //   }
    // },
  },
  computed: {
    ...mapGetters("file_types", ["getFileTypes"]),
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
    this.fetchFileTypes();
  },
};
</script>

<style scoped>
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
</style>
