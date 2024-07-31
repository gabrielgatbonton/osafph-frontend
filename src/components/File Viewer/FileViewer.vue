<template>
  <div class="d-flex flex-column">
    <NavbarComponent
      v-on:print="handlePrinting"
      v-on:download="handleDownloading"
      v-on:downloadImage="handleImageDownload"
      v-on:printImage="handleImagePrint"
      :type="data.file_type"
    />
    <v-container fluid class="background-scroll flex-grow-1">
      <v-row justify="center" v-if="data.file_type === 'PDF'">
        <v-col cols="auto">
          <vue-pdf-embed
            :page="page"
            :source="data.base64"
            width="800"
            ref="pdfRef"
            @rendered="handleDocumentRender()"
          />
          <div class="d-flex justify-center">
            <div class="chevron-position">
              <v-chip color="grey darken-2" class="icon-color">
                <v-icon :disabled="page <= 1" @click="page--" class="mr-3"
                  >mdi-chevron-left</v-icon
                >
                {{ page }} / {{ pageCount }} page(s)
                <v-icon
                  :disabled="page >= pageCount"
                  @click="page++"
                  class="ml-3"
                  >mdi-chevron-right</v-icon
                >
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="auto">
          <v-img
            class="mx-auto mt-8"
            max-width="900"
            :src="data.base64"
          ></v-img>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <v-col cols="auto">
          <div class="chevron-position">
            <v-chip color="grey darken-2" class="icon-color">
              <v-icon :disabled="page <= 1" @click="page--" class="mr-3"
                >mdi-chevron-left</v-icon
              >
              {{ page }} / {{ pageCount }} page(s)
              <v-icon :disabled="page >= pageCount" @click="page++" class="ml-3"
                >mdi-chevron-right</v-icon
              >
            </v-chip>
          </div>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
//   import VuePdfEmbed from 'vue-pdf-embed'
// OR THE FOLLOWING IMPORT FOR VUE 2
import NavbarComponent from "./NavbarComponent.vue";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
export default {
  name: "PdfViewer",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    VuePdfEmbed,
    NavbarComponent,
  },
  data: () => ({
    page: 1,
    pageCount: 1,
  }),
  methods: {
    handleDocumentRender() {
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
    //PDF
    handleDownloading(value) {
      if (value) {
        this.$refs.pdfRef.download("download");
      }
    },
    handlePrinting(value) {
      if (value) {
        this.$refs.pdfRef.print(1080, "download", true);
      }
    },
    //Image
    handleImageDownload(value) {
      if (value) {
        const linkSource = this.data.base64;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "download";

        downloadLink.click();
      }
    },
    handleImagePrint(value) {
      if (value) {
        const image = this.data.base64;
        // Open a new window
        const printWindow = window.open("", "_blank");

        // Create a new document within the print window
        const printDocument = printWindow.document;

        // Set up the document's head with custom styles
        const head = printDocument.head;
        const style = printDocument.createElement("style");
        style.innerHTML = `
      @page {
        size: portrait;
      }
      body {
        display: flex;
        flex-direction: column;
        height: auto;
      }
      img {
        max-width: 100%;
      }
      .image-class {
        display: block;
      }
    `;
        head.appendChild(style);

        // Add the front image to the document
        const imgElement = printDocument.createElement("img");
        imgElement.className = "image-class";
        imgElement.src = image;
        printDocument.body.appendChild(imgElement);

        // Add a slight delay before triggering print (optional)
        setTimeout(() => {
          // Print the document directly
          printWindow.print();

          // Close the print window (optional)
          printWindow.close();
        }, 1000); // Adjust the delay as needed
      }
    },
  },
};
</script>

<style scoped>
.chevron-position {
  position: fixed;
  bottom: 5rem; /* Adjust the distance from the bottom as needed */
  background: transparent;
  text-align: center;
  z-index: 1000; /* Increase z-index */
}
.icon-color {
  color: white;
}

.background-scroll {
  overflow-y: auto;
}

.background-scroll::-webkit-scrollbar {
  width: 0; /* Remove scrollbar width */
}

/* Optional: Style for track and handle */
.background-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Light gray track */
}

.background-scroll::-webkit-scrollbar-thumb {
  background-color: #888; /* Darker gray handle */
}
</style>
