<template>
  <div>
    <vue-html2pdf
      :show-layout="true"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Sample"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <h1>Hello World</h1>
        <v-btn @click="generateReport">Hello</v-btn>
      </section>
    </vue-html2pdf>
    
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  methods: {
    /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  components: {
    VueHtml2pdf,
  },
};
</script>

<style></style>
