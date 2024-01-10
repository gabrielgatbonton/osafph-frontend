<template>
  <div>
    <v-overlay :value="overlay">
      <header id="header">
        <div class="logo items-flex">
          <v-icon @click="overlay = !overlay" color="white"
            >mdi-arrow-left</v-icon
          >
          <div>PDFViewer</div>
        </div>
      </header>
      <v-progress-circular
        v-if="base64 === null"
        indeterminate
        size="64"
      ></v-progress-circular>
      <div v-else>
        <vue-pdf-embed
          :page="page"
          :source="base64"
          width="800"
          class="scrollable"
          ref="pdfRef"
          @rendered="handleDocumentRender()"
        />
        <v-container class="chevron-position">
          <v-row justify="center">
            <v-col cols="auto" align-self="center">
              <v-chip color="grey darken-2">
                <v-icon :disabled="page <= 1" @click="page--"
                  >mdi-chevron-left</v-icon
                >
                <v-icon :disabled="page >= pageCount" @click="page++"
                  >mdi-chevron-right</v-icon
                >
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-overlay>
  </div>
</template>

<script>
//   import VuePdfEmbed from 'vue-pdf-embed'
// OR THE FOLLOWING IMPORT FOR VUE 2
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
export default {
  name: "PdfViewer",
  props: {
    base64: {
      type: String,
      required: true,
    },
    activator: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    VuePdfEmbed,
  },
  data: () => ({
    overlay: false,
    page: 1,
    pageCount: 1,
  }),
  methods: {
    handleDocumentRender() {
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
  },
  watch: {
    activator(value) {
      this.overlay = value;
    },
    overlay(value) {
      this.$emit("overlayResponse", value);
    },
  },
};
</script>

<style scoped>
.scrollable {
  margin-top: 70px;
  height: 90vh;
  overflow-y: auto;
  box-shadow: 10px #444;
}

.chevron-position {
  background: transparent;
  position: absolute; /* Change from relative to absolute */
  bottom: 20px; /* Adjust the top position as needed */
  z-index: 5; /* Increase z-index */
}
.scrollable::-webkit-scrollbar {
  width: 0; /* Remove scrollbar width */
}

/* Optional: Style for track and handle */
.scrollable::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Light gray track */
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #888; /* Darker gray handle */
}

#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #555;
  color: #ddd;
  z-index: 1000;
  padding: 17px;
}

#header .logo {
  font-size: 20px;
  font-weight: bold;
}

#header .items-flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}
#header .items-flex div {
  margin-left: 16px;
}
</style>
