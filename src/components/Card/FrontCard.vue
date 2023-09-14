<template>
  <div>
    <v-dialog v-model="dialog" min-width="600" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark block class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Front</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          >ID Card Generator</v-card-title
        >
        <vue-html2pdf
          :show-layout="status"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="Sample"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="letter"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <canvas
              ref="cardCanvas"
              class="canvas-border"
              style="position: relative; max-width: 100%; height: auto"
            ></canvas>
          </section>
          <div>
              <v-btn
                dark
                class="blue darken-4 ma-1"
                block
                @click="generateAndPrintID"
                >Print</v-btn
              >
              <v-btn
                dark
                block
                outlined
                color="white"
                class="ma-1"
                @click="statusChange"
                >Cancel</v-btn
              >
            </div>
        </vue-html2pdf>
        <!-- <div class="text-center mx-4 mt-4">
          <canvas
            ref="cardCanvas"
            class="canvas-border"
            style="position: relative; max-width: 100%; height: auto"
          ></canvas>
        </div> -->

        <!-- Button to trigger generating and printing the ID -->
        <v-card-actions>
          <v-btn dark class="blue darken-4" block @click="statusChange"
            >Print ID</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import VueHtml2pdf from "vue-html2pdf";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["registrant"],
  components: {
    VueHtml2pdf,
  },
  data: () => ({
    dialog: false,
    isImageLoaded: false, // Add this flag
    category: null,
    fullName: null,
    birthday: null,
    address: null,
    imageURL: null,
    image: null,
    status: false,
  }),
  htmlToPdfOptions: {
    margin: 0,

    html2canvas: {
      useCORS: true,
      allowTaint: true,
    },
  },
  methods: {
    ...mapActions("card", ["fetchImage"]),
    values() {
      this.category = `${this.registrant.citizen.category.description}`;
      this.fullName = `${this.registrant.citizen.last_name.toUpperCase()}, ${this.registrant.citizen.first_name.toUpperCase()} ${this.registrant.citizen.middle_name.toUpperCase()}`;
      this.birthday = `${format(
        parseISO(this.registrant.citizen.birthday),
        "MMMM d, yyyy"
      )}`;
      this.address = `${this.registrant.citizen.address}`;
    },
    statusChange() {
      this.status = !this.status;
    },
    requestImage() {
      this.fetchImage(this.registrant.citizen.id);
    },
    generateID() {
      // Implement your ID generation logic here
      // For example, you can use a timestamp combined with a random number
      const timestamp = Date.now();
      const randomNumber = Math.floor(Math.random() * 1000);
      return `ID-${timestamp}-${randomNumber}`;
    },
    drawIDOnCanvas(id) {
      const canvas = this.$refs.cardCanvas;
      const context = canvas.getContext("2d");

      // Load the card template image
      const img = new Image();
      img.src = require("@/assets/front.jpg");
      img.onload = () => {
        // Draw the card template image on the canvas
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        // Draw dynamic data on the canvas
        context.font = "50px Arial";
        context.fillStyle = "black";

        // Load and draw registrant's portrait image
        const portraitImg = new Image();
        portraitImg.src = this.getImage;
        portraitImg.onload = () => {
          // Draw portrait image after it's loaded
          context.drawImage(portraitImg, 125, 600);

          // Draw ID
          context.fillText(`${id}`, 130, 1400);

          // Draw the rest of the data
          context.fillText(this.category, 760, 730);
          context.fillText(this.fullName, 760, 910);
          context.fillText(this.birthday, 760, 1090);
          context.fillText(this.address, 760, 1275);
        };
      };
    },
    async generateAndPrintID() {
      try {
        // Wait for a short time to ensure the canvas content is drawn

        await this.$refs.html2Pdf.generatePdf();

        // // Open a new window with the canvas content
        // const printWindow = window.open("", "_blank");
        // printWindow.document.open();
        // printWindow.document.write(`
        //   <img src="${updatedImageData}" style="max-width: 100%; height: auto;" />
        // `);
        // printWindow.document.close();

        // // Add a slight delay before triggering print
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // printWindow.print();
        // printWindow.close();
      } catch (error) {
        console.error(
          "An error occurred while generating and printing the ID:",
          error
        );
      }
    },
  },
  computed: {
    ...mapGetters("card", ["getImage"]),
  },
  created() {
    this.requestImage();
  },
  mounted() {
    this.values();
  },
  updated() {
    this.drawIDOnCanvas(this.generateID());
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray;
}
</style>
