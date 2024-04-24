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
      const citizen_id = JSON.parse(this.$route.query.citizen_id);
      if (citizen_id) {
        this.fetchPublicFile({
          citizen_id: citizen_id,
          hospital_service_id: hospital_service_id,
          hospital_service_file_id: file_id,
        })
      } else {
        this.fetchFile({
          hospital_service_id: hospital_service_id,
          file_id: file_id,
        }).catch((error) => {
          console.error("Error Fetching Consultation File: ", error);
        });
      }
    },
  },
  mounted() {
    this.fetchQuery();
  },
};
</script>

<style scoped>
.background {
  background: #525659 no-repeat center center;
}
</style>
