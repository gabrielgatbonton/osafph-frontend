<template>
  <div class="background">
    <FileViewer :data="data" />
  </div>
</template>

<script>
import FileViewer from "@/components/File Viewer/FileViewer.vue";
import ViewFileMixin from "../mixins/Consultation Files/ViewFile";

export default {
  name: "FileView",
  mixins: [ViewFileMixin],
  data: () => ({
    myStyle: {
      backgroundColor: "#525659",
    },
  }),
  components: {
    FileViewer,
  },
  methods: {
    fetchQuery() {
      const file_id = JSON.parse(this.$route.query.file_id);
      const hospital_service_id = JSON.parse(
        this.$route.query.hospital_service_id
      );
      this.fetchConsultationFile({
        hospital_service_id: hospital_service_id,
        file_id: file_id,
      }).catch((error) => {
        console.error("Error Fetching Consultation File: ", error);
      });
    },
  },
  mounted() {
    this.fetchQuery();
    // Set the height of PdfViewer to the height of the route component viewport
    const pdfViewer = this.$refs.pdfViewer;
    pdfViewer.style.height = `${window.innerHeight}px`;
  },
};
</script>

<style scoped>
.background {
  background: #525659 no-repeat center center;
}
</style>
