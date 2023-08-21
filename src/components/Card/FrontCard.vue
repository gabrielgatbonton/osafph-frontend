<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark block class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Front</v-btn
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
            style="position: relative; max-width: 90%; height: auto"
          ></canvas>
        </div>

        <!-- Button to trigger generating and printing the ID -->
        <v-card-actions>
          <v-btn dark class="blue darken-4" @click="generateAndPrintID"
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
export default {
  props: ["registrant"],
  data: () => ({
    dialog: false,
    isImageLoaded: false, // Add this flag
    category: null,
    fullName: null,
    birthday: null,
    address: null,
    imageURL: null,
  }),
  methods: {
    values() {
      const baseURL = this.$url;
      this.category = `${this.registrant.citizen.category.description}`;
      this.fullName = `${this.registrant.citizen.last_name.toUpperCase()}, ${this.registrant.citizen.first_name.toUpperCase()} ${this.registrant.citizen.middle_name.toUpperCase()}`;
      this.birthday = `${format(
        parseISO(this.registrant.citizen.birthday),
        "MMMM d, yyyy"
      )}`;
      this.address = `${this.registrant.citizen.address}`;
      this.imageURL = `${
        baseURL + this.registrant.citizen.citizen_file.image_url
      }`;
      console.log(this.imageURL);
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

        // Draw ID
        context.fillText(`${id}`, 130, 1400);

        // Draw other text data

        // Load and draw registrant's portrait image
        const portraitImg = new Image();
        portraitImg.src = this.imageURL;
        portraitImg.onload = () => {
          // Draw portrait image after it's loaded
          context.drawImage(portraitImg, 125, 600, 550, 700);

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
        const canvas = this.$refs.cardCanvas;
        const updatedImageData = canvas.toDataURL();

        // Open a new window with the canvas content
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
          <img src="${updatedImageData}" style="max-width: 100%; height: auto;" />
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
