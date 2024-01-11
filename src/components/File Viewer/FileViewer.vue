<template>
  <div>
    <NavbarComponent />
    <v-container fluid class="background-scroll">
      <v-row justify="center" v-if="data.file_type === 'PDF'">
        <v-col cols="auto">
          <vue-pdf-embed
            :page="page"
            :source="data.base64"
            width="800"
            ref="pdfRef"
            @rendered="handleDocumentRender()"
          />
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
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="auto">
          <v-img class="mx-auto mt-8" max-width="900" :src="data.base64"></v-img>
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
  },
  watch: {
    // activator(value) {
    //   this.overlay = value;
    // },
  },
};
</script>

<style scoped>
.chevron-position {
  position: fixed;
  bottom: 30px; /* Adjust the distance from the bottom as needed */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  background: transparent;
  text-align: center;
  z-index: 1000; /* Increase z-index */
}
.icon-color {
  color: white;
}

.background-scroll {
  height: 85vh;
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
