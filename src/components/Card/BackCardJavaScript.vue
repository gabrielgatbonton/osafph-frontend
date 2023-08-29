<template>
  <div>
    <v-dialog v-model="dialog" min-width="600" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark block class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Back</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          >ID Card Generator</v-card-title
        >
        <div class="text-center mx-4 mt-4">
          <canvas
            ref="cardCanvas"
            class="canvas-border"
            style="position: relative; max-width: 100%; height: auto"
          ></canvas>
        </div>

        <!-- <div class="text-center mx-4 mt-4">
              <canvas
                ref="cardCanvas"
                class="canvas-border"
                style="position: relative; max-width: 100%; height: auto"
              ></canvas>
            </div> -->

        <!-- Button to trigger generating and printing the ID -->
        <v-card-actions>
          <v-btn dark class="blue darken-4" block @click="generateAndPrintID"
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
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["registrant"],
  data: () => ({
    dialog: false,
    isImageLoaded: false, // Add this flag
    date_1: null,
    date_2: null,
    vaccination_site_1: null,
    vaccination_site_2: null,
    vaccine_1: null,
    vaccine_2: null,
    lot_number_1: null,
    lot_number_2: null,
    tin_number: null,
    blood_type: null,
    emergency_name: null,
    emergency_number: null,
  }),
  htmlToPdfOptions: {
    margin: 0,

    html2canvas: {
      useCORS: true,
      allowTaint: true,
    },
  },
  methods: {
    ...mapActions("card", ["fetchImage", "fetchSignature"]),
    values() {
      this.date_1 = `${format(
        parseISO(this.registrant.citizen.vaccination_stat[0].vaccination_date),
        "MMMM d, yyyy"
      )}`;
    // console.log("Dose_1", this.registrant.citizen.vaccination_stat[0].vaccination_date)
    //   this.fullName = `${this.registrant.citizen.last_name.toUpperCase()}, ${this.registrant.citizen.first_name.toUpperCase()} ${this.registrant.citizen.middle_name.toUpperCase()}`;
    //   this.birthday = `${format(
    //     parseISO(this.registrant.citizen.birthday),
    //     "MMMM d, yyyy"
    //   )}`;
    //   console.log("Birthday: ", this.registrant.citizen.birthday);
    //   this.address = `${this.registrant.citizen.address}`;
    },
    requestImages() {
      this.fetchImage(this.registrant.citizen.id);
      this.fetchSignature(this.registrant.citizen.id);
    },
    generateID() {
      // Implement your ID generation logic here
      // For example, you can use a timestamp combined with a random number
      const timestamp = Date.now();
      const randomNumber = Math.floor(Math.random() * 1000);
      return `ID-${timestamp}-${randomNumber}`;
    },
    drawIDOnCanvas() {
      const canvas = this.$refs.cardCanvas;
      const context = canvas.getContext("2d");

      // Load the card template image
      const img = new Image();
      img.src = require("@/assets/back.jpg");
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
          const signatureImg = new Image();
          signatureImg.src = this.getSignature;
          signatureImg.onload = () => {
            // Draw portrait image after it's loaded
            context.drawImage(portraitImg, 125, 600);
            // Draw signature image after it's loaded
            context.drawImage(signatureImg, 125, 1350, 600, 200);

            //   // Draw ID
            //   context.fillText(`${id}`, 130, 1400);

            // Draw the rest of the data
            context.fillText(this.date_1, 1105, 270, 1700);
            // context.fillText(this.fullName, 760, 910, 1700);
            // context.fillText(this.birthday, 760, 1090, 1700);
            // context.fillText(this.address, 760, 1275, 1700);
          };
        };
      };
    },
    async generateAndPrintID() {
      try {
        // Wait for a short time to ensure the canvas content is drawn
        const canvas = this.$refs.cardCanvas;
        const imageDataURL = canvas.toDataURL("image/jpeg", 1.0);

        // Open a new window with the canvas content
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
              <img src="${imageDataURL}" style="max-width: 100%; height: auto;" />
            `);
        printWindow.document.close();

        // Add a slight delay before triggering print
        await new Promise((resolve) => setTimeout(resolve, 1000));

        printWindow.print();
        printWindow.close();
      } catch (error) {
        console.error(
          "An error occurred while generating and printing the ID:",
          error
        );
      }
    },
  },
  computed: {
    ...mapGetters("card", ["getImage", "getSignature"]),
  },
  created() {
    this.requestImages();
  },
  mounted() {
    this.values();
    console.log("registrant: ", this.registrant);
  },
  updated() {
    this.drawIDOnCanvas();
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray;
}
</style>
