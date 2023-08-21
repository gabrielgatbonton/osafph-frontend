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
        <div class="text-center ma-4">
          <canvas
            ref="cardCanvas"
            class="canvas-border"
            style="position: relative; max-width: 90%; height: auto"
          ></canvas>
        </div>

        <!-- Button to trigger generating and printing the ID -->
        <v-btn dark class="blue darken-4" @click="generateAndPrintID"
          >Print ID</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    isImageLoaded: false, // Add this flag
  }),
  methods: {
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
      img.src = require("@/assets/front.jpg"); // Path to your card template image
      img.onload = () => {
        // Draw the card template image on the canvas
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        // Draw dynamic data on the canvas
        context.font = "50px Arial";
        context.fillStyle = "black";

        // Draw ID on the canvas
        //Second Parameter: OffsetX
        //Third Parameter: OffsetY
        context.fillText(`ID: ${id}`, 100, 1400);
        context.fillText(`ROAP`, 760, 730);
        context.fillText(`Gabriel Gatbonton`, 760, 910);
        context.fillText(`March 26, 2002`, 760, 1090);
        context.fillText(`32 Maria Clara`, 760, 1275);
      };
    },
    async generateAndPrintID() {
      try {
        const generatedID = this.generateID();
        this.drawIDOnCanvas(generatedID);

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
  updated() {
    this.drawIDOnCanvas(this.generateID());
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray
}
</style>