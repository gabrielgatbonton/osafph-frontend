import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    data: {
      base64: null,
      file_type: null,
    },
  }),
  methods: {
    ...mapActions("consultations", ["fetchConsultationFile"]),
    activator(file_id, hospital_service_id) {
      this.$router
        .push({
          name: "consultation-files-view",
          query: {
            file_id: JSON.stringify(file_id),
            hospital_service_id: JSON.stringify(hospital_service_id),
          },
        })
        .catch((error) => {
          console.log("Error Moving to Next Route:", error);
        });
    },
    downloadTrigger(file_id, hospital_service_id) {
      this.fetchConsultationFile({
        file_id: file_id,
        hospital_service_id: hospital_service_id,
      })
        .then(() => {
          this.handleImageDownload(this.data.file_type);
        })
        .catch((error) => {
          console.error("Error Handling Download: ", error);
        });
    },
    //Image
    handleImageDownload(value) {
      console.log(value);
      if (value === "Image") {
        //Declare Base64 to a variable.
        const linkSource = this.data.base64;

        //Assign an anchor element to the base64
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "download";

        downloadLink.click();
      } else if (value === "PDF") {
        const pdfData = this.data.base64;

        //Assign an anchor element to the base64
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfData;
        downloadLink.download = "pdf_download";

        // Append the link to the document and trigger the click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
      }
    },
  },
  computed: {
    ...mapGetters("consultations", ["getConsultationFile"]),
  },
  watch: {
    getConsultationFile(value) {
      this.data.base64 = value.file;
      this.data.file_type = value.file_type;
    },
  },
  // resetActivator(data) {
  //   this.deleteDialog = data;
  // },
  // deleteItem() {
  //   this.deleteConsultationFile({
  //     file_id: this.file_id,
  //     hospital_service_id: this.hospital_service_id,
  //   })
  //     .catch((error) => {
  //       console.log("Error Proceding with delete:", error);
  //     })
  //     .finally(() => {
  //       this.deleteDialog = false;
  //     });
  // },
};
